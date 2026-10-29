"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Slow-drifting blurred color blobs — the "aurora mesh" look used by most
// premium agency/SaaS sites for hero backgrounds. Pure CSS blur + GSAP,
// no images needed.
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
        className="absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-accent/30 blur-[90px]"
      />
      <div
        data-blob
        className="absolute -right-20 top-10 h-[22rem] w-[22rem] rounded-full bg-sky-400/20 blur-[90px] dark:bg-sky-500/20"
      />
      <div
        data-blob
        className="absolute left-1/3 top-1/2 h-[20rem] w-[20rem] rounded-full bg-violet-400/15 blur-[90px] dark:bg-violet-500/15"
      />
    </div>
  );
}
