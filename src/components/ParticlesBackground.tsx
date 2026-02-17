"use client";

import backgroundImage from "../../background.png";

export function ParticlesBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "top center",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          opacity: 0.22,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.84))",
        }}
      />
    </div>
  );
}
