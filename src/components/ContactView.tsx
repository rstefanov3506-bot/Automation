import type { Locale } from "@/lib/content";
import { company } from "@/lib/privacy";
import ContactForm from "./ContactForm";

const copy = {
  bg: {
    title: "Контакти",
    intro: "Опиши накратко бизнеса си и какво ти отнема най-много време. Отговаряме до 1 работен ден, за да уговорим безплатния 30-минутен одит.",
    email: "Имейл",
    company: "Фирма",
    eik: "ЕИК",
    address: "Адрес на управление",
    reply: "Отговор",
    replyValue: "до 1 работен ден",
  },
  en: {
    title: "Contact",
    intro: "Tell us briefly about your business and what takes up most of your time. We reply within 1 business day to book the free 30-minute audit.",
    email: "Email",
    company: "Company",
    eik: "Company ID",
    address: "Registered office",
    reply: "Reply",
    replyValue: "within 1 business day",
  },
} as const;

export default function ContactView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
        <p className="mt-4 text-muted">{t.intro}</p>
        <dl className="mt-10 space-y-5 text-sm">
          <div>
            <dt className="label-mono text-muted">{t.email}</dt>
            <dd className="mt-1 text-base">
              <a href={`mailto:${company.email}`} className="text-accent hover:underline">{company.email}</a>
            </dd>
          </div>
          <div>
            <dt className="label-mono text-muted">{t.company}</dt>
            <dd className="mt-1">
              {locale === "bg" ? company.name : `${company.nameEn} (${company.name})`}, {t.eik} {company.eik}
            </dd>
          </div>
          <div>
            <dt className="label-mono text-muted">{t.address}</dt>
            <dd className="mt-1">{locale === "bg" ? company.address : company.addressEn}</dd>
          </div>
          <div>
            <dt className="label-mono text-muted">{t.reply}</dt>
            <dd className="mt-1">{t.replyValue}</dd>
          </div>
        </dl>
      </div>
      <div id="audit" className="scroll-mt-24">
        <ContactForm locale={locale} />
      </div>
    </main>
  );
}
