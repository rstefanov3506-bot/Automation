"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { content, type Locale } from "@/lib/content";

// Goal-first entry point: visitors pick an outcome instead of scanning a
// catalogue of categories, and each tab shows one concrete automation flow.
// Plain state + CSS fade, no scroll-jacking (pinned effects were rejected
// on the automations section before).
export default function GoalsSection({ locale }: { locale: Locale }) {
  const t = content[locale].goals;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const pricingHref = "#pricing";
  const contactHref = locale === "bg" ? "/contact" : "/en/contact";
  const tab = t.tabs[active];

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const last = t.tabs.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="goals" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="text-center">
        <p className="label-mono text-accent">{t.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.subtitle}</p>
      </div>

      <ScrollReveal className="mt-10">
        <div>
          <div
            role="tablist"
            aria-label={t.title}
            onKeyDown={onKeyDown}
            className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-surface/60 p-1.5 backdrop-blur md:grid-cols-4"
          >
            {t.tabs.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    selected
                      ? "bg-accent text-accent-contrast"
                      : "text-muted hover:bg-background hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            key={active}
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active}`}
            className="goal-panel edge-light mt-4 grid gap-8 rounded-2xl border border-border bg-surface p-6 md:grid-cols-[1fr_1.1fr] md:grid-rows-[auto_1fr] md:p-10"
          >
            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {tab.headline}
              </h3>
              <p className="mt-4 text-muted">{tab.result}</p>
            </div>

            <ol className="relative space-y-5 md:col-start-2 md:row-span-2 md:row-start-1">
              {tab.steps.map((step, i) => (
                <li key={step} className="relative flex items-start gap-4">
                  {i < tab.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[15px] top-8 h-[calc(100%-4px)] w-px bg-border"
                    />
                  )}
                  <span
                    className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${
                      i === tab.steps.length - 1
                        ? "border-accent bg-accent text-accent-contrast"
                        : "border-border bg-background text-accent"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap gap-3 self-end md:col-start-1 md:row-start-2">
              <Link
                href={pricingHref}
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
              >
                {t.ctaPrimary}
              </Link>
              <Link
                href={contactHref}
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-accent"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
