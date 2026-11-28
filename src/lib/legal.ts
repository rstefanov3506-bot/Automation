// Terms of use and cookie policy (bg + en). Plain data, rendered by LegalPage.
// Not reviewed by a lawyer - keep it TRUE to how the business works, and keep
// client-specific terms (deadlines, termination, ownership of what we build)
// in the individual contract + DPA, not here.

import { company, type LegalDoc } from "./privacy";
import { COOKIES } from "./consent";

const cat = {
  bg: { necessary: "Необходими", analytics: "Статистика", marketing: "Реклами" },
  en: { necessary: "Necessary", analytics: "Statistics", marketing: "Advertising" },
} as const;

function cookieRows(locale: "bg" | "en") {
  return COOKIES.map((c) => [c.name, c.provider, c.purpose[locale], c.duration[locale], cat[locale][c.category]]);
}

export const terms: Record<"bg" | "en", LegalDoc> = {
  bg: {
    title: "Общи условия",
    updated: "В сила от 28.11.2026",
    sections: [
      {
        h: "1. Информация за търговеца",
        ul: [
          `Търговско наименование: Noxlytics, марка на ${company.name}`,
          `ЕИК: ${company.eik}; ДДС номер: ${company.vat}`,
          `Седалище и адрес на управление, адрес за кореспонденция: ${company.address}`,
          `Имейл: ${company.email}`,
          "Дружеството е вписано в Търговския регистър и регистъра на ЮЛНЦ към Агенцията по вписванията.",
        ],
      },
      {
        h: "2. Предмет",
        p: [
          "Тези условия уреждат използването на сайта noxlytics.com и общата рамка на услугите ни: изграждане и поддръжка на автоматизации на бизнес процеси с помощта на софтуер и изкуствен интелект.",
          "Услугите са предназначени за търговци и организации (B2B). Конкретните условия за всеки клиент - обхват, срокове, цена, прекратяване, права върху изградените решения - се уреждат в индивидуален писмен договор и договор за обработване на лични данни (DPA). При разлика договорът има предимство пред тези условия.",
        ],
      },
      {
        h: "3. Използване на сайта",
        ul: [
          "Сайтът е информационен. Описанията на услугите и пакетите не са оферта по смисъла на Търговския закон.",
          "Калкулаторът за възвръщаемост дава ориентировъчна оценка по въведените от вас данни, а не обещание за резултат.",
          "Забранено е използването на сайта и формата за спам, автоматизирани заявки, опити за достъп до чужди данни или нарушаване на работата на сайта.",
        ],
      },
      {
        h: "4. Запитване, безплатен одит и договор",
        ul: [
          "Изпращането на запитване не създава задължения за никоя от страните.",
          "Безплатният 30-минутен одит е разговор, в който разглеждаме процесите ви и предлагаме подходящи автоматизации. Той е без заплащане и без ангажимент.",
          "След одита изпращаме писмено предложение с обхват, срокове и цена. Договор възниква едва след като двете страни го потвърдят писмено (включително по имейл или с електронен подпис).",
        ],
      },
      {
        h: "5. Пакети и цени",
        ul: [
          "Цените на сайта са в евро. Всеки пакет включва еднократна такса за изграждане и месечна такса за поддръжка, наблюдение, корекции и месечен отчет.",
          "По всяко време можете да преминете към по-голям пакет или да добавите автоматизация към текущия. Условията на промяната се уговарят писмено.",
          "Окончателната цена, данъците и начинът на плащане се посочват в предложението и договора.",
          "Интеграции със специфични системи се оценяват отделно, след проверка на достъпа до тях.",
        ],
      },
      {
        h: "6. Задължения на клиента",
        ul: [
          "Да предостави достъпите, данните и съдържанието, нужни за изграждането, и да има правото да ги използва.",
          "Да преглежда и одобрява генерираното с изкуствен интелект съдържание (статии, публикации, отговори), преди то да бъде публикувано от негово име, когато автоматизацията е настроена с одобрение.",
          "Да ни уведоми при промяна в системите си (нов сайт, смяна на пароли, нови форми), която засяга автоматизациите.",
        ],
      },
      {
        h: "7. Отговорност",
        ul: [
          "Изграждаме и поддържаме автоматизациите с грижата на добър търговец, но не гарантираме конкретни бизнес резултати (брой клиенти, продажби, позиции в Google).",
          "Автоматизациите зависят от услуги на трети страни (например Google, Meta, доставчици на AI модели, хостинг). Не отговаряме за техни прекъсвания или промени, но ги отстраняваме в рамките на поддръжката, доколкото е възможно.",
          "Доколкото законът позволява, отговорността ни е ограничена до размера, уговорен в индивидуалния договор.",
        ],
      },
      {
        h: "8. Интелектуална собственост",
        p: [
          "Текстовете, дизайнът, логото и кодът на сайта са собственост на Noxlytics. Не могат да се копират или използват без писмено съгласие, освен кратки цитати с посочен източник. Правата върху решенията, изградени за клиент, се уреждат в договора с него.",
        ],
      },
      {
        h: "9. Лични данни и бисквитки",
        p: [
          "Как обработваме лични данни е описано в Политиката за поверителност (/privacy), а какво се пази в браузъра ви - в Политиката за бисквитки (/cookies).",
        ],
      },
      {
        h: "10. Промени и приложимо право",
        p: [
          "Можем да променяме тези условия. Актуалната версия е винаги на тази страница, с датата, от която е в сила. Промените не засягат вече сключени договори.",
          "Прилага се българското право. Споровете се решават по споразумение, а при невъзможност - от компетентния български съд.",
        ],
      },
    ],
  },
  en: {
    title: "Terms of use",
    updated: "Effective 28 November 2026",
    sections: [
      {
        h: "1. About us",
        ul: [
          `Trading name: Noxlytics, a brand of ${company.nameEn} (${company.name})`,
          `Company ID (EIK): ${company.eik}; VAT number: ${company.vat}`,
          `Registered office and correspondence address: ${company.addressEn}`,
          `Email: ${company.email}`,
          "Registered in the Bulgarian Commercial Register kept by the Registry Agency.",
        ],
      },
      {
        h: "2. Scope",
        p: [
          "These terms govern the use of noxlytics.com and the general framework of our services: building and maintaining business process automations using software and artificial intelligence.",
          "Our services are intended for businesses and organisations (B2B). The specific terms for each client - scope, deadlines, price, termination, rights to what we build - are set in an individual written contract and a data processing agreement (DPA). If they differ, the contract prevails over these terms.",
        ],
      },
      {
        h: "3. Using the site",
        ul: [
          "The site is informational. Descriptions of services and packages are not a binding offer.",
          "The return calculator gives an indicative estimate based on the figures you enter, not a promise of results.",
          "Using the site or the form for spam, automated requests, attempts to access others' data or to disrupt the site is prohibited.",
        ],
      },
      {
        h: "4. Inquiry, free audit and contract",
        ul: [
          "Sending an inquiry creates no obligation for either party.",
          "The free 30-minute audit is a call in which we look at your processes and suggest suitable automations. It is free and without commitment.",
          "After the audit we send a written proposal with scope, deadlines and price. A contract exists only once both parties confirm it in writing (including by email or electronic signature).",
        ],
      },
      {
        h: "5. Packages and prices",
        ul: [
          "Prices on the site are in euro. Each package has a one-time build fee and a monthly fee for support, monitoring, fixes and a monthly report.",
          "You can move to a bigger package or add an automation to your current one at any time. The terms of the change are agreed in writing.",
          "The final price, taxes and payment method are set out in the proposal and the contract.",
          "Integrations with specific systems are quoted separately, after checking access to them.",
        ],
      },
      {
        h: "6. Client obligations",
        ul: [
          "Provide the access, data and content needed for the build, and hold the right to use them.",
          "Review and approve AI-generated content (articles, posts, replies) before it is published on your behalf, where the automation is set up with approval.",
          "Tell us about changes in your systems (new website, changed passwords, new forms) that affect the automations.",
        ],
      },
      {
        h: "7. Liability",
        ul: [
          "We build and maintain automations with due professional care, but we don't guarantee specific business results (number of clients, sales, Google rankings).",
          "Automations depend on third-party services (e.g. Google, Meta, AI model providers, hosting). We are not liable for their outages or changes, but we work around them as part of support where possible.",
          "To the extent permitted by law, our liability is limited to the amount agreed in the individual contract.",
        ],
      },
      {
        h: "8. Intellectual property",
        p: [
          "The site's text, design, logo and code belong to Noxlytics and may not be copied or used without written permission, except short quotes with attribution. Rights to solutions built for a client are set in the contract with that client.",
        ],
      },
      {
        h: "9. Personal data and cookies",
        p: [
          "How we process personal data is described in the Privacy policy (/en/privacy); what is stored in your browser is described in the Cookie policy (/en/cookies).",
        ],
      },
      {
        h: "10. Changes and governing law",
        p: [
          "We may change these terms. The current version is always on this page with the date it takes effect. Changes don't affect contracts already concluded.",
          "Bulgarian law applies. Disputes are settled by agreement or, failing that, by the competent Bulgarian court.",
        ],
      },
    ],
  },
};

