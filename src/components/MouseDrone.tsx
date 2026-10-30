"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const STORAGE_KEY = "drone-cursor-disabled";
const LABELS = {
  bg: { on: "Изключи курсора-дрон", off: "Включи курсора-дрон" },
  en: { on: "Turn off the drone cursor", off: "Turn on the drone cursor" },
};

// Replaces the system cursor with the automation-drone mascot so its
// movement has a real, obvious logic - it follows the user's actual
// mouse almost 1:1, with just enough smoothing to keep the tilt/wing
// motion readable, instead of an arbitrary scroll-driven flight path.
// Only on devices with a real mouse; left alone entirely on touch and
// for reduced-motion. A small, discreet toggle lets anyone who finds it
// distracting switch back to their normal pointer - the replacement had
// no escape hatch before, which removes a standard cursor affordance
// with no way to opt out.
export default function MouseDrone() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const wingLRef = useRef<SVGEllipseElement>(null);
  const wingRRef = useRef<SVGEllipseElement>(null);

  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const pathname = usePathname();
  const labels = pathname.startsWith("/en") ? LABELS.en : LABELS.bg;

  // Determine support once on mount, and read the saved preference.
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSupported(canHover && !reduced);
    try {
      setEnabled(localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {}
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "0" : "1");
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    if (!supported || !enabled) {
      document.documentElement.classList.remove("drone-cursor");
      return;
    }
    if (!wrapRef.current || !bodyRef.current) return;

    document.documentElement.classList.add("drone-cursor");

    // quickSetter writes the transform directly with no tween/lerp at all,
    // so the drone tracks the real cursor 1:1 - only the rotation/scale
    // flourishes below stay eased for a bit of life.
    const xTo = gsap.quickSetter(wrapRef.current, "x", "px");
    const yTo = gsap.quickSetter(wrapRef.current, "y", "px");

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.set(wrapRef.current, { x: e.clientX, y: e.clientY });
        gsap.to(bodyRef.current, { opacity: 1, scale: 1, duration: 0.3 });
        visible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        gsap.to(bodyRef.current, {
          rotate: gsap.utils.clamp(-25, 25, angle * 0.15),
          duration: 0.08,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onLeave = () => {
      gsap.to(bodyRef.current, { opacity: 0, duration: 0.25 });
      visible = false;
    };

    const onDown = () => gsap.to(bodyRef.current, { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to(bodyRef.current, { scale: 1, duration: 0.25, ease: "back.out(2)" });

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const wingTweens = [wingLRef.current, wingRRef.current].map((wing) => {
      if (!wing) return null;
      return gsap.to(wing, {
        scaleY: 0.35,
        duration: 0.11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
    });

    return () => {
      document.documentElement.classList.remove("drone-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      wingTweens.forEach((tw) => tw?.kill());
    };
  }, [supported, enabled]);

  return (
    <>
      {supported && enabled && (
        <div
          aria-hidden
          ref={wrapRef}
          className="pointer-events-none fixed left-0 top-0 z-[9999]"
          style={{ width: 0, height: 0 }}
        >
          <div
            ref={bodyRef}
            className="relative opacity-0"
            style={{ marginLeft: "-20px", marginTop: "-20px" }}
          >
            <div className="absolute inset-0 -z-10 scale-[2.2] rounded-full bg-accent/25 blur-xl" />
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
              <ellipse
                ref={wingLRef}
                cx="15"
                cy="27"
                rx="12"
                ry="6.5"
                fill="var(--accent)"
                opacity="0.4"
              />
              <ellipse
                ref={wingRRef}
                cx="49"
                cy="27"
                rx="12"
                ry="6.5"
                fill="var(--accent)"
                opacity="0.4"
              />
              <rect
                x="22"
                y="22"
                width="20"
                height="22"
                rx="10"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <circle cx="32" cy="32" r="4" fill="var(--accent)" />
              <circle cx="26" cy="40" r="1.6" fill="var(--accent)" opacity="0.7" />
              <circle cx="38" cy="40" r="1.6" fill="var(--accent)" opacity="0.7" />
              <path
                d="M27 22 L24 15M37 22 L40 15"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="24" cy="14" r="1.6" fill="var(--accent)" />
              <circle cx="40" cy="14" r="1.6" fill="var(--accent)" />
            </svg>
          </div>
        </div>
      )}

      {supported && (
        <button
          type="button"
          onClick={toggle}
          aria-label={enabled ? labels.on : labels.off}
          title={enabled ? labels.on : labels.off}
          className="fixed bottom-4 right-4 z-[9998] flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/80 text-muted opacity-40 backdrop-blur transition hover:opacity-100 hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 3l7.07 17 2.51-7.39L21 10.07 4 3z" />
            {!enabled && <path d="M3 3l18 18" />}
          </svg>
        </button>
      )}
    </>
  );
}
