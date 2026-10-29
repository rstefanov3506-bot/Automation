"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Our answer to the "bee that flies across the page as you scroll"
// reference: a sizeable automation-drone mascot with fluttering wings
// that weaves left-right and travels down the page as the whole
// document scrolls — not a thin side-rail dot. Desktop only, off for
// reduced-motion.
export default function ScrollPointer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const wingLRef = useRef<SVGEllipseElement>(null);
  const wingRRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !bodyRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(
        bodyRef.current,
        { scale: 0.4, opacity: 0, rotate: -20 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(2)", delay: 0.4 }
      );

      // Fast wing flutter
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

      // Idle bob + tilt while "hovering"
      gsap.to(bodyRef.current, {
        y: -8,
        rotate: 6,
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });

      // Flight path: weaves left/right and travels top-to-bottom across
      // the whole document's scroll progress. `end` is computed fresh on
      // every ScrollTrigger.refresh() so late-loading content (fonts,
      // images) that changes page height doesn't leave this stuck near
      // the top.
      gsap.to(wrapRef.current, {
        keyframes: {
          "0%": { top: "12%", left: "84%" },
          "20%": { top: "28%", left: "18%" },
          "40%": { top: "46%", left: "74%" },
          "60%": { top: "62%", left: "14%" },
          "80%": { top: "78%", left: "66%" },
          "100%": { top: "90%", left: "10%" },
        },
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: () => document.documentElement.scrollHeight - window.innerHeight,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    // Page height can still be settling after fonts/images load, which
    // leaves the scroll range stale — force a recalculation once things
    // have had a moment to finish.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1200);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={wrapRef}
      className="pointer-events-none fixed z-40 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      style={{ top: "12%", left: "84%" }}
    >
      <div ref={bodyRef} className="relative">
        <div className="absolute inset-0 -z-10 scale-[2.4] rounded-full bg-accent/25 blur-2xl" />
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
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
