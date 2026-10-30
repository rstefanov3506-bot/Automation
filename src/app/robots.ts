import type { MetadataRoute } from "next";
import { siteUrl, allowIndexing } from "@/lib/site";

// Blocks all crawling until NEXT_PUBLIC_ALLOW_INDEXING=true (see lib/site.ts);
// then allows everything and points crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
