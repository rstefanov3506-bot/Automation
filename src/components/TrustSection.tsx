import ScrollReveal from "./ScrollReveal";
import { content, type Locale } from "@/lib/content";

export default function TrustSection({ locale }: { locale: Locale }) {
  const t = content[locale].trust;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.subtitle}</p>
      </div>

      <ScrollReveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {t.steps.map((step) => (
          <div key={step.title} className="edge-light rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold text-accent">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.desc}</p>
          </div>
        ))}
      </ScrollReveal>

      <div className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3">
        {t.badges.map((badge) => (
          <div key={badge.title} className="text-center sm:text-left">
            <div className="text-sm font-semibold">{badge.title}</div>
            <p className="mt-1 text-xs text-muted">{badge.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
