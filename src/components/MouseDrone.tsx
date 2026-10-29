"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Replaces the system cursor with the automation-drone mascot so its
// movement has a real, obvious logic — it follows the user's actual
// mouse (smoothed with a touch of trailing lag) instead of an
// arbitrary scroll-driven flight path. Only on devices with a real
// mouse; left alone entirely on touch and for reduced-motion.
export default function MouseDrone() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const wingLRef = useRef<SVGEllipseElement>(null);
  const wingRRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    if (!wrapRef.current || !bodyRef.current) return;

    document.documentElement.classList.add("drone-cursor");

    const xTo = gsap.quickTo(wrapRef.current, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(wrapRef.current, "y", { duration: 0.45, ease: "power3" });

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
          duration: 0.3,
          ease: "power2.out",
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

    [wingLRef.current, wingRRef.current].forEach((wing) => {
      if (!wing) return;
      gsap.to(wing, {
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
    };
  }, []);

  return (
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
  );
}
