"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Item = { readonly name: string; readonly desc: string };

// Pins the section while the user scrolls through one item at a time -
// the "Add -> Send -> Exchange" stepped reveal used on jeton.com, applied
// to the automation categories. Server-rendered markup is a plain stacked
// list (readable without JS, and the reduced-motion/no-pin fallback);
// once mounted (and motion isn't reduced) the panels switch to absolute
// stacking and crossfade as a single pinned scroll timeline drives them.
export default function AutomationsStepper({ items }: { items: readonly Item[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const panels = panelRefs.current.filter((p): p is HTMLDivElement => !!p);
    if (panels.length < 2) return;

    setLive(true);

    const ctx = gsap.context(() => {
      gsap.set(panels, { opacity: 0, y: 24 });
      gsap.set(panels[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline();
      panels.forEach((panel, i) => {
        tl.to({}, { duration: 0.6 });
        if (i < panels.length - 1) {
          tl.to(panel, { opacity: 0, y: -24, duration: 0.3, ease: "power1.inOut" }, ">");
          tl.fromTo(
            panels[i + 1],
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power1.inOut" },
            "<"
          );
        }
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${panels.length * 480}`,
        pin: true,
        scrub: true,
        animation: tl,
        onUpdate: (self) => {
          setActive(Math.min(panels.length - 1, Math.floor(self.progress * panels.length)));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <div
      ref={sectionRef}
      className={`mx-auto w-full max-w-3xl px-6 ${
        live ? "relative flex h-[70vh] min-h-[420px] items-center justify-center" : "space-y-10 py-8"
      }`}
    >
      {items.map((item, i) => (
        <div
          key={item.name}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          className={
            live
              ? "absolute inset-0 flex flex-col items-center justify-center text-center"
              : "text-center"
          }
        >
          <span className="text-sm font-semibold text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{item.name}</h3>
          <p className="mx-auto mt-4 max-w-md text-muted">{item.desc}</p>
        </div>
      ))}

      {live && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((item, i) => (
            <span
              key={item.name}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-accent" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
