export type Locale = "bg" | "en";

export const content = {
  bg: {
    nav: {
      links: [
        { label: "Автоматизации", href: "/automations" },
        { label: "Пакети", href: "/pricing" },
        { label: "Контакти", href: "/contact" },
      ],
      cta: "Запитване",
    },
    hero: {
      eyebrow: "AI автоматизации за бизнеса",
      title: "Агенти, които работят",
      titleAccent: "вместо теб",
      subtitle:
        "Изграждаме и поддържаме AI автоматизации — лийдове, чатботове, SEO, счетоводни интеграции — с контролен панел, от който виждаш какво се случва.",
      ctaPrimary: "Виж пакетите",
      ctaSecondary: "Запитване",
      stats: [
        { value: "6+", label: "вида автоматизации" },
        { value: "<24ч", label: "отговор на запитване" },
        { value: "24/7", label: "работещи агенти" },
      ],
    },
    flow: {
      ariaLabel: "Анимация: заявка преминава през AI агент и завършва с резултат",
      tags: { trigger: "Задействане", agent: "Агент", result: "Резултат" },
      done: "Готово, без ръчна работа",
      scenarios: [
        { name: "Нов лийд от сайта", steps: ["Запитване от уеб формата", "Записва в CRM с източника", "Viber до теб до минута"] },
        { name: "Нова поръчка", steps: ["Поръчка в онлайн магазина", "Товарителница в Econt", "Имейл с номер за проследяване"] },
        { name: "Понеделник 08:00", steps: ["Данни от магазина и рекламите", "Обобщение на седмицата", "Отчетът е изпратен"] },
      ],
    },
    integrations: {
      eyebrow: "Интеграции",
      title: "Свързваме инструментите, които вече ползваш",
      legend: { ai: "AI модели", auto: "Автоматизация и данни", biz: "Бизнес инструменти" },
    },
    goals: {
      eyebrow: "Започни от целта",
      title: "Какво искаш да постигнеш?",
      subtitle: "Избери целта и виж как изглежда автоматизацията на практика.",
      tabs: [
        {
          label: "Повече клиенти",
          headline: "Нито едно запитване не остава без отговор",
          result: "Виждаш всяко запитване веднага, а клиентът получава отговор дори когато си зает.",
          steps: [
            "Запитване от сайта, Facebook или Instagram",
            "Записва се в CRM заедно с източника",
            "Известие до теб във Viber до минута",
            "Автоматичен follow-up имейл, ако няма отговор",
          ],
        },
        {
          label: "Отговори 24/7",
          headline: "AI асистент, който отговаря вместо теб",
          result: "Честите въпроси спират да стигат до теб, а сложните идват вече с контекст.",
          steps: [
            "Клиент пита на сайта, във WhatsApp или Viber",
            "Асистентът отговаря от твоите цени, срокове и ЧЗВ",
            "Сложните случаи прехвърля към теб",
            "Всички разговори се виждат в таблото",
          ],
        },
        {
          label: "По-малко ръчна работа",
          headline: "Поръчката сама стига до куриера и счетоводството",
          result: "Без преписване между системи и без пропусната товарителница.",
          steps: [
            "Нова поръчка в онлайн магазина",
            "Товарителница в Econt или Speedy",
            "Синхронизация с Microinvest",
            "Имейл до клиента с номер за проследяване",
          ],
        },
        {
          label: "Отчети без Excel",
          headline: "Цифрите идват при теб, не ти при тях",
          result: "Знаеш как върви бизнесът, без да отваряш пет различни системи.",
          steps: [
            "Данни от магазина, рекламите и CRM",
            "Обобщение всеки понеделник сутрин",
            "Изпращане по имейл или Viber",
            "Сигнал, ако нещо падне под нормалното",
          ],
        },
      ],
      ctaPrimary: "Виж пакетите",
      ctaSecondary: "Обсъди своя случай",
    },
    roi: {
      title: "Колко ти струва ръчната работа?",
      subtitle: "Груба сметка за времето в повтарящи се задачи. Числата остават само в браузъра ти.",
      hoursLabel: "Часове седмично в повтарящи се задачи",
      rateLabel: "Стойност на един час работа",
      shareLabel: "Каква част може да се автоматизира",
      hoursUnit: "ч",
      lostLabel: "Отиват на месец",
      savedLabel: "Освободена стойност на месец",
      paybackLabel: "Growth пакетът се изплаща за",
      paybackUnit: "мес.",
      paybackNever: "Не си струва при тези числа",
      note: "Ориентировъчна сметка, не обещание. Реалният ефект зависи от процеса - затова първият разговор е безплатен.",
      cta: "Провери с конкретния си процес",
    },
    automations: {
      title: "Какво автоматизираме",
      subtitle: "Шест категории автоматизации, които покриват най-честите тесни места в бизнеса.",
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
    trust: {
      title: "Как работим",
      subtitle: "Без изненади — ясен процес и ясни условия от първия разговор.",
      steps: [
        {
          title: "1. Безплатен разговор",
          desc: "Казваш какво отнема време в бизнеса ти — отговаряме до 1 работен ден с конкретно предложение.",
        },
        {
          title: "2. Изграждане",
          desc: "Свързваме инструментите, които вече ползваш (Econt, Microinvest, WhatsApp/Viber и др.) с automation-а.",
        },
        {
          title: "3. Поддръжка",
          desc: "Следим, че работи — месечната такса включва поддръжка и корекции, не само достъп.",
        },
      ],
      badges: [
        {
          title: "Ясна цена",
          desc: "Еднократна build такса + фиксирана месечна — без скрити добавки извън изрично описаните.",
        },
        {
          title: "GDPR",
          desc: "Данните, през които минава автоматизацията, се обработват по изискванията на GDPR.",
        },
        {
          title: "Отговор до 1 ден",
          desc: "На всяко запитване отговаряме в рамките на 1 работен ден.",
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
          badge: undefined as string | undefined,
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
          badge: "Най-избран",
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
          badge: undefined as string | undefined,
        },
      ],
      addonNote: "Custom интеграции (напр. Microinvest) — add-on от 399 €.",
    },
    contact: {
      title: "Готов за автоматизация?",
      subtitle: "Пиши ни и ще се свържем до 1 работен ден.",
      cta: "Изпрати запитване",
      form: {
        nameLabel: "Име",
        namePlaceholder: "Твоето име",
        emailLabel: "Имейл",
        emailPlaceholder: "ти@компания.бг",
        messageLabel: "Съобщение",
        messagePlaceholder: "С какво да помогнем?",
        submitLabel: "Изпрати запитване",
        requiredError: "Моля, попълни това поле.",
        emailError: "Моля, въведи валиден имейл.",
        successTitle: "Готово — отвори се имейл клиентът ти",
        successBody:
          "Съобщението е подготвено с данните ти. Ако не се отвори нищо, виж имейла по-долу.",
        fallbackLabel: "Или пиши директно на:",
        copyLabel: "Копирай",
        copiedLabel: "Копирано!",
      },
    },
    cta: {
      contactBanner: "Имаш въпрос или искаш оферта по мярка?",
      contactBannerCta: "Пиши ни",
    },
    footer: {
      rights: "Всички права запазени.",
    },
  },
  en: {
    nav: {
      links: [
        { label: "Automations", href: "/en/automations" },
        { label: "Pricing", href: "/en/pricing" },
        { label: "Contact", href: "/en/contact" },
      ],
      cta: "Get in touch",
    },
    hero: {
      eyebrow: "AI automations for business",
      title: "Agents that work",
      titleAccent: "for you",
      subtitle:
        "We build and run AI automations — leads, chatbots, SEO, accounting integrations — with a dashboard that shows you what's happening.",
      ctaPrimary: "See pricing",
      ctaSecondary: "Get in touch",
      stats: [
        { value: "6+", label: "automation types" },
        { value: "<24h", label: "inquiry response" },
        { value: "24/7", label: "agents running" },
      ],
    },
    flow: {
      ariaLabel: "Animation: a request passes through an AI agent and ends in a result",
      tags: { trigger: "Trigger", agent: "Agent", result: "Result" },
      done: "Done, no manual work",
      scenarios: [
        { name: "New lead from the site", steps: ["Inquiry from the web form", "Logged in the CRM with its source", "Viber alert to you within a minute"] },
        { name: "New order", steps: ["Order in the online store", "Shipping label in Econt", "Email with a tracking number"] },
        { name: "Monday 08:00", steps: ["Data from the store and ads", "Weekly summary", "Report delivered"] },
      ],
    },
    integrations: {
      eyebrow: "Integrations",
      title: "We connect the tools you already use",
      legend: { ai: "AI models", auto: "Automation & data", biz: "Business tools" },
    },
    goals: {
      eyebrow: "Start from the goal",
      title: "What do you want to achieve?",
      subtitle: "Pick a goal and see what the automation looks like in practice.",
      tabs: [
        {
          label: "More clients",
          headline: "No inquiry goes unanswered",
          result: "You see every inquiry instantly, and the client gets a reply even when you're busy.",
          steps: [
            "Inquiry from your site, Facebook or Instagram",
            "Logged in the CRM with its source",
            "Viber alert to you within a minute",
            "Automatic follow-up email if there's no reply",
          ],
        },
        {
          label: "Replies 24/7",
          headline: "An AI assistant that answers for you",
          result: "Routine questions stop reaching you, and the hard ones arrive with context.",
          steps: [
            "A client asks on your site, WhatsApp or Viber",
            "The assistant answers from your prices, timelines and FAQ",
            "Complex cases are handed over to you",
            "Every conversation is visible in the dashboard",
          ],
        },
        {
          label: "Less manual work",
          headline: "Orders reach the courier and accounting on their own",
          result: "No retyping between systems and no missed shipping labels.",
          steps: [
            "New order in your online store",
            "Shipping label in Econt or Speedy",
            "Sync with Microinvest",
            "Email to the client with a tracking number",
          ],
        },
        {
          label: "Reports without Excel",
          headline: "The numbers come to you, not the other way round",
          result: "You know how the business is doing without opening five systems.",
          steps: [
            "Data from your store, ads and CRM",
            "A summary every Monday morning",
            "Delivered by email or Viber",
            "An alert if something drops below normal",
          ],
        },
      ],
      ctaPrimary: "See packages",
      ctaSecondary: "Discuss your case",
    },
    roi: {
      title: "What does manual work cost you?",
      subtitle: "A rough estimate of time spent on repetitive tasks. The numbers stay in your browser.",
      hoursLabel: "Hours per week on repetitive tasks",
      rateLabel: "Value of one hour of work",
      shareLabel: "Share that can be automated",
      hoursUnit: "h",
      lostLabel: "Spent per month",
      savedLabel: "Value freed up per month",
      paybackLabel: "The Growth package pays off in",
      paybackUnit: "mo.",
      paybackNever: "Not worth it at these numbers",
      note: "A rough estimate, not a promise. The real effect depends on the process - that's why the first call is free.",
      cta: "Check it against your process",
    },
    automations: {
      title: "What we automate",
      subtitle: "Six categories of automation covering the most common bottlenecks in a growing business.",
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
    trust: {
      title: "How we work",
      subtitle: "No surprises — a clear process and clear terms from the first conversation.",
      steps: [
        {
          title: "1. Free conversation",
          desc: "Tell us what's eating time in your business — we reply within 1 business day with a concrete proposal.",
        },
        {
          title: "2. Build",
          desc: "We connect the tools you already use (Econt, Microinvest, WhatsApp/Viber, etc.) to the automation.",
        },
        {
          title: "3. Support",
          desc: "We keep it running — the monthly fee includes support and fixes, not just access.",
        },
      ],
      badges: [
        {
          title: "Clear pricing",
          desc: "One-time build fee + a fixed monthly fee — no hidden extras beyond what's explicitly listed.",
        },
        {
          title: "GDPR",
          desc: "Any data the automation touches is handled per GDPR requirements.",
        },
        {
          title: "Reply within 1 day",
          desc: "Every inquiry gets a reply within 1 business day.",
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
          badge: undefined as string | undefined,
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
          badge: "Most popular",
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
          badge: undefined as string | undefined,
        },
      ],
      addonNote: "Custom integrations (e.g. Microinvest) — add-on from €399.",
    },
    contact: {
      title: "Ready to automate?",
      subtitle: "Reach out and we'll get back within 1 business day.",
      cta: "Send inquiry",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@company.com",
        messageLabel: "Message",
        messagePlaceholder: "What do you need help with?",
        submitLabel: "Send inquiry",
        requiredError: "Please fill in this field.",
        emailError: "Please enter a valid email.",
        successTitle: "Done — your email client should have opened",
        successBody:
          "Your message was prepared with your details. If nothing opened, use the email below.",
        fallbackLabel: "Or email us directly at:",
        copyLabel: "Copy",
        copiedLabel: "Copied!",
      },
    },
    cta: {
      contactBanner: "Have a question or need a custom quote?",
      contactBannerCta: "Get in touch",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;

export const brand = "Noxlytics";
