"use client";

import { useEffect, useRef, useState } from "react";
import { content, type Locale } from "@/lib/content";

// Hero visual: a live "automation run" drawn along the Path N logo -
// trigger (bottom-left) -> agent (middle of the diagonal) -> result
// (top-right). Each loop plays one real scenario from content.ts, so the
// animation explains the service instead of decorating the page.
//
// Cost budget: one 2D canvas, no libraries, no image/video assets.
// Particle counts scale with the panel size, DPR is capped at 2, the loop
// stops when the panel is off-screen or the tab is hidden, and
// prefers-reduced-motion gets a single static "done" frame.

type Phase = "ping" | "toAgent" | "work" | "toResult" | "done" | "fade";
const TIMELINE: [Phase, number][] = [
  ["ping", 700],
  ["toAgent", 1700],
  ["work", 1200],
  ["toResult", 1500],
  ["done", 1700],
  ["fade", 600],
];
const CYCLE = TIMELINE.reduce((sum, [, ms]) => sum + ms, 0);

// Logo geometry on a 24-unit grid (keep in sync with LogoMark / brand/logo).
const N: [number, number][] = [
  [6, 19],
  [6, 5],
  [12, 12],
  [18, 19],
  [18, 5],
];

type Colors = { ink: string; accent: string; bg: string; dark: boolean };

function readColors(): Colors {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    ink: v("--foreground", "#f5f5f4"),
    accent: v("--accent", "#ff8a4c"),
    bg: v("--background", "#0a0d12"),
    dark: document.documentElement.classList.contains("dark"),
  };
}

