import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const category = searchParams.get("category") || "PORTFOLIO";

  const [pfpData, fkGroteskData, berkeleyMonoData] = await Promise.all([
    fetch(
      new URL("../../../../public/pfp.png", import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL(
        "../../../../public/fonts/perplexity/fk-grotesk.ttf",
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

  const pfpBase64 = `data:image/png;base64,${Buffer.from(pfpData).toString("base64")}`;

  // Default image layout (profile picture + vikasacharya name)
  if (!title || title === "Vikas Acharya" || title === "vikasacharya") {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            color: "#09090B",
            padding: "60px",
            fontFamily: "FK Grotesk, sans-serif",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          {/* Subtle grid pattern background overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(245, 245, 247, 0.7) 0%, rgba(255, 255, 255, 1) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Minimal Outer Frame */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "32px",
              right: "32px",
              bottom: "32px",
              border: "1px solid #E4E4E7",
              borderRadius: "24px",
              pointerEvents: "none",
            }}
          />

          {/* Top bar detail */}
          <div
            style={{
              position: "absolute",
              top: "56px",
              left: "64px",
              right: "64px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#A1A1AA",
                fontFamily: "Berkeley Mono, monospace",
              }}
            >
              {category}
            </span>
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#A1A1AA",
                fontFamily: "Berkeley Mono, monospace",
              }}
            >
              VIKASACHARYA.ME
            </span>
          </div>

          {/* Center Content: Profile Picture + Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "28px",
              zIndex: 10,
            }}
          >
            {/* Profile Picture */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                padding: "6px",
                backgroundColor: "#FFFFFF",
                boxShadow:
                  "0 20px 40px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pfpBase64}
                alt="vikasacharya profile picture"
                width="160"
                height="160"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "160px",
                  height: "160px",
                }}
              />
            </div>

            {/* Name */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <h1
                style={{
                  fontSize: "68px",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#09090B",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                vikasacharya
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: "#71717A",
                  fontFamily: "Berkeley Mono, monospace",
                  letterSpacing: "0.08em",
                  margin: 0,
                  textTransform: "lowercase",
                }}
              >
                software builder & developer
              </p>
            </div>
          </div>

          {/* Bottom bar detail */}
          <div
            style={{
              position: "absolute",
              bottom: "56px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#A1A1AA",
              fontFamily: "Berkeley Mono, monospace",
              letterSpacing: "0.15em",
            }}
          >
            <span>© 2026</span>
            <span>•</span>
            <span>DESIGN & ENGINEERING</span>
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

  // Dynamic layout for blog posts / writings in white theme
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

