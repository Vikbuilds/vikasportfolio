import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "vikasacharya";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const [pfpData, fkGroteskData, berkeleyMonoData] = await Promise.all([
    fetch(new URL("../../public/pfp.png", import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
    fetch(
      new URL(
        "../../public/fonts/perplexity/fk-grotesk.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL(
        "../../public/fonts/perplexity/berkeley-mono.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer()),
  ]);

  const pfpBase64 = `data:image/png;base64,${Buffer.from(pfpData).toString("base64")}`;

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
            PORTFOLIO
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
      ...size,
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

