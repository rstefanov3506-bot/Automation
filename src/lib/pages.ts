// FAQ and About copy (bg + en). Only things that are true today - see the
// honesty rules in CLAUDE.md (no invented clients, numbers or promises).

export type Faq = { q: string; a: string };

export const faq: Record<"bg" | "en", { title: string; intro: string; items: Faq[]; ctaTitle: string; ctaText: string; cta: string }> = {
  bg: {
    title: "Често задавани въпроси",
    intro: "Кратки отговори на въпросите, които чуваме най-често. Ако твоят го няма, пиши ни.",
    items: [
      {
        q: "Какво получавам от безплатния 30-минутен одит?",
        a: "Разговор, в който разглеждаме как работи бизнесът ти и кои повтарящи се задачи си струва да се автоматизират. След него получаваш писмено предложение с обхват, срок и цена. Одитът е безплатен и без ангажимент.",
      },
      {
        q: "Трябва ли да разбирам от технологии?",
        a: "Не. Ние изграждаме, свързваме и поддържаме автоматизациите. Ти виждаш резултата, одобряваш черновите, когато има такива, и ни пишеш, ако нещо трябва да се промени.",
      },
      {
        q: "С какви инструменти работите?",
        a: "Свързваме това, което вече ползваш: WordPress, Gmail, Google Sheets, Google Drive, формите на сайта ти, Telegram и имейл известия. Viber известия са възможни, ако си готов да платиш бота на Viber. За текстовете използваме AI модели, а процесите изграждаме с n8n.",
      },
      {
        q: "Колко време отнема изграждането?",
        a: "Зависи от автоматизацията и от това колко бързо получим нужните достъпи. Срокът е записан в предложението след одита, преди да започнем работа.",
      },
      {
        q: "Какво включва месечната такса?",
        a: "Наблюдение дали всичко работи, корекции при промени (например нова форма или смяна на пароли), поддръжка и месечен отчет какво е свършено. Плащаш за работеща система, а не за „достъп“ до платформа.",
      },
      {
        q: "Мога ли да започна с малък пакет и после да надградя?",
        a: "Да. По всяко време можеш да минеш на по-голям пакет или да добавиш автоматизация към текущия.",
      },
      {
        q: "Ще пише ли AI от мое име без да видя?",
        a: "Не, освен ако не го поискаш изрично. Статиите и публикациите се създават като чернови и ти ги одобряваш преди публикуване. Автоматичните отговори на запитвания са кратки потвърждения, че сме получили съобщението.",
      },
      {
        q: "Кой притежава данните?",
        a: "Ти. Данните остават в твоите системи - таблицата ти, сайтът ти, пощата ти. Техническата история на автоматизациите при нас се изтрива автоматично след 14 дни. С всеки клиент подписваме договор за обработване на лични данни (DPA).",
      },
      {
        q: "Ще имам ли достъп до самите автоматизации (n8n)?",
        a: "Не - ние ги изграждаме и поддържаме, и отговаряме те да работят. Ти получаваш резултата и месечния отчет. Ако искаш собствена инсталация на твой сървър, това е отделна услуга.",
      },
      {
        q: "Как започваме?",
        a: "Заявяваш безплатен одит от формата. Отговаряме до 1 работен ден, уговаряме разговор, изпращаме предложение, подписваме договор и DPA - и започваме.",
      },
    ],
    ctaTitle: "Не намери отговор?",
    ctaText: "Пиши ни или запази безплатен 30-минутен одит.",
    cta: "Безплатен одит",
  },
  en: {
    title: "Frequently asked questions",
    intro: "Short answers to the questions we hear most. If yours isn't here, write to us.",
    items: [
      {
        q: "What do I get from the free 30-minute audit?",
        a: "A call in which we look at how your business runs and which repetitive tasks are worth automating. Afterwards you get a written proposal with scope, deadline and price. The audit is free and without commitment.",
      },
      {
        q: "Do I need to be technical?",
        a: "No. We build, connect and maintain the automations. You see the results, approve drafts where there are any, and tell us when something should change.",
      },
      {
        q: "Which tools do you work with?",
        a: "We connect what you already use: WordPress, Gmail, Google Sheets, Google Drive, your website forms, Telegram and email alerts. Viber alerts are possible if you're willing to pay for a Viber bot. We use AI models for text and build the processes with n8n.",
      },
      {
        q: "How long does a build take?",
        a: "It depends on the automation and on how quickly we get the access we need. The deadline is written in the proposal after the audit, before we start.",
      },
      {
        q: "What does the monthly fee cover?",
        a: "Monitoring that everything runs, fixes when something changes (a new form, changed passwords), support and a monthly report of what was done. You pay for a working system, not for \"access\" to a platform.",
      },
      {
        q: "Can I start small and upgrade later?",
        a: "Yes. You can move to a bigger package or add an automation to your current one at any time.",
      },
      {
        q: "Will AI write on my behalf without me seeing it?",
        a: "No, unless you explicitly ask for it. Articles and posts are created as drafts and you approve them before publishing. Automatic replies to inquiries are short confirmations that we received the message.",
      },
      {
        q: "Who owns the data?",
        a: "You do. Data stays in your systems - your spreadsheet, your website, your mailbox. The technical run history of the automations is deleted automatically after 14 days. We sign a data processing agreement (DPA) with every client.",
      },
      {
        q: "Will I have access to the automations themselves (n8n)?",
        a: "No - we build and maintain them and are responsible for keeping them running. You get the results and the monthly report. If you want your own installation on your own server, that is a separate service.",
      },
      {
        q: "How do we start?",
        a: "Request a free audit through the form. We reply within 1 business day, book a call, send a proposal, sign the contract and DPA - and start.",
      },
    ],
    ctaTitle: "Didn't find your answer?",
    ctaText: "Write to us or book a free 30-minute audit.",
    cta: "Free audit",
  },
};

