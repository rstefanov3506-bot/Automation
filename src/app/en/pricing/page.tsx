import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageSkeleton from "@/components/PageSkeleton";
import { content } from "@/lib/content";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale="en" altHref="/pricing" />
      <PageSkeleton locale="en" title={content.en.pricing.title} />
      <SiteFooter locale="en" />
    </div>
  );
}
