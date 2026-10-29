import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageSkeleton from "@/components/PageSkeleton";
import { content } from "@/lib/content";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/contact" />
      <PageSkeleton locale="bg" title={content.bg.contact.title} />
      <SiteFooter locale="bg" />
    </div>
  );
}
