import { content, type Locale } from "@/lib/content";

export default function ContactSection({
  locale,
  teaser = false,
}: {
  locale: Locale;
  teaser?: boolean;
}) {
  const t = content[locale];

  if (teaser) {
    return (
      <section className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t.cta.contactBanner}
        </h2>
        <a
          href="mailto:hello@noxlytics.com"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
        >
          {t.cta.contactBannerCta}
        </a>
      </section>
    );
  }

  return (
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
  );
}
