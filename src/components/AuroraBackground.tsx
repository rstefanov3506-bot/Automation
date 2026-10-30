"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Slow-drifting soft color blobs - the "aurora mesh" hero backdrop.
// Drawn as radial gradients, NOT filter: blur(). A 90px blur on large moving
// elements is re-rasterised every frame and was the single biggest frame-rate
// cost on the page (measured ~2x FPS hit); gradients only get moved by the
// compositor, so the look is the same at a fraction of the cost.
export default function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blobs = ref.current?.querySelectorAll<HTMLElement>("[data-blob]");
    if (!blobs) return;

    const tweens: gsap.core.Tween[] = [];
    blobs.forEach((blob, i) => {
      const tween = gsap.to(blob, {
        x: i % 2 === 0 ? "+=60" : "-=70",
        y: i % 2 === 0 ? "-=40" : "+=50",
        scale: 1.15,
        duration: 10 + i * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      tweens.push(tween);
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        data-blob
        className="aurora-blob absolute -left-48 -top-56 h-[38rem] w-[38rem] [--blob:rgba(var(--accent-rgb),0.32)]"
      />
      <div
        data-blob
        className="aurora-blob absolute -right-44 -top-14 h-[34rem] w-[34rem] [--blob:rgba(236,72,153,0.18)] dark:[--blob:rgba(236,72,153,0.24)]"
      />
      <div
        data-blob
        className="aurora-blob absolute left-[22%] top-[38%] h-[32rem] w-[32rem] [--blob:rgba(167,139,250,0.22)] dark:[--blob:rgba(139,92,246,0.3)]"
      />
    </div>
  );
}
