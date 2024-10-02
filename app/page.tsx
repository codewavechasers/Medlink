"use client";
import Welcome from "./onboarding/welcome-to-medlink/index";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <Welcome />
    </div>
  );
}
