import type { Metadata } from "next";

// Absolute site origin for canonical URLs, hreflang, the sitemap and share
// images. Set NEXT_PUBLIC_SITE_URL (e.g. https://noxlytics.com) once the
// custom domain is live; until then Vercel's production URL is used.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

// ONE switch for search-engine visibility. While false (the default), every
// page carries noindex,nofollow AND robots.txt disallows crawling, so the
// unfinished site stays out of Google. Set NEXT_PUBLIC_ALLOW_INDEXING=true in
// Vercel when ready to go live - both flip together.
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// Bulgarian lives at the root, English under /en. Absolute URLs everywhere,
// so canonical, hreflang and og:url are byte-identical (the home page is
// always "https://noxlytics.com/", with the slash).
function urls(bgPath: string) {
  const bg = bgPath === "/" ? `${siteUrl}/` : `${siteUrl}${bgPath}`;
  const en = bgPath === "/" ? `${siteUrl}/en` : `${siteUrl}/en${bgPath}`;
  return { bg, en };
}

export function alternates(bgPath: string, locale: "bg" | "en"): Metadata["alternates"] {
  const { bg, en } = urls(bgPath);
  return {
    canonical: locale === "bg" ? bg : en,
    languages: { bg, en, "x-default": bg },
  };
}

const OG = {
  bg: {
    locale: "bg_BG",
    title: "Noxlytics — агенти, които работят вместо теб",
    description:
      "AI автоматизации за малкия бизнес: SEO съдържание, социални мрежи, запитвания и чатботове, с месечен отчет какво е свършено.",
  },
  en: {
    locale: "en_US",
    title: "Noxlytics — agents that work for you",
    description:
      "AI automations for small businesses: SEO content, social media, inquiries and chatbots, with a monthly report of what was done.",
  },
} as const;

// Per-page metadata: canonical + hreflang + a full openGraph block with og:url.
// (A page-level openGraph replaces the layout's one entirely, so it is rebuilt
// here every time instead of relying on inheritance.)
export function pageMeta(
  bgPath: string,
  locale: "bg" | "en",
  og: { title?: string; description?: string } = {}
): Metadata {
  const alt = alternates(bgPath, locale);
  return {
    alternates: alt,
    openGraph: {
      type: "website",
      siteName: "Noxlytics",
      locale: OG[locale].locale,
      title: og.title ?? OG[locale].title,
      description: og.description ?? OG[locale].description,
      url: alt?.canonical as string,
      images: [{ url: locale === "bg" ? "/og-bg.png" : "/og-en.png", width: 1200, height: 630 }],
    },
  };
}

// Root-layout metadata for each language tree (app/(bg), app/(en)).
export function rootMetadata(locale: "bg" | "en"): Metadata {
  const bg = locale === "bg";
  return {
    metadataBase: new URL(siteUrl),
    title: bg ? "Noxlytics — AI автоматизации за бизнеса" : "Noxlytics — AI automations for business",
    description: bg
      ? "Изграждаме и поддържаме AI автоматизации — SEO съдържание, социални мрежи, запитвания и чатботове — и всеки месец получаваш отчет какво е свършено."
      : "Noxlytics builds and runs AI automations — SEO content, social media, inquiries and chatbots — and every month you get a report of what was done.",
    twitter: { card: "summary_large_image" },
    // Sitewide noindex until NEXT_PUBLIC_ALLOW_INDEXING=true.
    robots: allowIndexing
      ? undefined
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

// For placeholder pages: never indexed, even after launch, until they have
// real content (thin pages drag down the whole site's quality signal).
export const noindexRobots: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};
