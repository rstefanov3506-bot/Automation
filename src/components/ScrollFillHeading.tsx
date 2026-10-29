"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The hero headline starts as a thin outline and fills in solid/gradient
// over the first ~300px of scroll - rewards the first scroll instead of
// handing over the finished look immediately. Two stacked copies of the
// same text: an outline layer (always visible, sets the layout box) and
// a filled layer absolutely positioned on top whose opacity is scrubbed
// by scroll position. Only the filled layer is readable by screen
// readers; the outline duplicate is aria-hidden.
export default function ScrollFillHeading({
  title,
  accent,
  className = "",
}: {
  title: string;
  accent: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !fillRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(fillRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        fillRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none" }
      );
      ScrollTrigger.create({
        start: 0,
        end: 300,
        scrub: true,
        animation: tween,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <h1
        aria-hidden
        className={`${className} select-none text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]`}
      >
        {title} {accent}
      </h1>
      <h1 ref={fillRef} className={`${className} absolute inset-0 opacity-0`}>
        {title} <span className="gradient-text">{accent}</span>
      </h1>
    </div>
  );
}
