import ScrollReveal from "./ScrollReveal";
import { content, type Locale } from "@/lib/content";

// "If right now you... / With Noxlytics..." - two columns, pain vs outcome.
// Only outcomes we actually deliver today (see CLAUDE.md honesty rules).
export default function ProblemsSection({ locale }: { locale: Locale }) {
  const t = content[locale].problems;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="text-center">
        <p className="label-mono text-accent">{t.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
      </div>

      <ScrollReveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.12}>
        <div className="edge-light rounded-2xl border border-red-500/25 bg-surface p-7">
          <h3 className="font-semibold">{t.beforeTitle}</h3>
          <ul className="mt-5 space-y-3.5">
            {t.before.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-500"
                >
                  ×
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="edge-light rounded-2xl border border-accent/40 bg-surface p-7">
          <h3 className="font-semibold">{t.afterTitle}</h3>
          <ul className="mt-5 space-y-3.5">
            {t.after.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