function rgba(hex: string, a: number) {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

function phaseAt(t: number): [Phase, number] {
  let acc = 0;
  for (const [name, ms] of TIMELINE) {
    if (t < acc + ms) return [name, (t - acc) / ms];
    acc += ms;
  }
  return ["fade", 1];
}

export default function FlowHero({ locale }: { locale: Locale }) {
  const t = content[locale].flow;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  // Caption state changes a few times per loop only; the canvas itself never re-renders React.
  const [caption, setCaption] = useState({ scenario: 0, step: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors();
    let W = 0, H = 0, s = 1;
    let pts: [number, number][] = [];
    let segLen: number[] = [];
    let total = 0;

    type Dust = { x: number; y: number; r: number; a: number; v: number };
    type Bit = { o: number; w: number; sp: number; r: number };
    let dust: Dust[] = [];
    let bits: Bit[] = [];

    const placeTag = (el: HTMLDivElement | null, p: [number, number], dx: number, dy: number) => {
      if (!el) return;
      el.style.left = `${p[0] + dx * s}px`;
      el.style.top = `${p[1] + dy * s}px`;
    };

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      s = Math.min(W * 0.78, H * 0.74) / 24;
      const ox = W * 0.52 - 12 * s;
      const oy = H * 0.44 - 12 * s;
      pts = N.map(([x, y]) => [ox + x * s, oy + y * s]);
      segLen = [];
      total = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
        segLen.push(l);
        total += l;
      }
      placeTag(triggerRef.current, pts[0], -1.2, 2.4);
      placeTag(agentRef.current, pts[2], 3.4, -1.6);
      placeTag(resultRef.current, pts[4], -0.6, -2.6);

      const area = (W * H) / (520 * 520);
      dust = Array.from({ length: Math.round(90 * area) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.1 + 0.3,
        a: Math.random() * 0.35 + 0.08,
        v: Math.random() * 0.12 + 0.03,
      }));
      bits = Array.from({ length: Math.round(Math.min(420, 300 * area)) }, () => ({
        o: Math.random(),
        w: (Math.random() - 0.5) * 2,
        sp: 0.7 + Math.random() * 0.6,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    // Point (+ unit normal) at distance d along the N path.
    const at = (d: number): [number, number, number, number] => {
      d = Math.max(0, Math.min(total, d));
      for (let i = 0; i < segLen.length; i++) {
        if (d <= segLen[i]) {
          const k = d / segLen[i];
          const a = pts[i], b = pts[i + 1];
          return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, (b[1] - a[1]) / segLen[i], -(b[0] - a[0]) / segLen[i]];
        }
        d -= segLen[i];
      }
      const last = pts[pts.length - 1];
      return [last[0], last[1], 0, 0];
    };

    const glow = (x: number, y: number, r: number, a: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(colors.accent, a));
      g.addColorStop(1, rgba(colors.accent, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const ring = (x: number, y: number, r: number, a: number) => {
      ctx.strokeStyle = rgba(colors.accent, a);
      ctx.lineWidth = Math.max(1, s * 0.08);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    };

    let lastScenario = -1, lastStep = -1;
    const start = performance.now();

    const draw = (now: number) => {
      const elapsed = now - start;
      const loop = elapsed % CYCLE;
      const scenario = Math.floor(elapsed / CYCLE) % t.scenarios.length;
      const [ph, p] = phaseAt(loop);
      const agentAt = segLen[0] + segLen[1];

      let head = 0;
      if (ph === "toAgent") head = easeOut(p) * agentAt;
      else if (ph === "work") head = agentAt;
      else if (ph === "toResult") head = agentAt + easeOut(p) * (total - agentAt);
      else if (ph === "done" || ph === "fade") head = total;
      const fade = ph === "fade" ? 1 - p : 1;
      const agentOn = ph === "work" || ph === "toResult" || ph === "done";
      const done = ph === "done" || ph === "fade";

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // Night dust drifting up.
      ctx.fillStyle = colors.ink;
      for (const d of dust) {
        if (!reduce) {
          d.y -= d.v;
          if (d.y < -2) { d.y = H + 2; d.x = Math.random() * W; }
        }
        ctx.globalAlpha = d.a * (colors.dark ? 1 : 0.6);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // The route the work will take.
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = rgba(colors.ink, colors.dark ? 0.1 : 0.12);
      ctx.lineWidth = Math.max(2, s * 0.22);
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();

      // Travelled part, lit.
      if (head > 0) {
        ctx.strokeStyle = rgba(colors.accent, 0.6 * fade);
        ctx.lineWidth = Math.max(1.5, s * 0.12);
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        let d = 0;
        for (let i = 0; i < segLen.length; i++) {
          if (d + segLen[i] <= head) { ctx.lineTo(pts[i + 1][0], pts[i + 1][1]); d += segLen[i]; }
          else { const [x, y] = at(head); ctx.lineTo(x, y); break; }
        }
        ctx.stroke();
      }

      // Stream: additive glow on dark, plain on light so it never washes out.
      if (head > 0) {
        if (colors.dark) ctx.globalCompositeOperation = "lighter";
        const tSec = now / 1000;
        for (const b of bits) {
          const d = ((b.o + tSec * 0.11 * b.sp) % 1) * head;
          const [x, y, nx, ny] = at(d);
          const spread = s * 0.7 * (0.35 + 0.65 * Math.sin(d * 0.018 + b.o * 6) ** 2);
          const near = 1 - Math.min(1, (head - d) / (total * 0.4));
          ctx.globalAlpha = (0.18 + 0.55 * near) * fade;
          ctx.fillStyle = colors.accent;
          ctx.beginPath();
          ctx.arc(x + nx * b.w * spread, y + ny * b.w * spread, b.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        // Comet head while moving.
        if (ph === "toAgent" || ph === "toResult") {
          const [hx, hy] = at(head);
          glow(hx, hy, s * 2.4, 0.55);
        }
        ctx.globalCompositeOperation = "source-over";
      }

      // Nodes.
      const r = s * 1.05;
      const node = (x: number, y: number, lit: boolean, filled: boolean) => {
        ctx.globalAlpha = 1;
        ctx.fillStyle = filled ? colors.accent : colors.bg;
        ctx.beginPath();
        ctx.arc(x, y, filled ? r * 1.12 : r, 0, Math.PI * 2);
        ctx.fill();
        if (!filled) {
          ctx.strokeStyle = lit ? colors.accent : rgba(colors.ink, 0.45);
          ctx.lineWidth = Math.max(1.5, s * 0.17);
          ctx.stroke();
        }
      };

      if (ph === "ping") {
        glow(pts[0][0], pts[0][1], r * 4, 0.35 * Math.sin(p * Math.PI));
        ring(pts[0][0], pts[0][1], r * (1.2 + p * 2.4), 0.7 * (1 - p));
      }
      if (ph === "work") glow(pts[2][0], pts[2][1], r * 4, 0.22 + 0.15 * Math.sin(p * Math.PI * 4));
      if (ph === "done") {
        glow(pts[4][0], pts[4][1], r * 5, 0.4 * (1 - p * 0.5));
        ring(pts[4][0], pts[4][1], r * (1.3 + easeOut(p) * 3), 0.6 * (1 - p));
      }
      if (ph === "fade") glow(pts[4][0], pts[4][1], r * 5, 0.2 * (1 - p));

      node(pts[0][0], pts[0][1], ph !== "fade", false);
      node(pts[2][0], pts[2][1], agentOn, false);
      node(pts[4][0], pts[4][1], false, done);

      // Agent "thinking" orbit.
      if (ph === "work") {
        const a0 = (now / 1000) * 3;
        ctx.fillStyle = colors.accent;
        for (let k = 0; k < 3; k++) {
          const a = a0 + (k * Math.PI * 2) / 3;
          ctx.beginPath();
          ctx.arc(pts[2][0] + Math.cos(a) * r * 1.9, pts[2][1] + Math.sin(a) * r * 1.9, s * 0.18, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Tags follow the run.
      const tagState = (el: HTMLDivElement | null, state: string) => {
        if (el && el.dataset.state !== state) el.dataset.state = state;
      };
      tagState(triggerRef.current, ph === "fade" ? "idle" : "on");
      tagState(agentRef.current, agentOn ? "on" : "idle");
      tagState(resultRef.current, done ? "done" : "idle");

      const step = done ? 2 : agentOn ? 1 : 0;
      if (scenario !== lastScenario || step !== lastStep) {
        lastScenario = scenario;
        lastStep = step;
        setCaption({ scenario, step });
      }
    };

    // Static frame for reduced motion: show a finished run.
    const staticFrame = () => draw(start + TIMELINE.slice(0, 4).reduce((a, [, ms]) => a + ms, 0) + 300);

    let raf = 0;
    let visible = false;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    layout();
    if (reduce) staticFrame();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else stop();
    });
    io.observe(wrap);

    const onVisibility = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) staticFrame();
    });
    ro.observe(wrap);

    // Re-read colors when the theme toggles.
    const mo = new MutationObserver(() => {
      colors = readColors();
      if (reduce) staticFrame();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // Refs are stable; scenarios come from static content per locale.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const sc = t.scenarios[caption.scenario];
  const next = caption.step < 2 ? `→ ${sc.steps[caption.step + 1]}` : `✓ ${t.done}`;

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={t.ariaLabel}
      className="flow-hero edge-light relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-surface/70 shadow-accent sm:aspect-[5/4] lg:aspect-square"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div ref={triggerRef} className="flow-tag" data-state="idle" aria-hidden="true">
        <i />
        {t.tags.trigger}
      </div>
      <div ref={agentRef} className="flow-tag" data-state="idle" aria-hidden="true">
        <i />
        {t.tags.agent}
      </div>
      <div ref={resultRef} className="flow-tag" data-state="idle" aria-hidden="true">
        <i />
        {t.tags.result}
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border bg-background/95 px-4 py-3 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-[70%]">
        <div className="label-mono text-accent">
          {caption.scenario + 1}/{t.scenarios.length} · {sc.name}
        </div>
        <div className="mt-1.5 text-sm font-semibold" aria-live="off">
          {sc.steps[caption.step]}
        </div>
        <div className="mt-0.5 font-mono text-xs text-muted">{next}</div>
      </div>
    </div>
  );
}