export const cookiePolicy: Record<"bg" | "en", LegalDoc> = {
  bg: {
    title: "Политика за бисквитки",
    updated: "В сила от 28.11.2026",
    sections: [
      {
        h: "1. Какво са бисквитките",
        p: [
          "Бисквитките са малки файлове, които сайтът записва в браузъра ви. Подобни данни могат да се пазят и в локалното хранилище на браузъра (localStorage). По-долу ги наричаме общо „бисквитки“.",
        ],
      },
      {
        h: "2. Как ги използваме",
        ul: [
          "Необходими - за да работи сайтът и да е защитен. Не изискват съгласие и не ни дават информация за вас.",
          "Статистика (Google Analytics) - само с ваше съгласие.",
          "Реклами (Google Ads, Meta Pixel) - само с ваше съгласие.",
        ],
        after: [
          "Докато не изберете в банера, не зареждаме Google Tag Manager, Google Analytics, Google Ads или Meta Pixel и не се записват техни бисквитки. Ако откажете, те не се зареждат изобщо.",
        ],
      },
      {
        h: "3. Списък",
        table: { head: ["Име", "Доставчик", "Цел", "Срок", "Вид"], rows: cookieRows("bg") },
      },
      {
        h: "4. Как да промените избора си",
        p: [
          "Използвайте „Настройки на бисквитките“ в долната част на всяка страница. Можете да оттеглите съгласието си по всяко време - това не засяга законността на обработването преди оттеглянето. Можете и да изтриете бисквитките от настройките на браузъра си.",
          "Изборът ви се пази 12 месеца, след което ви питаме отново.",
        ],
      },
      {
        h: "5. Повече информация",
        p: [
          `Как обработваме лични данни: Политика за поверителност (/privacy). Въпроси: ${company.email}.`,
        ],
      },
    ],
  },
  en: {
    title: "Cookie policy",
    updated: "Effective 28 November 2026",
    sections: [
      {
        h: "1. What cookies are",
        p: [
          "Cookies are small files a website stores in your browser. Similar data can be kept in the browser's local storage (localStorage). Below we call all of them \"cookies\".",
        ],
      },
      {
        h: "2. How we use them",
        ul: [
          "Necessary - to make the site work and keep it secure. They need no consent and tell us nothing about you.",
          "Statistics (Google Analytics) - only with your consent.",
          "Advertising (Google Ads, Meta Pixel) - only with your consent.",
        ],
        after: [
          "Until you choose in the banner, we don't load Google Tag Manager, Google Analytics, Google Ads or the Meta Pixel and none of their cookies are set. If you refuse, they are not loaded at all.",
        ],
      },
      {
        h: "3. List",
        table: { head: ["Name", "Provider", "Purpose", "Duration", "Type"], rows: cookieRows("en") },
      },
      {
        h: "4. How to change your choice",
        p: [
          "Use \"Cookie settings\" at the bottom of every page. You can withdraw consent at any time; this doesn't affect processing before the withdrawal. You can also delete cookies in your browser settings.",
          "Your choice is kept for 12 months, after which we ask again.",
        ],
      },
      {
        h: "5. More information",
        p: [`How we process personal data: Privacy policy (/en/privacy). Questions: ${company.email}.`],
      },
    ],
  },
};
