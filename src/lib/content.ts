export type Locale = "bg" | "en";

export const content = {
  bg: {
    nav: {
      links: [
        { label: "Автоматизации", href: "/automations" },
        { label: "Пакети", href: "/pricing" },
        { label: "Контакти", href: "/contact" },
      ],
      cta: "Безплатен одит",
    },
    hero: {
      eyebrow: "AI автоматизации за бизнеса",
      title: "Агенти, които работят",
      titleAccent: "вместо теб",
      subtitle:
        "Изграждаме и поддържаме AI автоматизации — SEO съдържание, социални мрежи, запитвания и чатботове — и всеки месец получаваш отчет какво е свършено.",
      ctaPrimary: "Безплатен 30-минутен одит",
      ctaSecondary: "Виж пакетите",
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
        { name: "Нов лийд от сайта", steps: ["Запитване от уеб формата", "Записва в таблица с източника", "Известие до теб до минута"] },
        { name: "Нова статия", steps: ["Тема от плана за съдържание", "SEO статия със снимки", "Публикувана в блога и в мрежите"] },
        { name: "Понеделник 08:00", steps: ["Данни от магазина и рекламите", "Обобщение на седмицата", "Отчетът е изпратен"] },
      ],
    },
    integrations: {
      eyebrow: "Интеграции",
      title: "Свързваме инструментите, които вече ползваш",
      legend: { ai: "AI модели", auto: "Автоматизация и данни", biz: "Бизнес инструменти", social: "Социални мрежи" },
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
            "Записва се в таблица заедно с източника",
            "Известие до теб в Telegram, Viber или по имейл до минута",
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
            "Обобщение на разговорите в месечния отчет",
          ],
        },
        {
          label: "Съдържание на автопилот",
          headline: "Блогът и мрежите се пълнят сами",
          result: "Редовно съдържание за Google и социалните мрежи, без да пишеш всеки ден.",
          steps: [
            "Тема от месечния план за съдържание",
            "SEO статия със снимки, публикувана в WordPress",
            "Публикации за Facebook, Instagram и LinkedIn",
            "Отчет за позициите в края на месеца",
          ],
        },
        {
          label: "Отчети без Excel",
          headline: "Цифрите идват при теб, не ти при тях",
          result: "Знаеш как върви бизнесът, без да отваряш пет различни системи.",
          steps: [
            "Данни от магазина, рекламите и запитванията",
            "Обобщение всеки понеделник сутрин",
            "Изпращане по имейл, Telegram или Viber",
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
      subtitle: "Шест направления с конкретни автоматизации. Започваме с това, което ти отнема най-много време.",
      seeAll: "Виж всички автоматизации",
      items: [
        {
          name: "Съдържание и SEO",
          desc: "Статии и съдържание, които работят за позициите в Google.",
          list: [
            "SEO статии за блога: тема, ключови думи, текст, снимки, публикуване в WordPress",
            "Обновяване на стари статии, които губят позиции",
            "Автоматично вътрешно линкуване между статиите",
            "Мета заглавия и описания за всички страници",
            "Продуктови описания за WooCommerce",
            "Превод на съдържание на други езици",
            "Месечен отчет за позициите в Google",
          ],
        },
        {
          name: "Социални мрежи",
          desc: "Редовни публикации, без да мислиш всеки ден какво да пуснеш.",
          list: [
            "Публикации за Facebook, Instagram и LinkedIn от всяка нова статия",
            "Месечен календар с планирани публикации",
            "Визии към публикациите",
            "Кратки видеа и reels от статия или продукт",
            "Отговори на коментари и съобщения с твое одобрение",
            "Известие, когато някой спомене бранда ти",
          ],
        },
        {
          name: "Запитвания и лийдове",
          desc: "Нито едно запитване не се губи и не чака.",
          list: [
            "Захващане на запитвания от сайта и Facebook Lead Ads",
            "Записване в таблица заедно с източника",
            "Известие до теб в Telegram, Viber или по имейл до минута",
            "Follow-up имейл, ако клиентът не отговори",
            "Записване на срещи директно в календара",
          ],
        },
        {
          name: "AI асистенти и чатботове",
          desc: "Отговорите на честите въпроси спират да зависят от теб.",
          list: [
            "Чатбот на сайта, който отговаря от твоите цени и ЧЗВ",
            "Бот за Viber, WhatsApp и Messenger",
            "Вътрешен асистент, който отговаря по фирмените документи",
            "Приемане на резервации и часове",
            "Транскрипция и резюме на срещи и аудио",
          ],
        },
        {
          name: "Онлайн магазин",
          desc: "Поръчките и клиентите се движат без ръчна намеса.",
          list: [
            "Известие до теб при нова поръчка",
            "Имейл до клиента при промяна на статуса",
            "Сигнал при изчерпване на наличност",
            "Напомняне за изоставена количка",
            "Молба за отзив след доставка",
          ],
        },
        {
          name: "Отчети и администрация",
          desc: "Цифрите и рутинните задачи идват подредени при теб.",
          list: [
            "Седмичен отчет за продажби и реклами",
            "Сигнал, ако рекламите харчат без резултат",
            "Разчитане на фактури от имейл и въвеждане в таблица",
            "Сортиране на входящата поща по приоритет",
            "Протокол и задачи от онлайн срещи",
            "Напомняне за неплатени фактури",
          ],
        },
      ],
    },
    problems: {
      eyebrow: "Познато ли ти е?",
      title: "Рутината, която ти изяжда седмицата",
      beforeTitle: "Ако в момента",
      afterTitle: "С Noxlytics",
      before: [
        "Отговаряш на запитвания часове или дни по-късно",
        "Запитванията са разпилени в пощата, Messenger и бележки",
        "Пишеш статии за сайта, когато намериш време - тоест рядко",
        "Преписваш едни и същи данни на няколко места",
        "Губиш часове седмично в повтарящи се задачи",
      ],
      after: [
        "Всяко запитване получава автоматичен отговор до минута, а ти - известие веднага",
        "Всички запитвания са на едно място, в таблица, която виждаш и от телефона",
        "SEO статиите излизат по график, а ти само одобряваш черновата",
        "Данните се въвеждат веднъж и се прехвърлят сами",
        "Рутината върви сама, а ти получаваш кратък месечен отчет",
      ],
    },
    statement:
      "Автоматизираме рутината, за да ти остане време за работата, която само ти можеш да свършиш.",
    trust: {
      title: "Как работим",
      subtitle: "Без изненади — ясен процес и ясни условия от първия разговор.",
      steps: [
        {
          title: "1. Безплатен 30-минутен одит",
          desc: "Разглеждаме как работи бизнесът ти и кои повтарящи се задачи си струва да се автоматизират. Получаваш конкретно предложение с цена, без ангажимент.",
        },
        {
          title: "2. Изграждане",
          desc: "Свързваме инструментите, които вече ползваш (WordPress, Gmail, Google Sheets, Telegram и др.), и пускаме първа версия, която тестваш с реални данни.",
        },
        {
          title: "3. Обучение",
          desc: "Показваме на теб и екипа къде виждате резултатите, как одобрявате черновите и как ни пишете за промени.",
        },
        {
          title: "4. Поддръжка и отчет",
          desc: "Следим, че всичко работи, правим корекции и всеки месец ти пращаме кратък отчет. Месечната такса е за поддръжка, не за „достъп“.",
        },
      ],
      badges: [
        {
          title: "Ясна цена",
          desc: "Еднократна build такса + фиксирана месечна — без скрити добавки извън изрично описаните.",
        },
        {
          title: "Отделни достъпи за всеки клиент",
          desc: "Всяка автоматизация работи със собствени ключове и достъпи, които не се споделят с други клиенти.",
        },
        {
          title: "Данните остават при теб",
          desc: "Статиите, запитванията и таблиците стоят във твоите системи. При нас остава само техническа история до 14 дни, за да откриваме грешки.",
        },
        {
          title: "GDPR и договор",
          desc: "Подписваме договор за обработка на данни (DPA) и работим по изискванията на GDPR.",
        },
        {
          title: "Собствена инсталация",
          desc: "Ако държиш на изцяло отделна инсталация, изграждаме я на твой сървър.",
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
          features: ["1 автоматизация", "Поддръжка и корекции", "Месечен отчет"],
          cta: "Избери Starter",
          highlighted: false,
          badge: undefined as string | undefined,
        },
        {
          name: "Growth",
          build: "499 €",
          monthly: "99 €/мес",
          features: [
            "3 автоматизации",
            "+ 1 бонус автоматизация",
            "Месечен отчет",
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
            "5+ автоматизации",
            "Приоритетна поддръжка",
            "Custom интеграции (add-on)",
          ],
          cta: "Избери Business",
          highlighted: false,
          badge: undefined as string | undefined,
        },
      ],
      upgradeNote:
        "Започни с по-малък пакет и надгради, когато видиш резултат: по всяко време можеш да минеш на по-голям пакет или да добавиш автоматизация към текущия.",
      addonNote: "Интеграции със специфични системи — add-on от 399 €, след проверка на достъпа.",
    },
    contact: {
      title: "Готов за автоматизация?",
      subtitle: "Опиши накратко бизнеса си и какво ти отнема най-много време. Ще ти пишем до 1 работен ден, за да уговорим разговор.",
      cta: "Изпрати запитване",
      form: {
        nameLabel: "Име",
        namePlaceholder: "Твоето име",
        emailLabel: "Имейл",
        emailPlaceholder: "ти@компания.бг",
        messageLabel: "Съобщение",
        messagePlaceholder: "Например: получаваме 20 запитвания седмично и отговаряме ръчно",
        submitLabel: "Заяви безплатен одит",
        requiredError: "Моля, попълни това поле.",
        emailError: "Моля, въведи валиден имейл.",
        sendingLabel: "Изпращане...",
        successTitle: "Запитването е изпратено",
        successBody:
          "Благодарим! Изпратихме ти потвърждение по имейл и ще отговорим до 1 работен ден.",
        sendError:
          "Не успяхме да изпратим запитването. Опитай пак или ни пиши директно на имейла по-долу.",
        captchaError: "Моля, изчакай проверката срещу спам и опитай пак.",
        consentNote:
          "С изпращането се съгласяваш да използваме данните ти само за да отговорим на запитването. Подробности:",
        fallbackLabel: "Или пиши директно на:",
        copyLabel: "Копирай",
        copiedLabel: "Копирано!",
      },
    },
    cta: {
      contactBanner: "Запази безплатен 30-минутен одит",
      contactBannerCta: "Пиши ни",
    },
    footer: {
      rights: "Всички права запазени.",
      privacy: "Политика за поверителност",
      eik: "ЕИК",
    },
  },
  en: {
    nav: {
      links: [
        { label: "Automations", href: "/en/automations" },
        { label: "Pricing", href: "/en/pricing" },
        { label: "Contact", href: "/en/contact" },
      ],
      cta: "Free audit",
    },
    hero: {
      eyebrow: "AI automations for business",
      title: "Agents that work",
      titleAccent: "for you",
      subtitle:
        "We build and run AI automations — SEO content, social media, inquiries and chatbots — and every month you get a report of what was done.",
      ctaPrimary: "Free 30-minute audit",
      ctaSecondary: "See pricing",
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
        { name: "New lead from the site", steps: ["Inquiry from the web form", "Logged in a sheet with its source", "An alert to you within a minute"] },
        { name: "New article", steps: ["Topic from the content plan", "SEO article with images", "Published on the blog and socials"] },
        { name: "Monday 08:00", steps: ["Data from the store and ads", "Weekly summary", "Report delivered"] },
      ],
    },
    integrations: {
      eyebrow: "Integrations",
      title: "We connect the tools you already use",
      legend: { ai: "AI models", auto: "Automation & data", biz: "Business tools", social: "Social networks" },
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
            "Logged in a sheet with its source",
            "An alert to you on Telegram, Viber or email within a minute",
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
            "A summary of conversations in the monthly report",
          ],
        },
        {
          label: "Content on autopilot",
          headline: "Your blog and socials fill themselves",
          result: "Regular content for Google and social media without writing every day.",
          steps: [
            "Topic from the monthly content plan",
            "SEO article with images, published to WordPress",
            "Posts for Facebook, Instagram and LinkedIn",
            "Rankings report at the end of the month",
          ],
        },
        {
          label: "Reports without Excel",
          headline: "The numbers come to you, not the other way round",
          result: "You know how the business is doing without opening five systems.",
          steps: [
            "Data from your store, ads and inquiries",
            "A summary every Monday morning",
            "Delivered by email, Telegram or Viber",
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
      subtitle: "Six areas with concrete automations. We start with whatever takes most of your time.",
      seeAll: "See all automations",
      items: [
        {
          name: "Content & SEO",
          desc: "Articles and content that work for your Google rankings.",
          list: [
            "Blog SEO articles: topic, keywords, text, images, published to WordPress",
            "Refreshing old articles that are losing rankings",
            "Automatic internal linking between articles",
            "Meta titles and descriptions for every page",
            "Product descriptions for WooCommerce",
            "Translating content into other languages",
            "Monthly Google rankings report",
          ],
        },
        {
          name: "Social media",
          desc: "Regular posts without deciding every day what to publish.",
          list: [
            "Facebook, Instagram and LinkedIn posts from every new article",
            "Monthly calendar of scheduled posts",
            "Visuals for the posts",
            "Short videos and reels from an article or product",
            "Replies to comments and messages, with your approval",
            "An alert when someone mentions your brand",
          ],
        },
        {
          name: "Inquiries & leads",
          desc: "No inquiry gets lost or left waiting.",
          list: [
            "Capturing inquiries from your site and Facebook Lead Ads",
            "Logging them in a sheet with their source",
            "An alert to you on Telegram, Viber or email within a minute",
            "A follow-up email if the client doesn't reply",
            "Booking meetings straight into your calendar",
          ],
        },
        {
          name: "AI assistants & chatbots",
          desc: "Answers to common questions stop depending on you.",
          list: [
            "A site chatbot that answers from your prices and FAQ",
            "A bot for Viber, WhatsApp and Messenger",
            "An internal assistant that answers from company documents",
            "Taking reservations and appointments",
            "Transcripts and summaries of meetings and audio",
          ],
        },
        {
          name: "Online store",
          desc: "Orders and customers move without manual work.",
          list: [
            "An alert to you on every new order",
            "An email to the customer when the order status changes",
            "An alert when stock runs out",
            "Abandoned-cart reminders",
            "A review request after delivery",
          ],
        },
        {
          name: "Reports & admin",
          desc: "Numbers and routine tasks arrive sorted.",
          list: [
            "Weekly sales and ads report",
            "An alert when ads spend without results",
            "Reading invoices from email into a sheet",
            "Sorting the inbox by priority",
            "Minutes and tasks from online meetings",
            "Reminders for unpaid invoices",
          ],
        },
      ],
    },
    problems: {
      eyebrow: "Sound familiar?",
      title: "The routine that eats your week",
      beforeTitle: "If right now you",
      afterTitle: "With Noxlytics",
      before: [
        "Reply to inquiries hours or days later",
        "Have inquiries scattered across email, Messenger and notes",
        "Write blog posts when you find the time - so rarely",
        "Copy the same data into several places",
        "Lose hours every week to repetitive tasks",
      ],
      after: [
        "Every inquiry gets an automatic reply within a minute, and you get an alert right away",
        "All inquiries live in one place, in a sheet you can check from your phone",
        "SEO articles go out on schedule - you just approve the draft",
        "Data is entered once and moves on by itself",
        "The routine runs itself and you get a short monthly report",
      ],
    },
    statement:
      "We automate the routine so you have time for the work only you can do.",
    trust: {
      title: "How we work",
      subtitle: "No surprises — a clear process and clear terms from the first conversation.",
      steps: [
        {
          title: "1. Free 30-minute audit",
          desc: "We look at how your business runs and which repetitive tasks are worth automating. You get a concrete, priced proposal - no commitment.",
        },
        {
          title: "2. Build",
          desc: "We connect the tools you already use (WordPress, Gmail, Google Sheets, Telegram, etc.) and launch a first version you test with real data.",
        },
        {
          title: "3. Training",
          desc: "We show you and your team where to see results, how to approve drafts and how to ask us for changes.",
        },
        {
          title: "4. Support and reporting",
          desc: "We keep everything running, make fixes and send you a short report every month. The monthly fee pays for support, not \"access\".",
        },
      ],
      badges: [
        {
          title: "Clear pricing",
          desc: "One-time build fee + a fixed monthly fee — no hidden extras beyond what's explicitly listed.",
        },
        {
          title: "Separate access per client",
          desc: "Each automation runs on its own keys and credentials, never shared with other clients.",
        },
        {
          title: "Your data stays with you",
          desc: "Articles, inquiries and spreadsheets live in your own systems. We keep only a technical run history for up to 14 days, to catch errors.",
        },
        {
          title: "GDPR and a contract",
          desc: "We sign a data processing agreement (DPA) and work to GDPR requirements.",
        },
        {
          title: "Your own installation",
          desc: "If you want a fully separate installation, we build it on your own server.",
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
          features: ["1 automation", "Support and fixes", "Monthly report"],
          cta: "Choose Starter",
          highlighted: false,
          badge: undefined as string | undefined,
        },
        {
          name: "Growth",
          build: "€499",
          monthly: "€99/mo",
          features: [
            "3 automations",
            "+ 1 bonus automation",
            "Monthly report",
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
            "5+ automations",
            "Priority support",
            "Custom integrations (add-on)",
          ],
          cta: "Choose Business",
          highlighted: false,
          badge: undefined as string | undefined,
        },
      ],
      upgradeNote:
        "Start small and grow when you see results: you can move to a bigger package or add an automation to your current one at any time.",
      addonNote: "Integrations with specific systems — add-on from €399, after checking access.",
    },
    contact: {
      title: "Ready to automate?",
      subtitle: "Tell us briefly about your business and what takes up most of your time. We'll write back within 1 business day to set up a call.",
      cta: "Send inquiry",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@company.com",
        messageLabel: "Message",
        messagePlaceholder: "E.g. we get 20 inquiries a week and answer them by hand",
        submitLabel: "Request a free audit",
        requiredError: "Please fill in this field.",
        emailError: "Please enter a valid email.",
        sendingLabel: "Sending...",
        successTitle: "Your inquiry has been sent",
        successBody:
          "Thank you! We've emailed you a confirmation and will reply within 1 business day.",
        sendError:
          "We couldn't send your inquiry. Please try again or email us directly at the address below.",
        captchaError: "Please wait for the spam check to finish and try again.",
        consentNote:
          "By sending this form you agree that we use your details only to reply to your inquiry. Details:",
        fallbackLabel: "Or email us directly at:",
        copyLabel: "Copy",
        copiedLabel: "Copied!",
      },
    },
    cta: {
      contactBanner: "Book a free 30-minute audit",
      contactBannerCta: "Get in touch",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      eik: "Company ID",
    },
  },
} as const;

export const brand = "Noxlytics";