export const about = {
  bg: {
    eyebrow: "За нас",
    title: "Автоматизации от хора, които сами ги ползват всеки ден",
    intro:
      "Noxlytics изгражда и поддържа AI автоматизации за малки и средни бизнеси в България. Започнахме със сайтовете, които сами поддържаме: първо автоматизирахме своята рутина, после решихме да предлагаме същото на други.",
    founderName: "Румен Стефанов",
    founderRole: "Основател",
    founderBio: [
      "Работя в дигиталния маркетинг и уеб разработката и водя дигиталната агенция Webtopix: WordPress и WooCommerce сайтове, SEO, Google Ads и Meta Ads.",
      "Преди това работих във фактуриране, банково дело и застрахователно консултиране - там видях отблизо колко време се губи в ръчно преписване на едни и същи данни.",
      "Днес автоматизации на Noxlytics пишат и подготвят SEO статии два пъти седмично за petsbg.net, logopedite.com и svatbendj.bg, а всяко запитване от този сайт получава автоматичен отговор и влиза в таблица до минута.",
    ],
    principlesTitle: "Как работим",
    principles: [
      { t: "Честно", d: "Нямаме още дълъг списък с клиенти, затова не показваме измислени отзиви и логота. Показваме само това, което реално работи." },
      { t: "AI отзад, не отпред", d: "AI върши рутината. Текстовете, които излизат от твое име, ги одобряваш ти." },
      { t: "Ясна цена", d: "Пакети с цена на сайта. Без такси за „достъп“ и без изненади." },
      { t: "Данните са твои", d: "Остават в твоите системи. Подписваме DPA с всеки клиент." },
    ],
    ctaTitle: "Да видим какво може да се автоматизира при теб",
    cta: "Безплатен 30-минутен одит",
  },
  en: {
    eyebrow: "About us",
    title: "Automations from people who use them every day",
    intro:
      "Noxlytics builds and maintains AI automations for small and mid-sized businesses in Bulgaria. We started with the websites we run ourselves: first we automated our own routine, then decided to offer the same to others.",
    founderName: "Rumen Stefanov",
    founderRole: "Founder",
    founderBio: [
      "I work in digital marketing and web development and run the digital agency Webtopix: WordPress and WooCommerce sites, SEO, Google Ads and Meta Ads.",
      "Before that I worked in invoicing, banking and insurance consulting - where I saw up close how much time goes into retyping the same data by hand.",
      "Today Noxlytics automations write and prepare SEO articles twice a week for petsbg.net, logopedite.com and svatbendj.bg, and every inquiry from this site gets an automatic reply and lands in a spreadsheet within a minute.",
    ],
    principlesTitle: "How we work",
    principles: [
      { t: "Honest", d: "We don't have a long client list yet, so we show no invented testimonials or logos. Only what actually works." },
      { t: "AI in the back, not the front", d: "AI handles the routine. Text published in your name is approved by you." },
      { t: "Clear pricing", d: "Packages with prices on the site. No \"access\" fees, no surprises." },
      { t: "Your data stays yours", d: "It stays in your systems. We sign a DPA with every client." },
    ],
    ctaTitle: "Let's see what can be automated for you",
    cta: "Free 30-minute audit",
  },
} as const;
