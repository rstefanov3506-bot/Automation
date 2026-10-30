import Link from "next/link";
import AnimatedCard from "./AnimatedCard";
import ScrollReveal from "./ScrollReveal";
import { content, type Locale } from "@/lib/content";

// Teaser (homepage): all six areas, each with its three strongest examples and
// a link to the full catalogue - 30+ items on the homepage would not be read.
// Full (/automations): every automation per area.
export default function AutomationsSection({
  locale,
  teaser = false,
}: {
  locale: Locale;
  teaser?: boolean;
}) {
  const t = content[locale].automations;
  const allHref = locale === "bg" ? "/automations" : "/en/automations";
  const Heading = teaser ? "h2" : "h1";

  return (
    <section
      id="automations"
      className={`mx-auto w-full max-w-6xl px-6 ${teaser ? "py-20" : "pb-20 pt-16"}`}
    >
      <div className="text-center">
        <Heading
          className={`font-semibold tracking-tight ${teaser ? "text-3xl" : "text-4xl sm:text-5xl"}`}
        >
          {t.title}
        </Heading>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.subtitle}</p>
      </div>

      <ScrollReveal
        className={`mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 ${teaser ? "lg:grid-cols-3" : ""}`}
      >
        {t.items.map((item, i) => {
          const list = teaser ? item.list.slice(0, 3) : item.list;
          return (
            <AnimatedCard
              key={item.name}
              className="edge-light flex flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <div className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-muted">{item.desc}</p>
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                {list.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {teaser && item.list.length > 3 && (
                <div className="mt-auto pt-4 font-mono text-xs text-muted">
                  +{item.list.length - 3}
                </div>
              )}
            </AnimatedCard>
          );
        })}
      </ScrollReveal>

      {teaser && (
        <div className="mt-10 text-center">
          <Link
            href={allHref}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-accent"
          >
            {t.seeAll}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
