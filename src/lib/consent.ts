// Cookie consent (Google Consent Mode v2, "basic" mode).
//
// Rules this file enforces together with RootShell + ConsentBanner:
// - Before consent NOTHING from Google/Meta loads: no GTM, no GA4, no Pixel,
//   so no third-party cookies are written.
// - GTM is loaded only after the visitor grants analytics and/or marketing.
//   Inside GTM, GA4 tags must require `analytics_storage` and the Meta Pixel /
//   Google Ads tags must require `ad_storage` (GTM -> tag -> Advanced settings
//   -> Consent settings). That keeps "analytics only" from firing the Pixel.
// - The choice is stored in localStorage (necessary storage, no cookie) and is
//   asked again after 12 months or when CONSENT_VERSION changes.
// - The whole feature is off (no banner, no footer link) until
//   NEXT_PUBLIC_GTM_ID is set: with no tracking there is nothing to consent to.
//
// COOKIES below is the single source for the cookie policy table. Update it
// whenever a tag is added in GTM.

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const CONSENT_KEY = "nox-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 365;
export const OPEN_CONSENT_EVENT = "nox:open-consent";

export type ConsentChoice = { v: number; a: boolean; m: boolean; t: string };

type Row = {
  name: string;
  provider: string;
  purpose: { bg: string; en: string };
  duration: { bg: string; en: string };
  category: "necessary" | "analytics" | "marketing";
};

export const COOKIES: Row[] = [
  {
    name: "theme",
    provider: "noxlytics.com (localStorage)",
    purpose: { bg: "Помни избраната светла или тъмна тема.", en: "Remembers the light or dark theme you chose." },
    duration: { bg: "До изтриване от вас", en: "Until you clear it" },
    category: "necessary",
  },
  {
    name: "drone-cursor-disabled",
    provider: "noxlytics.com (localStorage)",
    purpose: { bg: "Помни дали сте изключили анимирания курсор.", en: "Remembers whether you turned off the animated cursor." },
    duration: { bg: "До изтриване от вас", en: "Until you clear it" },
    category: "necessary",
  },
  {
    name: CONSENT_KEY,
    provider: "noxlytics.com (localStorage)",
    purpose: { bg: "Помни избора ви за бисквитките.", en: "Remembers your cookie choice." },
    duration: { bg: "12 месеца", en: "12 months" },
    category: "necessary",
  },
  {
    name: "Cloudflare Turnstile",
    provider: "Cloudflare (challenges.cloudflare.com)",
    purpose: {
      bg: "Проверка срещу спам. Зарежда се само когато използвате формата за запитване.",
      en: "Spam check. Loads only when you use the inquiry form.",
    },
    duration: { bg: "Сесия", en: "Session" },
    category: "necessary",
  },
  {
    name: "_ga, _ga_*",
    provider: "Google Analytics",
    purpose: { bg: "Разграничава посетителите за статистика на посещенията.", en: "Distinguishes visitors for visit statistics." },
    duration: { bg: "До 2 години", en: "Up to 2 years" },
    category: "analytics",
  },
  {
    name: "_gcl_au",
    provider: "Google Ads",
    purpose: { bg: "Измерва кои реклами водят до запитване.", en: "Measures which ads lead to an inquiry." },
    duration: { bg: "3 месеца", en: "3 months" },
    category: "marketing",
  },
  {
    name: "_fbp, _fbc",
    provider: "Meta (Facebook, Instagram)",
    purpose: { bg: "Измерва рекламите във Facebook и Instagram.", en: "Measures ads on Facebook and Instagram." },
    duration: { bg: "3 месеца", en: "3 months" },
    category: "marketing",
  },
];

// Inline <head> script: runs before anything else. Sets Consent Mode v2
// defaults to denied and, if a valid earlier choice exists, applies it and
// loads GTM straight away. Also exposes window.noxLoadGtm for the banner.
export function consentInitScript(): string {
  if (!GTM_ID) return "";
  const id = JSON.stringify(GTM_ID);
  return `
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted'
  });
  window.noxLoadGtm = function () {
    if (window.__noxGtm) return;
    window.__noxGtm = true;
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + ${id};
    document.head.appendChild(s);
  };
  try {
    var c = JSON.parse(localStorage.getItem('${CONSENT_KEY}') || 'null');
    var fresh = c && c.v === ${CONSENT_VERSION} && (Date.now() - Date.parse(c.t)) < ${CONSENT_MAX_AGE_DAYS} * 864e5;
    if (fresh) {
      var m = c.m ? 'granted' : 'denied';
      gtag('consent', 'update', {
        analytics_storage: c.a ? 'granted' : 'denied',
        ad_storage: m, ad_user_data: m, ad_personalization: m
      });
      if (c.a || c.m) window.noxLoadGtm();
    }
  } catch (e) {}
})();
`;
}
