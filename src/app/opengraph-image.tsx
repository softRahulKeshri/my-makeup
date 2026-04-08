import { ImageResponse } from "next/og";

export const alt = "Abha Cosmetic — Real Glow, Real You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph image for social previews (Twitter, LinkedIn, iMessage).
 * Uses edge runtime — no external assets required.
 */
const Image = () =>
  new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #080706 0%, #141210 45%, #0a0908 100%)",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #d4af37, #f0d78c, #d4af37)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Abha Cosmetic
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            color: "#f4efe6",
            opacity: 0.92,
            fontStyle: "italic",
          }}
        >
          Real Glow, Real You
        </div>
        <div style={{ marginTop: 20, fontSize: 22, color: "rgba(244,239,230,0.55)" }}>
          Premium face care · 15ml
        </div>
      </div>
    ),
    { ...size },
  );

export default Image;
