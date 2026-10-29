"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Shape = {
  type: "diamond" | "circle" | "ring";
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
};

const shapes: Shape[] = [
  { type: "diamond", top: "8%", left: "6%", size: 14, duration: 6, delay: 0 },
  { type: "circle", top: "18%", left: "88%", size: 10, duration: 7, delay: 0.4 },
  { type: "ring", top: "72%", left: "10%", size: 22, duration: 8, delay: 0.8 },
  { type: "diamond", top: "80%", left: "82%", size: 16, duration: 6.5, delay: 1.2 },
  { type: "circle", top: "40%", left: "4%", size: 8, duration: 5.5, delay: 0.2 },
  { type: "diamond", top: "4%", left: "60%", size: 11, duration: 7.5, delay: 1.6 },
  { type: "ring", top: "60%", left: "92%", size: 18, duration: 9, delay: 0.6 },
];

function ShapeSvg({ type, size }: { type: Shape["type"]; size: number }) {
  if (type === "diamond") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className="text-accent">
        <path
          d="M12 2 L22 12 L12 22 L2 12 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  if (type === "ring") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className="text-accent">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="text-accent">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
    </svg>
  );
}

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>("[data-float]");
    if (!els) return;

    const tweens: gsap.core.Tween[] = [];
    els.forEach((el) => {
      const duration = Number(el.dataset.duration ?? 6);
      const delay = Number(el.dataset.delay ?? 0);
      gsap.set(el, { opacity: 0 });
      const tween = gsap.to(el, {
        y: "-=18",
        x: "+=8",
        rotate: 12,
        opacity: 0.55,
        duration,
        delay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tw) => tw.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          data-float
          data-duration={s.duration}
          data-delay={s.delay}
          className="absolute"
          style={{ top: s.top, left: s.left }}
        >
          <ShapeSvg type={s.type} size={s.size} />
        </div>
      ))}
    </div>
  );
}
