"use client";

import { useEffect, useRef } from "react";

// Lightweight canvas particle field for the hero backdrop - small moving
// dots connected by thin lines when close together, the same low-cost
// technique sites like ttegav.com use (plain canvas, no library). Kept
// cheap: capped particle count, pauses when off-screen or tab hidden,
// skipped entirely for reduced-motion.
export default function HeroParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    type Particle = { x: number; y: number; vx: number; vy: number };
    let particles: Particle[] = [];

    // Theme-aware: re-read the accent and how strong to draw whenever the
    // theme toggles. Light mode needs much higher alpha - at the old shared
    // values the field was effectively invisible on the pale background.
    let accent = "#10b981";
    let dotA = 0.5;
    let lineA = 0.18;

    const hexToRgb = (hex: string) => {
      const m = hex.replace("#", "");
      const bigint = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };
    let [ar, ag, ab] = hexToRgb(accent);
    const readTheme = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#10b981";
      [ar, ag, ab] = hexToRgb(accent);
      const dark = document.documentElement.classList.contains("dark");
      dotA = dark ? 0.55 : 0.75;
      lineA = dark ? 0.22 : 0.32;
    };
    readTheme();
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(80, Math.round((width * height) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.min(Math.max(p.x, 0), width);
        p.y = Math.min(Math.max(p.y, 0), height);
      }

      const linkDist = 130;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${dotA})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, ${lineA * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(step);
      else cancelAnimationFrame(raf);
    };

    resize();
    raf = requestAnimationFrame(step);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
