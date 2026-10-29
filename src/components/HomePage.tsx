import Link from "next/link";
import AnimatedCard from "./AnimatedCard";
import { content, brand, type Locale } from "@/lib/content";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const altLocale = locale === "bg" ? "en" : "bg";
  const altHref = locale === "bg" ? "/en" : "/";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">
            {brand}
          </span>
          <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
            {t.nav.links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-neutral-950">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href={altHref}
              className="text-sm font-medium text-neutral-500 hover:text-neutral-950"
            >
              {altLocale.toUpperCase()}
            </Link>
            <a
              href="#contact"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-20 text-center">
        <p className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
          {t.hero.eyebrow}
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-neutral-950 sm:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#pricing"
            className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </section>

      {/* Automations */}
      <section id="automations" className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-950">
          {t.automations.title}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.automations.items.map((item) => (
            <AnimatedCard
              key={item.name}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-neutral-950">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-neutral-50 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
              {t.pricing.title}
            </h2>
            <p className="mt-3 text-neutral-600">{t.pricing.subtitle}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-emerald-500 bg-white shadow-lg ring-1 ring-emerald-500"
                    : "border-black/5 bg-white shadow-sm"
                }`}
              >
                <h3 className="text-lg font-semibold text-neutral-950">
                  {tier.name}
                </h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-neutral-950">
                    {tier.build}
                  </span>
                  <span className="text-sm text-neutral-500"> build</span>
                </div>
                <div className="mt-1 text-sm text-neutral-500">
                  + {tier.monthly}
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-neutral-700">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    tier.highlighted
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "border border-neutral-300 text-neutral-800 hover:border-neutral-400"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-neutral-500">
            {t.pricing.addonNote}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
          {t.contact.title}
        </h2>
        <p className="mt-3 text-neutral-600">{t.contact.subtitle}</p>
        <a
          href="mailto:hello@noxlytics.com"
          className="mt-8 inline-block rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          {t.contact.cta}
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-neutral-500">
          <span>{brand}</span>
          <span>
            © 2026 {brand}. {t.footer.rights}
          </span>
        </div>
      </footer>
    </div>
  );
}
