"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Our take on the "bee that moves as you scroll" reference: a small
// automation-node marker that drops into place on load, idles with a
// gentle wobble, and rides a fixed track down the page as you scroll —
// a persistent, clearly visible companion, not a background decoration.
// Desktop only, and off entirely for reduced-motion.
export default function ScrollPointer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !nodeRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Drop-in entrance
      gsap.fromTo(
        nodeRef.current,
        { y: -40, opacity: 0, scale: 0.6, rotate: -25 },
        { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.7)", delay: 0.3 }
      );

      // Idle wobble/sway, like a little creature keeping itself alive
      gsap.to(nodeRef.current, {
        rotate: 10,
        x: 4,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });

      // Vertical travel tied to whole-document scroll progress
      gsap.fromTo(
        wrapRef.current,
        { top: "10%" },
        {
          top: "88%",
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-5 z-40 hidden w-16 lg:block xl:right-10"
    >
      <div className="absolute left-1/2 top-[8%] bottom-[8%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent" />
      <div
        ref={wrapRef}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: "10%" }}
      >
        <div ref={nodeRef} className="relative">
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-accent/30 blur-xl" />
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="16" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="5" fill="var(--accent)" />
            <circle cx="22" cy="7" r="2.2" fill="var(--accent)" />
            <circle cx="37" cy="22" r="2.2" fill="var(--accent)" opacity="0.8" />
            <circle cx="22" cy="37" r="2.2" fill="var(--accent)" opacity="0.6" />
            <circle cx="7" cy="22" r="2.2" fill="var(--accent)" opacity="0.8" />
            <path d="M22 11v6M22 27v6M11 22h6M27 22h6" stroke="var(--accent)" strokeWidth="1.2" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
