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

// Bulgarian lives at the root, English under /en. Pairs a bg path with its en
// mirror so each page can declare canonical + hreflang alternates.
export function alternates(bgPath: string, locale: "bg" | "en"): Metadata["alternates"] {
  const bg = bgPath === "/" ? "/" : bgPath;
  const en = bgPath === "/" ? "/en" : `/en${bgPath}`;
  return {
    canonical: locale === "bg" ? bg : en,
    languages: { bg, en, "x-default": bg },
  };
}

// For placeholder pages: never indexed, even after launch, until they have
// real content (thin pages drag down the whole site's quality signal).
export const noindexRobots: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};
