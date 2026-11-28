// Privacy policy text (bg + en). Plain data so the page stays a dumb renderer.
// Keep it TRUE to how the site actually works - update it whenever the form
// pipeline or a provider changes (see CLAUDE.md "Contact form").

export const company = {
  name: "РУВЕСА ЕООД",
  nameEn: "RUVESA EOOD",
  eik: "202036157",
  vat: "BG202036157",
  address: "гр. Панагюрище 4500, ул. „Оборище“ 66",
  addressEn: "66 Oborishte St., 4500 Panagyurishte, Bulgaria",
  email: "hello@noxlytics.com",
};

export type Section = {
  h: string;
  p?: string[];
  ul?: string[];
  table?: { head: string[]; rows: string[][] };
  after?: string[];
};
export type LegalDoc = { title: string; updated: string; sections: Section[] };

export const privacy: Record<"bg" | "en", LegalDoc> = {
  bg: {
    title: "Политика за поверителност",
    updated: "В сила от 28.11.2026",
    sections: [
      {
        h: "1. Кой обработва данните ви",
        p: [
          `${company.name}, ЕИК ${company.eik}, седалище и адрес на управление: ${company.address}, с търговско наименование Noxlytics („ние“). Имейл за всички въпроси относно личните данни: ${company.email}.`,
        ],
      },
      {
        h: "2. Какви данни обработваме",
        ul: [
          "От формата за запитване: име, имейл, съобщение, езика и страницата, от която е изпратено, дата и час.",
          "Ако ни пишете по имейл: адреса и съдържанието на писмата.",
          "Технически данни (IP адрес, данни за браузъра), които хостингът на сайта и проверката срещу спам обработват, за да работи и да е защитен сайтът.",
          "Само ако се съгласите в банера за бисквитки: данни за посещението (кои страници разглеждате, откъде идвате, устройство) чрез Google Analytics, и данни за рекламни кампании чрез Google Ads и Meta (Facebook, Instagram).",
        ],
        after: [
          "Без съгласие не зареждаме аналитични и рекламни инструменти и не записваме техни бисквитки. Сайтът пази в браузъра ви само необходимото: настройки за изглед (тема, анимиран курсор) и избора ви за бисквитките. Подробности: Политика за бисквитки (/cookies). Можете да промените избора си по всяко време от „Настройки на бисквитките“ в долната част на всяка страница.",
        ],
      },
      {
        h: "3. За какво и на какво основание",
        ul: [
          "За да отговорим на запитването ви и да подготвим предложение - по ваше искане, преди евентуален договор (чл. 6, ал. 1, б. „б“ от GDPR).",
          "За да защитим сайта и формата от спам и злоупотреби - законен интерес (чл. 6, ал. 1, б. „е“ от GDPR).",
          "За статистика на посещенията и за измерване на рекламите ни - само с ваше съгласие (чл. 6, ал. 1, б. „а“ от GDPR), което можете да оттеглите по всяко време.",
          "Ако станете клиент - за изпълнение на договора и на законовите ни задължения, например счетоводни (чл. 6, ал. 1, б. „б“ и „в“ от GDPR).",
        ],
      },
      {
        h: "4. Кой друг получава данните",
        p: [
          "Използваме доставчици, които обработват данни от наше име и по наши указания:",
        ],
        ul: [
          "Hostinger - хостинг на сайта;",
          "Cloudflare - DNS, проверка срещу спам (Turnstile), пренасочване на имейли към нашата поща и защитена връзка до нашия сървър;",
          "Google - таблицата, в която записваме запитванията, и пощенската ни кутия;",
          "Brevo - изпращане на имейли от hello@noxlytics.com, включително автоматичното потвърждение за получено запитване;",
          "само с ваше съгласие: Google (Tag Manager, Analytics, Ads) и Meta Platforms Ireland (Meta Pixel) - статистика и измерване на реклами.",
        ],
      },
      {
        h: "",
        p: [
          "Запитването минава и през автоматизация на сървър, управляван от нас в България. Някои доставчици може да обработват данни извън Европейското икономическо пространство. В такъв случай прехвърлянето става на основание по глава V от GDPR, например решение на Европейската комисия за адекватност (EU-U.S. Data Privacy Framework) или стандартни договорни клаузи. Не продаваме данни и не ги предоставяме на трети лица за маркетинг.",
        ],
      },
      {
        h: "5. Колко дълго пазим данните",
        ul: [
          "Запитванията и кореспонденцията - до 24 месеца след последния ни контакт, освен ако не станете клиент.",
          "Ако станете клиент - за срока на договора и за сроковете, които изисква законът (например счетоводните).",
          "Техническата история на автоматизациите на нашия сървър се изтрива автоматично след 14 дни.",
        ],
      },
      {
        h: "6. Вашите права",
        p: [
          `Имате право на достъп до данните си, на коригиране, изтриване, ограничаване на обработването, възражение и преносимост. Пишете ни на ${company.email}. Отговаряме до един месец.`,
          "Имате право и на жалба до Комисията за защита на личните данни (www.cpdp.bg).",
        ],
      },
      {
        h: "7. Други",
        p: [
          "Предоставянето на данни е доброволно, но без имейл не можем да ви отговорим. Не вземаме решения само въз основа на автоматизирана обработка и не правим профилиране.",
          "Можем да променяме тази политика. Актуалната версия е винаги на тази страница, с датата, от която е в сила.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    updated: "Effective 28 November 2026",
    sections: [
      {
        h: "1. Who processes your data",
        p: [
          `${company.nameEn} (${company.name}), company ID (EIK) ${company.eik}, registered office: ${company.addressEn}, trading as Noxlytics ("we"). Email for any personal data question: ${company.email}.`,
        ],
      },
      {
        h: "2. What data we process",
        ul: [
          "From the inquiry form: name, email, message, the language and page it was sent from, date and time.",
          "If you email us: your address and the content of the emails.",
          "Technical data (IP address, browser details) processed by the site's hosting and the spam check so the site works and stays protected.",
          "Only if you agree in the cookie banner: visit data (pages viewed, where you came from, device) via Google Analytics, and ad campaign data via Google Ads and Meta (Facebook, Instagram).",
        ],
        after: [
          "Without consent we don't load analytics or advertising tools and none of their cookies are set. The site only stores what is necessary in your browser: display settings (theme, animated cursor) and your cookie choice. Details: Cookie policy (/en/cookies). You can change your choice at any time via \"Cookie settings\" at the bottom of every page.",
        ],
      },
      {
        h: "3. Why and on what legal basis",
        ul: [
          "To reply to your inquiry and prepare a proposal - at your request, before a possible contract (Art. 6(1)(b) GDPR).",
          "To protect the site and the form from spam and abuse - legitimate interest (Art. 6(1)(f) GDPR).",
          "For visit statistics and to measure our ads - only with your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time.",
          "If you become a client - to perform the contract and meet our legal obligations, e.g. accounting (Art. 6(1)(b) and (c) GDPR).",
        ],
      },
      {
        h: "4. Who else receives the data",
        p: ["We use providers that process data on our behalf and on our instructions:"],
        ul: [
          "Hostinger - website hosting;",
          "Cloudflare - DNS, spam check (Turnstile), forwarding email to our mailbox and a secure connection to our server;",
          "Google - the spreadsheet where we log inquiries, and our mailbox;",
          "Brevo - sending email from hello@noxlytics.com, including the automatic confirmation that we received your inquiry;",
          "only with your consent: Google (Tag Manager, Analytics, Ads) and Meta Platforms Ireland (Meta Pixel) - statistics and ad measurement.",
        ],
      },
      {
        h: "",
        p: [
          "Your inquiry also passes through an automation on a server we run in Bulgaria. Some providers may process data outside the European Economic Area; in that case the transfer relies on a basis under Chapter V GDPR, such as a European Commission adequacy decision (EU-U.S. Data Privacy Framework) or standard contractual clauses. We don't sell data or share it with third parties for marketing.",
        ],
      },
      {
        h: "5. How long we keep data",
        ul: [
          "Inquiries and correspondence - up to 24 months after our last contact, unless you become a client.",
          "If you become a client - for the term of the contract and the periods required by law (e.g. accounting).",
          "The technical run history of the automations on our server is deleted automatically after 14 days.",
        ],
      },
      {
        h: "6. Your rights",
        p: [
          `You have the right to access, rectify and erase your data, to restrict processing, to object and to data portability. Write to ${company.email}; we reply within one month.`,
          "You may also lodge a complaint with the Bulgarian Commission for Personal Data Protection (www.cpdp.bg).",
        ],
      },
      {
        h: "7. Other",
        p: [
          "Providing data is voluntary, but without an email address we can't reply. We make no decisions based solely on automated processing and do no profiling.",
          "We may update this policy. The current version is always on this page, with the date it takes effect.",
        ],
      },
    ],
  },
};
