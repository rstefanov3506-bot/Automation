import Link from "next/link";
import AnimatedCard from "./AnimatedCard";
import ThemeToggle from "./ThemeToggle";
import FloatingShapes from "./FloatingShapes";
import ScrollReveal from "./ScrollReveal";
import IdleFloat from "./IdleFloat";
import { content, brand, type Locale } from "@/lib/content";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const altLocale = locale === "bg" ? "en" : "bg";
  const altHref = locale === "bg" ? "/en" : "/";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">
            {brand}
          </span>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
            {t.nav.links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={altHref}
              className="text-sm font-medium text-muted transition hover:text-foreground"
            >
              {altLocale.toUpperCase()}
            </Link>
            <ThemeToggle />
            <a
              href="#contact"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <FloatingShapes />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:pt-28">
          <ScrollReveal stagger={0.12}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t.hero.eyebrow}
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-accent"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </ScrollReveal>

          {/* Dashboard preview mock */}
          <IdleFloat className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <AnimatedCard className="relative rounded-2xl border border-border bg-surface p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted">
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
                    <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </IdleFloat>
        </div>
      </section>

      {/* Automations */}
      <section id="automations" className="mx-auto w-full max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {t.automations.title}
        </h2>
        <ScrollReveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.automations.items.map((item) => (
            <AnimatedCard
              key={item.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-base font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </AnimatedCard>
          ))}
        </ScrollReveal>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-border bg-surface py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {t.pricing.title}
            </h2>
            <p className="mt-3 text-muted">{t.pricing.subtitle}</p>
          </div>
          <ScrollReveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-accent bg-background shadow-lg ring-1 ring-accent"
                    : "border-border bg-background"
                }`}
              >
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
                <a
                  href="#contact"
                  className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    tier.highlighted
                      ? "bg-accent text-accent-contrast hover:opacity-90"
                      : "border border-border hover:border-accent"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </ScrollReveal>
          <p className="mt-8 text-center text-sm text-muted">
            {t.pricing.addonNote}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t.contact.title}</h2>
        <p className="mt-3 text-muted">{t.contact.subtitle}</p>
        <a
          href="mailto:hello@noxlytics.com"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
        >
          {t.contact.cta}
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted">
          <span>{brand}</span>
          <span>
            © 2026 {brand}. {t.footer.rights}
          </span>
        </div>
      </footer>
    </div>
  );
}
