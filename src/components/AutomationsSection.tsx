import AnimatedCard from "./AnimatedCard";
import ScrollReveal from "./ScrollReveal";
import { content, type Locale } from "@/lib/content";

export default function AutomationsSection({
  locale,
  teaser = false,
}: {
  locale: Locale;
  teaser?: boolean;
}) {
  const t = content[locale];
  const items = teaser ? t.automations.items.slice(0, 3) : t.automations.items;

  return (
    <section
      id="automations"
      className={`mx-auto w-full max-w-6xl px-6 ${teaser ? "py-20" : "py-24"}`}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t.automations.title}</h2>
        {!teaser && (
          <p className="mx-auto mt-3 max-w-xl text-muted">{t.automations.subtitle}</p>
        )}
      </div>
      <ScrollReveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
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
  );
}
