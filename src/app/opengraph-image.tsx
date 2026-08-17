import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Vikas Acharya — Software Builder & Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const [pfpData, ppEditorialData, berkeleyMonoData] = await Promise.all([
    fetch(new URL("../../public/pfp.png", import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
    fetch(
      new URL(
        "../../public/fonts/perplexity/pp-editorial-variable.ttf",
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          color: "#FAFAFA",
          padding: "64px 80px",
          fontFamily: "PP Editorial, serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Luxury Gold Gradient Glow Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(212, 175, 55, 0.08) 0%, rgba(10, 10, 10, 1) 70%)",
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
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            pointerEvents: "none",
          }}
        />

        {/* Top Header details */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "64px",
            right: "64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#A1A1AA",
              fontFamily: "Berkeley Mono, monospace",
            }}
          >
            PORTFOLIO / 2026
          </span>
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#D4AF37",
              fontFamily: "Berkeley Mono, monospace",
            }}
          >
            VIKASACHARYA.ME
          </span>
        </div>

        {/* Main Content Layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "56px",
            zIndex: 10,
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {/* Profile Picture with Golden Editorial Ring */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              padding: "4px",
              background: "linear-gradient(135deg, #D4AF37 0%, rgba(212, 175, 55, 0.2) 100%)",
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                borderRadius: "50%",
                padding: "4px",
                backgroundColor: "#0A0A0A",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pfpBase64}
                alt="Vikas Acharya"
                width="200"
                height="200"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "200px",
                  height: "200px",
                }}
              />
            </div>
          </div>

          {/* Typography Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <h1
              style={{
                fontSize: "76px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#FAFAFA",
                margin: 0,
                lineHeight: 1.05,
                fontFamily: "PP Editorial, serif",
              }}
            >
              Vikas Acharya
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#A1A1AA",
                fontFamily: "Berkeley Mono, monospace",
                letterSpacing: "0.15em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Software Builder & Developer
            </p>
          </div>
        </div>

        {/* Bottom Footer Detail */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "64px",
            right: "64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: "#71717A",
            fontFamily: "Berkeley Mono, monospace",
            letterSpacing: "0.2em",
          }}
        >
          <span>DESIGN & ENGINEERING</span>
          <span>CRAFTED WITH PRECISION</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "PP Editorial",
          data: ppEditorialData,
          style: "normal",
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


