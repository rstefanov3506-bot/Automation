"use client";

import Link from "next/link";
import { useId, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { content, type Locale } from "@/lib/content";

const WEEKS_PER_MONTH = 52 / 12;

// Pulls the first number out of a price string such as "499 €" or "99 €/мес".
function priceNumber(value: string): number {
  const match = value.replace(/\s/g, "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

// Client-side estimate only: nothing is sent anywhere. Pricing figures come
// from the highlighted (Growth) tier in content.ts so they never drift from
// the pricing section.
export default function RoiCalculator({ locale }: { locale: Locale }) {
  const all = content[locale];
  const t = all.roi;
  const contactHref = locale === "bg" ? "/contact" : "/en/contact";
  const tier = all.pricing.tiers.find((x) => x.highlighted) ?? all.pricing.tiers[0];
  const build = priceNumber(tier.build);
  const monthly = priceNumber(tier.monthly);

  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(15);
  const [share, setShare] = useState(50);
  const id = useId();

  const lostHours = hours * WEEKS_PER_MONTH;
  const saved = lostHours * rate * (share / 100);
  const net = saved - monthly;
  const payback = net > 0 ? build / net : null;

  const fmt = new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    maximumFractionDigits: 0,
  });

  const sliders = [
    { key: "hours", label: t.hoursLabel, value: hours, set: setHours, min: 1, max: 40, step: 1, suffix: ` ${t.hoursUnit}` },
    { key: "rate", label: t.rateLabel, value: rate, set: setRate, min: 5, max: 80, step: 1, suffix: " €" },
    { key: "share", label: t.shareLabel, value: share, set: setShare, min: 10, max: 90, step: 5, suffix: "%" },
  ];

  return (
    <section id="roi" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.subtitle}</p>
      </div>

      <ScrollReveal className="mt-10">
        <div className="edge-light grid gap-10 rounded-2xl border border-border bg-surface p-6 md:grid-cols-2 md:p-10">
          <div className="space-y-8">
            {sliders.map((s) => (
              <div key={s.key}>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`${id}-${s.key}`} className="text-sm font-medium">
                    {s.label}
                  </label>
                  <span className="shrink-0 text-lg font-bold tabular-nums text-accent">
                    {s.value}
                    {s.suffix}
                  </span>
                </div>
                <input
                  id={`${id}-${s.key}`}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="roi-range mt-3 w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col" aria-live="polite">
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="text-xs text-muted">{t.lostLabel}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums">
                  {fmt.format(lostHours)} {t.hoursUnit}
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="text-xs text-muted">{t.savedLabel}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums">{fmt.format(saved)} €</dd>
              </div>
              <div className="col-span-2 rounded-xl border border-accent bg-background p-4">
                <dt className="text-xs text-muted">
                  {t.paybackLabel} ({tier.build} + {tier.monthly})
                </dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-accent">
                  {payback === null
                    ? t.paybackNever
                    : `${payback < 1 ? "< 1" : fmt.format(Math.ceil(payback))} ${t.paybackUnit}`}
                </dd>
              </div>
            </dl>
            <div className="mt-6 md:mt-auto md:pt-6">
              <p className="text-sm text-muted">{t.note}</p>
              <Link
                href={contactHref}
                className="mt-5 inline-block rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
