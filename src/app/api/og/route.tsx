import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const category = searchParams.get("category") || "PORTFOLIO";

  // Default request without title -> redirect to static /og-image.png
  if (!title || title === "Vikas Acharya" || title === "vikasacharya") {
    return NextResponse.redirect(new URL("/og-image.png", req.url));
  }

  // Dynamic request -> fetch static assets via HTTP origin to avoid bundling them into Edge function JS
  const origin = req.nextUrl.origin;
  const [pfpData, fkGroteskData, berkeleyMonoData] = await Promise.all([
    fetch(`${origin}/pfp.png`).then((res) => res.arrayBuffer()),
    fetch(`${origin}/fonts/perplexity/fk-grotesk.ttf`).then((res) => res.arrayBuffer()),
    fetch(`${origin}/fonts/perplexity/berkeley-mono.ttf`).then((res) => res.arrayBuffer()),
  ]);

  const pfpBase64 = `data:image/png;base64,${Buffer.from(pfpData).toString("base64")}`;

  // Dynamic layout for blog posts / writings
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          color: "#09090B",
          padding: "70px 80px",
          fontFamily: "FK Grotesk, sans-serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Outer Frame */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: "36px",
            right: "36px",
            bottom: "36px",
            border: "1px solid #E4E4E7",
            borderRadius: "20px",
            pointerEvents: "none",
          }}
        />

        {/* Top Header Line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Small avatar */}
            <div
              style={{
                display: "flex",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid #E4E4E7",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pfpBase64}
                alt="vikasacharya"
                width="36"
                height="36"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <span
              style={{
                fontSize: "14px",
                letterSpacing: "0.05em",
                fontWeight: 700,
                color: "#09090B",
              }}
            >
              vikasacharya
            </span>
            <span style={{ color: "#D4D4D8", fontSize: "14px" }}>/</span>
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#71717A",
                fontFamily: "Berkeley Mono, monospace",
              }}
            >
              {category}
            </span>
          </div>

          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#A1A1AA",
              fontFamily: "Berkeley Mono, monospace",
            }}
          >
            VIKASACHARYA.ME
          </div>
        </div>

        {/* Main Title & Subtitle Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "980px",
            zIndex: 10,
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 35 ? "56px" : "68px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#09090B",
              margin: 0,
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.5,
                color: "#71717A",
                fontFamily: "Berkeley Mono, monospace",
                fontWeight: 400,
                margin: 0,
                maxWidth: "820px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom Meta Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            zIndex: 10,
            paddingTop: "20px",
            borderTop: "1px solid #E4E4E7",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#A1A1AA",
              fontFamily: "Berkeley Mono, monospace",
            }}
          >
            <span>DESIGN</span>
            <span>•</span>
            <span>ENGINEERING</span>
            <span>•</span>
            <span>WRITINGS</span>
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#71717A",
              fontFamily: "Berkeley Mono, monospace",
              letterSpacing: "0.1em",
            }}
          >
            © 2026
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "FK Grotesk",
          data: fkGroteskData,
          style: "normal",
          weight: 700,
        },
        {
          name: "Berkeley Mono",
          data: berkeleyMonoData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}

