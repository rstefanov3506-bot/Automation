import Image from "next/image";
import Link from "next/link";
import { about } from "@/lib/pages";
import type { Locale } from "@/lib/content";

export default function AboutView({ locale }: { locale: Locale }) {
  const t = about[locale];
  const auditHref = locale === "bg" ? "/#audit" : "/en#audit";
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <p className="label-mono text-accent">{t.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">{t.intro}</p>

      <section className="edge-light mt-12 rounded-2xl border border-border bg-surface p-7">
        <div className="flex items-center gap-5">
          <Image
            src="/team/rumen-stefanov.jpg"
            alt={t.founderName}
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full border border-border object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{t.founderName}</h2>
            <p className="label-mono mt-1 text-muted">{t.founderRole}</p>
          </div>
        </div>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
          {t.founderBio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">{t.principlesTitle}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.principles.map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 text-center">
        <h2 className="text-xl font-semibold">{t.ctaTitle}</h2>
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
