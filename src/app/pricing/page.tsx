import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageSkeleton from "@/components/PageSkeleton";
import { content } from "@/lib/content";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale="bg" altHref="/en/pricing" />
      <PageSkeleton locale="bg" title={content.bg.pricing.title} />
      <SiteFooter locale="bg" />
    </div>
  );
}
