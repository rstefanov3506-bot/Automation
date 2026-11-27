import { privacy } from "@/lib/privacy";
import type { Locale } from "@/lib/content";

export default function PrivacyPolicy({ locale }: { locale: Locale }) {
  const t = privacy[locale];
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-2 text-sm text-muted">{t.updated}</p>
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed">
        {t.sections.map((s, i) => (
          <section key={i}>
            {s.h && <h2 className="text-lg font-semibold">{s.h}</h2>}
            {s.p?.map((p, j) => (
              <p key={j} className="mt-3 text-muted">{p}</p>
            ))}
            {s.ul && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                {s.ul.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            )}
            {s.after?.map((p, j) => (
              <p key={j} className="mt-3 text-muted">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
