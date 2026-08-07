import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Vikas Acharya";
  const subtitle =
    searchParams.get("subtitle") ||
    "Crafting digital experiences with imagination, intent, and human taste.";
  const category = searchParams.get("category") || "PORTFOLIO";

  // Load actual local PP Editorial and Berkeley Mono font files for 100% reliable Vercel Edge rendering
  const [ppEditorialData, berkeleyMonoData] = await Promise.all([
    fetch(
      new URL(
        "../../../../public/fonts/perplexity/pp-editorial-italic-variable.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL(
        "../../../../public/fonts/perplexity/berkeley-mono.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090A",
          color: "#F4F2ED",
          padding: "70px 80px",
          fontFamily: "PP Editorial, serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Fine Editorial Grid Frame */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: "36px",
            right: "36px",
            bottom: "36px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
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
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#D4B07B",
                fontFamily: "Berkeley Mono, monospace",
                fontWeight: 500,
              }}
            >
              VIKAS ACHARYA
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>
              /
            </span>
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(244, 242, 237, 0.5)",
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
              color: "rgba(244, 242, 237, 0.4)",
              fontFamily: "Berkeley Mono, monospace",
            }}
          >
            VIKASACHARYA.DEV
          </div>
        </div>

        {/* Main Title & Subtitle Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "980px",
            zIndex: 10,
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 35 ? "58px" : "74px",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#FAF8F5",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.5,
                color: "rgba(244, 242, 237, 0.65)",
                fontFamily: "Berkeley Mono, monospace",
                fontWeight: 400,
                letterSpacing: "0.01em",
                margin: 0,
                maxWidth: "800px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom Editorial Meta Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            zIndex: 10,
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(244, 242, 237, 0.45)",
              fontFamily: "Berkeley Mono, monospace",
            }}
          >
            <span>DESIGN</span>
            <span>•</span>
            <span>ENGINEERING</span>
            <span>•</span>
            <span>HUMAN TASTE</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#D4B07B",
              fontFamily: "Berkeley Mono, monospace",
              letterSpacing: "0.1em",
            }}
          >
            <span>© 2026</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "PP Editorial",
          data: ppEditorialData,
          style: "italic",
          weight: 400,
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
