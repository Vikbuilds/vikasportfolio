import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Vikas Acharya — Design, Engineering & Human Taste";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const [ppEditorialData, berkeleyMonoData] = await Promise.all([
    fetch(
      new URL(
        "../../public/fonts/perplexity/pp-editorial-italic-variable.ttf",
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
                letterSpacing: "0.26em",
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
              PERSONAL PORTFOLIO
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
            VIKASACHARYA.ME
          </div>
        </div>

        {/* Main Editorial Headline */}
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
              fontSize: "76px",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#FAF8F5",
              margin: 0,
            }}
          >
            Design, Craft & Human Taste
          </h1>

          <p
            style={{
              fontSize: "21px",
              lineHeight: 1.5,
              color: "rgba(244, 242, 237, 0.65)",
              fontFamily: "Berkeley Mono, monospace",
              fontWeight: 400,
              letterSpacing: "0.01em",
              margin: 0,
              maxWidth: "780px",
            }}
          >
            Software builder crafting robust web applications, fine-tuned interactions, and thoughtful writings.
          </p>
        </div>

        {/* Footer Editorial Line */}
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
            <span>FULLSTACK DEVELOPER</span>
            <span>•</span>
            <span>WRITINGS</span>
            <span>•</span>
            <span>VISUAL JOURNAL</span>
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
      ...size,
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
