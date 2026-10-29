"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Small decorative neural-network graphic (nodes + connections) used
// behind the hero's dashboard mock — the holographic-AI-visual touch
// from the reference image, done as a lightweight SVG instead of a
// stock photo. Lines "flow" via an animated dash offset, nodes pulse
// gently at random offsets.
const LAYERS = [3, 4, 3];
const WIDTH = 320;
const HEIGHT = 220;

function layerX(i: number) {
  return (WIDTH / (LAYERS.length - 1)) * i;
}

function nodeY(count: number, i: number) {
  const gap = HEIGHT / (count + 1);
  return gap * (i + 1);
}

const points = LAYERS.map((count, li) =>
  Array.from({ length: count }, (_, ni) => ({ x: layerX(li), y: nodeY(count, ni) }))
);

const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let li = 0; li < points.length - 1; li++) {
  for (const a of points[li]) {
    for (const b of points[li + 1]) {
      lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
  }
}

export default function NeuralNetwork({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const lineEls = el.querySelectorAll<SVGLineElement>("[data-nn-line]");
    const flow = gsap.to(lineEls, {
      strokeDashoffset: "-=28",
      duration: 2.5,
      ease: "none",
      repeat: -1,
    });

    const nodeEls = el.querySelectorAll<SVGCircleElement>("[data-nn-node]");
    const pulse = gsap.to(nodeEls, {
      opacity: 0.3,
      duration: 1.3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.18, from: "random" },
    });

    return () => {
      flow.kill();
      pulse.kill();
    };
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      fill="none"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          data-nn-line
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="4 10"
        />
      ))}
      {points.flat().map((p, i) => (
        <circle
          key={i}
          data-nn-node
          cx={p.x}
          cy={p.y}
          r="4"
          fill="var(--accent)"
        />
      ))}
    </svg>
  );
}
