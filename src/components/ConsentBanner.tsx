"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_KEY,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_VERSION,
  GTM_ID,
  OPEN_CONSENT_EVENT,
  type ConsentChoice,
} from "@/lib/consent";
import type { Locale } from "@/lib/content";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    noxLoadGtm?: () => void;
  }
}

const copy = {
  bg: {
    title: "Бисквитки",
    text: "Използваме необходими настройки, за да работи сайтът. Със съгласието ви ползваме и Google Analytics за статистика, и Google Ads и Meta за измерване на рекламите. Без съгласие тези инструменти не се зареждат.",
    policy: "Политика за бисквитки",
    accept: "Приемам всички",
    reject: "Отказвам",
    settings: "Настройки",
    save: "Запази избора",
    necessary: "Необходими",
    necessaryDesc: "Тема, курсор, изборът ви за бисквитки, защита на формата. Винаги включени.",
    analytics: "Статистика",
    analyticsDesc: "Google Analytics: кои страници се разглеждат и откъде идват посетителите.",
    marketing: "Реклами",
    marketingDesc: "Google Ads и Meta Pixel: кои реклами водят до запитване.",
    href: "/cookies",
  },
  en: {
    title: "Cookies",
    text: "We use necessary settings to make the site work. With your consent we also use Google Analytics for statistics, and Google Ads and Meta to measure our ads. Without consent these tools are not loaded.",
    policy: "Cookie policy",
    accept: "Accept all",
    reject: "Reject",
    settings: "Settings",
    save: "Save choice",
    necessary: "Necessary",
    necessaryDesc: "Theme, cursor, your cookie choice, form protection. Always on.",
    analytics: "Statistics",
    analyticsDesc: "Google Analytics: which pages are viewed and where visitors come from.",
    marketing: "Advertising",
    marketingDesc: "Google Ads and Meta Pixel: which ads lead to an inquiry.",
    href: "/en/cookies",
  },
} as const;

function readChoice(): ConsentChoice | null {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null") as ConsentChoice | null;
    if (!c || c.v !== CONSENT_VERSION) return null;
    if (Date.now() - Date.parse(c.t) > CONSENT_MAX_AGE_DAYS * 864e5) return null;
    return c;
  } catch {
    return null;
  }
}

// Best-effort removal of tracking cookies after consent is withdrawn.
function clearTrackingCookies() {
  const names = document.cookie.split(";").map((c) => c.split("=")[0].trim());
  const host = location.hostname;
  for (const n of names) {
    if (/^(_ga|_gid|_gcl_|_fbp|_fbc)/.test(n)) {
      for (const d of [host, `.${host}`, ""]) {
        document.cookie = `${n}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  }
}

export default function ConsentBanner({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!GTM_ID) return;
    const c = readChoice();
    if (c) {
      setAnalytics(c.a);
      setMarketing(c.m);
    } else {
      setOpen(true);
    }
    const reopen = () => {
      const cur = readChoice();
      setAnalytics(cur?.a ?? false);
      setMarketing(cur?.m ?? false);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!GTM_ID || !open) return null;

  function save(a: boolean, m: boolean) {
    const prev = readChoice();
    const choice: ConsentChoice = { v: CONSENT_VERSION, a, m, t: new Date().toISOString() };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    } catch {}
    const g = m ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      analytics_storage: a ? "granted" : "denied",
      ad_storage: g,
      ad_user_data: g,
      ad_personalization: g,
    });
    setOpen(false);
    setDetails(false);
    const withdrew = prev && ((prev.a && !a) || (prev.m && !m));
    if (withdrew) {
      // Tags that already ran can't be unloaded: clear their cookies and
      // reload so only what is still allowed runs.
      clearTrackingCookies();
      location.reload();
      return;
    }
    if (a || m) window.noxLoadGtm?.();
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-border bg-surface p-5 shadow-2xl sm:inset-x-6 sm:bottom-6"
    >
      <h2 id="consent-title" className="text-base font-semibold">
        {t.title}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {t.text}{" "}
        <Link href={t.href} className="underline underline-offset-2 hover:text-foreground">
          {t.policy}
        </Link>
      </p>

      {details && (
        <div className="mt-4 space-y-3 text-sm">
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-[var(--accent)]" />
            <span>
              <span className="font-medium">{t.necessary}</span>
              <span className="block text-muted">{t.necessaryDesc}</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--accent)]"
            />
            <span>
              <span className="font-medium">{t.analytics}</span>
              <span className="block text-muted">{t.analyticsDesc}</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--accent)]"
            />
            <span>
              <span className="font-medium">{t.marketing}</span>
              <span className="block text-muted">{t.marketingDesc}</span>
            </span>
          </label>
        </div>
      )}

      {/* Accept and reject are equally prominent (GDPR: refusing must be as easy as accepting). */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save(true, true)}
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => save(false, false)}
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
        >
          {t.reject}
        </button>
        {details ? (
          <button
            type="button"
            onClick={() => save(analytics, marketing)}
            className="w-full rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-accent"
          >
            {t.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDetails(true)}
            className="w-full rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-accent"
          >
            {t.settings}
          </button>
        )}
      </div>
    </div>
  );
}

export function ConsentSettingsLink({ label }: { label: string }) {
  if (!GTM_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="underline-offset-2 hover:text-foreground hover:underline"
    >
      {label}
    </button>
  );
}
