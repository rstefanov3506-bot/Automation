import Link from "next/link";
import AnimatedCard from "./AnimatedCard";
import ScrollReveal from "./ScrollReveal";
import IdleFloat from "./IdleFloat";
import AuroraBackground from "./AuroraBackground";
import TiltCard from "./TiltCard";
import ScrollFillHeading from "./ScrollFillHeading";
import ParallaxFloat from "./ParallaxFloat";
import { content, brand, type Locale } from "@/lib/content";

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = content[locale];
  const pricingHref = locale === "bg" ? "/pricing" : "/en/pricing";
  const contactHref = locale === "bg" ? "/contact" : "/en/contact";

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="bg-noise pointer-events-none absolute inset-0 z-[1] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <AuroraBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2">
        <ScrollReveal stagger={0.12}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 label-mono text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.eyebrow}
          </p>
          <ScrollFillHeading
            title={t.hero.title}
            accent={t.hero.titleAccent}
            className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          />
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

        {/* Dashboard preview mock */}
        <IdleFloat className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/20" />

          <ParallaxFloat speed={-0.14} className="absolute -left-8 -top-10 z-20 hidden sm:block">
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-surface/95 px-4 py-3 shadow-xl backdrop-blur">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm text-accent">
                ✓
              </span>
              <div>
                <div className="text-xs font-semibold">Нов лийд</div>
                <div className="font-mono text-xs text-muted">Уеб форма · преди 2 мин</div>
              </div>
            </div>
          </ParallaxFloat>

          <ParallaxFloat speed={0.2} className="absolute -bottom-8 -right-4 z-20 hidden sm:block">
            <div className="rounded-xl border border-border bg-surface/95 px-4 py-3 shadow-xl backdrop-blur">
              <div className="text-xs text-muted">SEO трафик</div>
              <div className="mt-0.5 flex items-center gap-1 text-lg font-bold text-accent">
                <span aria-hidden>▲</span> +24%
              </div>
            </div>
          </ParallaxFloat>

          <TiltCard>
            <AnimatedCard className="relative edge-light rounded-2xl border border-border bg-surface/90 p-6 shadow-accent backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-muted">
                  {brand} · dashboard
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { label: "Lead capture", status: "active" },
                  { label: "WhatsApp assistant", status: "active" },
                  { label: "SEO reports", status: "running" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
                  >
                    <span className="text-sm font-medium">{row.label}</span>
                    <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </TiltCard>
        </IdleFloat>
      </div>
    </section>
  );
}
