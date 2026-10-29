import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale="bg" altHref="/en/pricing" />
      <div className="h-6" />
      <PricingSection locale="bg" />
      <ContactSection locale="bg" teaser />
      <SiteFooter locale="bg" />
    </div>
  );
}
