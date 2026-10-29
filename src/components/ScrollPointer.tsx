"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Our answer to the "bee that flies across the page as you scroll"
// reference: a small automation-drone mascot that hovers next to the
// next clickable button on the page — hero CTA, then the highlighted
// pricing plan, then the contact button — and travels from one to the
// next as you scroll, instead of following an arbitrary path. Any
// element can opt in with a `data-drone-target` attribute. Desktop
// only, off for reduced-motion.
export default function ScrollPointer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const wingLRef = useRef<SVGEllipseElement>(null);
  const wingRRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !bodyRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let flightTween: gsap.core.Tween | undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bodyRef.current,
        { scale: 0.4, opacity: 0, rotate: -20 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(2)", delay: 0.4 }
      );

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

      gsap.to(bodyRef.current, {
        y: -8,
        rotate: 6,
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });
    });

    // Builds (or rebuilds) the flight path from the live position of
    // every [data-drone-target] element on the current page. Uses
    // document-space coordinates (absolute positioning) so the marker
    // scrolls naturally with the page instead of needing per-frame
    // recalculation against the viewport.
    function buildFlight() {
      if (!wrapRef.current) return;
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-drone-target]")
      );
      flightTween?.scrollTrigger?.kill();
      flightTween?.kill();
      if (targets.length === 0) return;

      const docHeight = document.documentElement.scrollHeight;
      const viewportH = window.innerHeight;
      const scrollable = Math.max(docHeight - viewportH, 1);

      const keyframes: Record<string, { top: string; left: string }> = {
        "0%": { top: "18%", left: "84%" },
      };

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const docTop = rect.top + window.scrollY;
        const docCenterX = rect.left + window.scrollX + rect.width / 2;
        // Scroll position at which this button sits roughly mid-viewport.
        const scrollAtTarget = Math.min(
          Math.max(docTop - viewportH * 0.55, 0),
          scrollable
        );
        const pct = ((scrollAtTarget / scrollable) * 100).toFixed(2);
        keyframes[`${pct}%`] = {
          top: `${Math.round(docTop - 64)}px`,
          left: `${Math.round(docCenterX + 110)}px`,
        };
      });

      flightTween = gsap.to(wrapRef.current, {
        keyframes,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: () => document.documentElement.scrollHeight - window.innerHeight,
          scrub: 0.6,
        },
      });
    }

    const t1 = setTimeout(buildFlight, 350);
    const t2 = setTimeout(buildFlight, 1200);
    const onLoad = () => buildFlight();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t1);
      clearTimeout(t2);
      flightTween?.scrollTrigger?.kill();
      flightTween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={wrapRef}
      className="pointer-events-none absolute z-40 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      style={{ top: "18%", left: "84%" }}
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
