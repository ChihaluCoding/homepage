"use client";

import backgroundImage from "../../background.png";

export function ParticlesBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        style={{ opacity: 0.5 }}
      />
    </div>
  );
}
