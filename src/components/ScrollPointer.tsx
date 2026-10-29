"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// A small AI-node marker that rides a fixed vertical track and travels
// from top to bottom as the visitor scrolls through the whole page —
// our answer to the "bee that moves as you scroll" reference, just with
// an automation/node motif instead of a bee. Desktop only (there's no
// room for a side rail on phones) and off entirely for reduced-motion.
export default function ScrollPointer() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(dotRef.current, {
        rotate: 360,
        duration: 9,
        ease: "none",
        repeat: -1,
      });

      gsap.fromTo(
        dotRef.current,
        { top: "8%" },
        {
          top: "92%",
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-4 top-0 z-40 hidden h-screen w-10 lg:block xl:right-8"
    >
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-[6%] bottom-[6%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent" />
        <div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: "8%" }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            className="text-accent drop-shadow-[0_0_10px_var(--accent)]"
          >
            <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <circle cx="12" cy="12" r="2.6" fill="currentColor" />
            <circle cx="12" cy="3" r="1.3" fill="currentColor" />
            <circle cx="21" cy="12" r="1.3" fill="currentColor" opacity="0.75" />
            <circle cx="12" cy="21" r="1.3" fill="currentColor" opacity="0.5" />
            <circle cx="3" cy="12" r="1.3" fill="currentColor" opacity="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}
