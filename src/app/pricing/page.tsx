import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { alternates, noindexRobots } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";
import PageSkeleton from "@/components/PageSkeleton";
import { content } from "@/lib/content";

// Placeholder until real content exists: kept out of search results.
export const metadata: Metadata = {
  alternates: alternates("/pricing", "bg"),
  robots: noindexRobots,
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/pricing" />
      <PageSkeleton locale="bg" title={content.bg.pricing.title} />
      <SiteFooter locale="bg" />
    </div>
  );
}
