import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import AutomationsSection from "@/components/AutomationsSection";
import TrustSection from "@/components/TrustSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/" />
      <HeroSection locale="en" />
      <AutomationsSection locale="en" teaser />
      <TrustSection locale="en" />
      <PricingSection locale="en" />
      <ContactSection locale="en" teaser />
      <SiteFooter locale="en" />
    </div>
  );
}
