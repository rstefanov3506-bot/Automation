export type Locale = "bg" | "en";

export const content = {
  bg: {
    nav: {
      links: [
        { label: "Автоматизации", href: "#automations" },
        { label: "Пакети", href: "#pricing" },
        { label: "Контакти", href: "#contact" },
      ],
      cta: "Запитване",
    },
    hero: {
      eyebrow: "AI автоматизации за бизнеса",
      title: "Агенти, които работят вместо теб",
      subtitle:
        "Изграждаме и поддържаме AI автоматизации — лийдове, чатботове, SEO, счетоводни интеграции — с контролен панел, от който виждаш какво се случва.",
      ctaPrimary: "Виж пакетите",
      ctaSecondary: "Запитване",
    },
    automations: {
      title: "Какво автоматизираме",
      items: [
        {
          name: "Лийдове / CRM",
          desc: "Захващане на запитвания, автоматично разпределение, follow-up имейли и SMS.",
        },
        {
          name: "AI асистенти / чатботове",
          desc: "Чатбот на сайта, WhatsApp/Viber бот, вътрешен Q&A асистент.",
        },
        {
          name: "SEO / съдържание",
          desc: "Автоматична генерация на статии, вътрешно линкуване, отчети за позиции.",
        },
        {
          name: "Счетоводство / логистика",
          desc: "Econt/Speedy товарителници, Microinvest синхронизация.",
        },
        {
          name: "Социални мрежи",
          desc: "Планиране и публикуване на съдържание в социалните канали.",
        },
        {
          name: "Отчети / нотификации",
          desc: "Периодични обобщения за бизнеса — имейл, Slack или Viber.",
        },
      ],
    },
    pricing: {
      title: "Пакети",
      subtitle: "Build такса еднократно + месечна поддръжка.",
      tiers: [
        {
          name: "Starter",
          build: "199 €",
          monthly: "49 €/мес",
          features: ["1 автоматизация", "Без табло", "Имейл отчети"],
          cta: "Избери Starter",
          highlighted: false,
        },
        {
          name: "Growth",
          build: "499 €",
          monthly: "99 €/мес",
          features: [
            "2–3 автоматизации",
            "+ 1 бонус автоматизация",
            "Пълен достъп до табло",
          ],
          cta: "Избери Growth",
          highlighted: true,
        },
        {
          name: "Business",
          build: "999 €",
          monthly: "179 €/мес",
          features: [
            "4+ автоматизации",
            "Приоритетна поддръжка",
            "Custom интеграции (add-on)",
          ],
          cta: "Избери Business",
          highlighted: false,
        },
      ],
      addonNote: "Custom интеграции (напр. Microinvest) — add-on от 399 €.",
    },
    contact: {
      title: "Готов за автоматизация?",
      subtitle: "Пиши ни и ще се свържем до 1 работен ден.",
      cta: "Изпрати запитване",
    },
    footer: {
      rights: "Всички права запазени.",
    },
  },
  en: {
    nav: {
      links: [
        { label: "Automations", href: "#automations" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
      ],
      cta: "Get in touch",
    },
    hero: {
      eyebrow: "AI automations for business",
      title: "Agents that work for you",
      subtitle:
        "We build and run AI automations — leads, chatbots, SEO, accounting integrations — with a dashboard that shows you what's happening.",
      ctaPrimary: "See pricing",
      ctaSecondary: "Get in touch",
    },
    automations: {
      title: "What we automate",
      items: [
        {
          name: "Leads / CRM",
          desc: "Inquiry capture, automatic routing, follow-up emails and SMS.",
        },
        {
          name: "AI assistants / chatbots",
          desc: "Website chatbot, WhatsApp/Viber bot, internal Q&A assistant.",
        },
        {
          name: "SEO / content",
          desc: "Automated article generation, internal linking, ranking reports.",
        },
        {
          name: "Accounting / logistics",
          desc: "Econt/Speedy waybills, Microinvest sync.",
        },
        {
          name: "Social media",
          desc: "Scheduling and publishing content across social channels.",
        },
        {
          name: "Reports / notifications",
          desc: "Periodic business summaries — email, Slack or Viber.",
        },
      ],
    },
    pricing: {
      title: "Pricing",
      subtitle: "One-time build fee + monthly support.",
      tiers: [
        {
          name: "Starter",
          build: "€199",
          monthly: "€49/mo",
          features: ["1 automation", "No dashboard", "Email reports"],
          cta: "Choose Starter",
          highlighted: false,
        },
        {
          name: "Growth",
          build: "€499",
          monthly: "€99/mo",
          features: [
            "2–3 automations",
            "+ 1 bonus automation",
            "Full dashboard access",
          ],
          cta: "Choose Growth",
          highlighted: true,
        },
        {
          name: "Business",
          build: "€999",
          monthly: "€179/mo",
          features: [
            "4+ automations",
            "Priority support",
            "Custom integrations (add-on)",
          ],
          cta: "Choose Business",
          highlighted: false,
        },
      ],
      addonNote: "Custom integrations (e.g. Microinvest) — add-on from €399.",
    },
    contact: {
      title: "Ready to automate?",
      subtitle: "Reach out and we'll get back within 1 business day.",
      cta: "Send inquiry",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;

export const brand = "Noxlytics";
