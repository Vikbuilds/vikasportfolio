import { NextResponse } from "next/server";
import crypto from "crypto";

// Expected SHA-256 hash of normalized password "kridha"
const TARGET_PASSWORD_HASH =
  "9a23f32f5886ae1f6a01aa3655d3759c4ac1841fa52799ff8ab9a319b9b4531f";

// Secret key for signing session tokens (fallback to random string per server start)
const SESSION_SECRET =
  process.env.PRIVATE_SPACE_SECRET ||
  "kridha_private_space_secure_salt_892374928174912";

// In-memory rate limiting store: ip -> { count: number, resetAt: number }
const attemptsMap = new Map<string, { count: number; resetAt: number }>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "unknown-client-ip";
}

function generateSessionToken(): string {
  const payload = `${Date.now()}:${crypto.randomBytes(16).toString("hex")}`;
  const hmac = crypto.createHmac("sha256", SESSION_SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payload, signature] = parts;
    const [timestampStr] = payload.split(":");
    const timestamp = parseInt(timestampStr, 10);

    // Expire after 24 hours
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) return false;

    const hmac = crypto.createHmac("sha256", SESSION_SECRET);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();

  // Check Rate Limiting
  const rateLimit = attemptsMap.get(ip);
  if (rateLimit) {
    if (now < rateLimit.resetAt) {
      if (rateLimit.count >= MAX_FAILED_ATTEMPTS) {
        const remainingSec = Math.ceil((rateLimit.resetAt - now) / 1000);
        return NextResponse.json(
          {
            success: false,
            error: `Too many failed attempts. Security lockout active. Please try again in ${remainingSec}s.`,
          },
          { status: 429 }
        );
      }
    } else {
      // Reset window expired
      attemptsMap.delete(ip);
    }
  }

  try {
    const body = await req.json();
    const { password } = body;

    if (typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid password input." },
        { status: 400 }
      );
    }

    // Normalize password input (case insensitive, trim spaces)
    const normalizedInput = password.trim().toLowerCase().replace(/\s+/g, " ");

    const inputHash = crypto
      .createHash("sha256")
      .update(normalizedInput)
      .digest("hex");

    // Timing-safe comparison to prevent timing attacks
    const isCorrect = crypto.timingSafeEqual(
      Buffer.from(inputHash),
      Buffer.from(TARGET_PASSWORD_HASH)
    );

    if (isCorrect) {
      // Clear rate limiting on success
      attemptsMap.delete(ip);

      const token = generateSessionToken();
      const res = NextResponse.json({ success: true });

      // Set HttpOnly, SameSite=Strict secure cookie
      res.cookies.set("private_space_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 24 * 60 * 60, // 24 hours
      });

      return res;
    } else {
      // Track failed attempt
      const current = attemptsMap.get(ip) || {
        count: 0,
        resetAt: now + LOCKOUT_DURATION_MS,
      };
      current.count += 1;
      attemptsMap.set(ip, current);

      const remaining = MAX_FAILED_ATTEMPTS - current.count;
      const errorMsg =
        remaining > 0
          ? `Incorrect password. ${remaining} attempt${
              remaining === 1 ? "" : "s"
            } remaining before lockout.`
          : "Incorrect password. Security lockout activated for 15 minutes.";

      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server authentication error." },
      { status: 500 }
    );
  }
}
