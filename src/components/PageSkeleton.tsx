import { type Locale } from "@/lib/content";

const copy: Record<Locale, { placeholder: string }> = {
  bg: { placeholder: "Съдържанието за тази страница предстои." },
  en: { placeholder: "Content for this page is coming soon." },
};

// Lightweight placeholder for a page that exists in the nav/routing but
// hasn't been filled in yet — keeps the route and layout real while the
// content gets written.
export default function PageSkeleton({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const t = copy[locale];
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 text-muted">{t.placeholder}</p>
    </section>
  );
}
