import Link from "next/link";
import { faq } from "@/lib/pages";
import type { Locale } from "@/lib/content";

export default function FaqView({ locale }: { locale: Locale }) {
  const t = faq[locale];
  const auditHref = locale === "bg" ? "/#audit" : "/en#audit";
  // FAQPage structured data: same Q&A as rendered, for Google and AI search.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-3 text-muted">{t.intro}</p>
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface">
        {t.items.map((i) => (
          <details key={i.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              <h2 className="text-base">{i.q}</h2>
              <span aria-hidden="true" className="mt-0.5 text-accent transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{i.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold">{t.ctaTitle}</h2>
        <p className="mt-2 text-muted">{t.ctaText}</p>
        <Link
          href={auditHref}
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
        >
          {t.cta}
        </Link>
      </div>
    </main>
  );
}
