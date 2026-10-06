import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "Med AI Plays: AI study workflows for medical students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f3ea",
          color: "#1c1b19",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", display: "flex" }}>
          For medical students at any school
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1, display: "flex", alignItems: "center" }}>
            Med AI&nbsp;
            <span style={{ background: "#ffe066", padding: "0 16px", display: "flex" }}>Plays</span>
          </div>
          <div style={{ fontSize: 40, marginTop: 28, display: "flex" }}>
            Study workflows and practice questions that work in any AI tool.
          </div>
        </div>
        <div style={{ fontSize: 28, display: "flex" }}>{SITE_NAME} &middot; free &middot; no account</div>
      </div>
    ),
    size
  );
}
