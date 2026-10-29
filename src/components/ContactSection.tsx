import { content, type Locale } from "@/lib/content";
import ContactForm from "./ContactForm";

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
        <p className="mx-auto mt-3 max-w-md text-muted">{t.contact.subtitle}</p>
        <div className="mt-8">
          <ContactForm locale={locale} />
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
      <h2 className="text-3xl font-bold tracking-tight">{t.contact.title}</h2>
      <p className="mt-3 text-muted">{t.contact.subtitle}</p>
      <div className="mt-8">
        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
