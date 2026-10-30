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
      <SiteHeader locale="bg" altHref="/en" />
      <HeroSection locale="bg" />
      <AutomationsSection locale="bg" teaser />
      <TrustSection locale="bg" />
      <PricingSection locale="bg" />
      <ContactSection locale="bg" teaser />
      <SiteFooter locale="bg" />
    </div>
  );
}
