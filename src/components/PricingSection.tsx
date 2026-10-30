import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { content, type Locale } from "@/lib/content";

export default function PricingSection({
  locale,
  teaser = false,
}: {
  locale: Locale;
  teaser?: boolean;
}) {
  const t = content[locale];
  const contactHref = locale === "bg" ? "/contact" : "/en/contact";
  const tiers = teaser
    ? t.pricing.tiers.filter((tier) => tier.highlighted)
    : t.pricing.tiers;

  return (
    <section
      id="pricing"
      className={`border-y border-border bg-surface/50 ${teaser ? "py-20" : "py-24"}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{t.pricing.title}</h2>
          <p className="mt-3 text-muted">{t.pricing.subtitle}</p>
        </div>
        <ScrollReveal
          className={`mt-12 grid grid-cols-1 gap-6 ${
            teaser ? "mx-auto max-w-sm" : "md:grid-cols-3"
          }`}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-8 transition hover:-translate-y-1 ${
                tier.highlighted
                  ? "border-accent bg-background shadow-accent ring-1 ring-accent md:scale-105"
                  : "border-border bg-background hover:border-accent/50"
              }`}
            >
              {tier.badge && (
                <span className="mb-4 inline-block w-fit rounded-full bg-ember px-3 py-1 text-xs font-semibold text-ember-contrast">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold">{tier.build}</span>
                <span className="text-sm text-muted"> build</span>
              </div>
              <div className="mt-1 text-sm text-muted">+ {tier.monthly}</div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={contactHref}
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                  tier.highlighted
                    ? "bg-accent text-accent-contrast hover:opacity-90"
                    : "border border-border hover:border-accent"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </ScrollReveal>
        {!teaser && (
          <p className="mt-8 text-center text-sm text-muted">{t.pricing.addonNote}</p>
        )}
      </div>
    </section>
  );
}
