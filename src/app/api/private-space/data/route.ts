import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "../auth/route";
import {
  aboutMeParagraphs,
  philosophyLine,
  unlockNoteText,
} from "@/data/private-space";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("private_space_token")?.value;

  if (!token || !verifySessionToken(token)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Private Space is locked." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      aboutMeParagraphs,
      philosophyLine,
      unlockNoteText,
    },
  });
}
