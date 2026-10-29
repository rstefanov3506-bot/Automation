import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale="en" altHref="/pricing" />
      <div className="h-6" />
      <PricingSection locale="en" />
      <ContactSection locale="en" teaser />
      <SiteFooter locale="en" />
    </div>
  );
}
