import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AuroraBackground from "./AuroraBackground";
import FlowHero from "./FlowHero";
import { content, type Locale } from "@/lib/content";

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = content[locale];
  const pricingHref = locale === "bg" ? "/pricing" : "/en/pricing";
  const contactHref = locale === "bg" ? "/contact" : "/en/contact";

  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden">
      <div className="bg-noise pointer-events-none absolute inset-0 z-[1] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <AuroraBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal stagger={0.12}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 label-mono text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.eyebrow}
          </p>
          {/* Solid from the first paint: the old outline-until-scroll effect made
              the most important line on the page hard to read. */}
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.title} <span className="gradient-text">{t.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">{t.hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={pricingHref}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-[0_8px_30px_-8px_var(--accent)] transition hover:scale-[1.03] hover:opacity-90"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href={contactHref}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-accent"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>

          <div className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="gradient-text text-2xl font-bold tracking-tight sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Live automation run along the Path N logo - replaces the static
            dashboard mock (and its two parallax cards) so the hero carries
            one moving story instead of several decorative layers. */}
        <div className="relative mx-auto w-full max-w-sm lg:mr-0 lg:max-w-[420px]">
          <FlowHero locale={locale} />
        </div>
      </div>
    </section>
  );
}
