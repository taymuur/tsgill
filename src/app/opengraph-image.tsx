import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social card, generated at build time. Uses the hero palette. */
export default function OgImage() {
  const palette = site.hero.background.palette;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0e17",
          color: "#e8edf4",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          {palette.map((c, i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>{site.name}</div>
          <div style={{ fontSize: 32, color: "#9aa7bd", marginTop: 16, maxWidth: 900 }}>
            {site.hero.subheading}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#35e0c2", letterSpacing: "0.04em" }}>
          {site.footer.tagline}
        </div>
      </div>
    ),
    size,
  );
}
