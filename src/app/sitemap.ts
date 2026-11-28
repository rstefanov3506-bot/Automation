import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Only pages with real content. /pricing is left out while it is a placeholder
// (it is also noindex). Legal pages are reachable from every footer. Each entry lists its bg/en pair
// so crawlers get hreflang from the sitemap too - including the page itself,
// which Next.js does not add automatically.
const PAGES = ["/", "/automations", "/about", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap((path) => {
    const bg = path === "/" ? siteUrl : `${siteUrl}${path}`;
    const en = `${siteUrl}/en${path === "/" ? "" : path}`;
    const languages = { bg, en, "x-default": bg };
    return [
      { url: bg, lastModified: now, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.8, alternates: { languages } },
      { url: en, lastModified: now, changeFrequency: "monthly" as const, priority: path === "/" ? 0.9 : 0.7, alternates: { languages } },
    ];
  });
}
