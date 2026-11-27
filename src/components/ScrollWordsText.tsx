"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// A statement whose words light up one by one as the reader scrolls past it
// (synkt.ai-style). Scrubbed, NOT pinned - no scroll-jacking. The full text
// is in the DOM from the start (readable by screen readers / no-JS), and
// prefers-reduced-motion shows it fully lit.
export default function ScrollWordsText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.4,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [text]);

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-24">
      <p
        ref={ref}
        className="text-center text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {text.split(" ").map((w, i) => (
          <span key={i} data-word className="inline-block">
            {w}
            {" "}
          </span>
        ))}
      </p>
    </section>
  );
}
