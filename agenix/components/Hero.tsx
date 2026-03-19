"use client";

import dynamic from "next/dynamic";

// Lazy-load the WebGL component — page renders instantly, animation loads after
const LineWaves = dynamic(() => import("./LineWaves"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section id="hero">
      {/* LineWaves — covers the full hero, loaded async */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <LineWaves
          speed={0.3}
          innerLineCount={23}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#100f0f"
          color2="#c72323"
          color3="#c41c1c"
          enableMouseInteraction={false}
          mouseInfluence={2}
        />
      </div>

      {/* Bottom fade — blends hero into the section below */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #000000)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Hero content */}
      <div className="w" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <h1 className="hero-h">
          We build what makes<br />
          <span className="m">every job easier.</span>
        </h1>

        <p className="hero-p">
          From Shopify stores to AI agents, workflow automation to real-time
          assistants — we build the technology that takes the hard work out of
          running a business, a team, or a career.
        </p>

        <div className="hero-btns">
          <a href="#contact" className="hbtn hbtn-p">Start a Project →</a>
          <a href="#what"    className="hbtn hbtn-g">See What We Build</a>
        </div>
      </div>
    </section>
  );
}
