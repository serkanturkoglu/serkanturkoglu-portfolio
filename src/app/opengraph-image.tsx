import { ImageResponse } from "next/og";
import { about } from "@/data/siteContent";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at request/build time from the same name + role already used
// across the site — no new artwork, just a text card so links shared on
// social/Slack/iMessage don't show up blank.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          backgroundColor: "#0b0b0c",
          color: "#f4f3ef",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9a9893",
            marginBottom: 24,
          }}
        >
          {`${about.role} — ${about.location}`}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {about.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
