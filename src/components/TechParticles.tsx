"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const glyphs = [
  "</>",
  "{ }",
  "01",
  "AI",
  "API",
  "fetch()",
  "webhook",
  "0x1A",
  "n8n",
  "POST",
  "if (ok)",
  "cron",
];

const particles = glyphs.map((glyph, i) => ({
  glyph,
  top: `${(i * 37) % 88 + 5}%`,
  left: `${(i * 53) % 86 + 4}%`,
  size: 11 + (i % 3) * 2,
  duration: 9 + (i % 4) * 2.2,
  delay: (i % 5) * 0.6,
}));

// Faint, slow-drifting technical glyphs across the whole page — the
// "something technical" ambient layer the design asked for. Kept cheap:
// a dozen small text nodes, transform-only tweens, no layout thrash, and
// off entirely under reduced-motion.
export default function TechParticles() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-particle]");
    if (!els) return;

    const tweens: gsap.core.Tween[] = [];
    els.forEach((el, i) => {
      gsap.set(el, { opacity: 0 });
      tweens.push(
        gsap.to(el, {
          y: i % 2 === 0 ? "-=22" : "+=22",
          x: i % 3 === 0 ? "+=14" : "-=14",
          opacity: 1,
          duration: Number(el.dataset.duration),
          delay: Number(el.dataset.delay),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden opacity-[0.22] dark:opacity-[0.16]"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          data-particle
          data-duration={p.duration}
          data-delay={p.delay}
          className="absolute select-none font-mono font-medium text-muted"
          style={{ top: p.top, left: p.left, fontSize: p.size }}
        >
          {p.glyph}
        </div>
      ))}
    </div>
  );
}
