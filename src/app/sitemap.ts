import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Only pages with real content. /pricing and /contact are left out while they
// are placeholders (they are also noindex). Each entry lists its bg/en pair
// so crawlers get hreflang from the sitemap too - including the page itself,
// which Next.js does not add automatically.
const PAGES = ["/", "/automations"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap((path) => {
    const bg = `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
    const en = `${siteUrl}/en${path === "/" ? "" : path}`;
    const languages = { bg, en, "x-default": bg };
    return [
      { url: bg, lastModified: now, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.8, alternates: { languages } },
      { url: en, lastModified: now, changeFrequency: "monthly" as const, priority: path === "/" ? 0.9 : 0.7, alternates: { languages } },
    ];
  });
}
