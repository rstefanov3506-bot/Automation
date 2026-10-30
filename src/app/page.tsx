import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { alternates } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import AutomationsSection from "@/components/AutomationsSection";
import TrustSection from "@/components/TrustSection";
import GoalsSection from "@/components/GoalsSection";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import RoiCalculator from "@/components/RoiCalculator";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = { alternates: alternates("/", "bg") };

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en" />
      <HeroSection locale="bg" />
      <IntegrationsMarquee locale="bg" />
      <GoalsSection locale="bg" />
      <AutomationsSection locale="bg" teaser />
      <TrustSection locale="bg" />
      <RoiCalculator locale="bg" />
      <PricingSection locale="bg" />
      <ContactSection locale="bg" teaser />
      <SiteFooter locale="bg" />
    </div>
  );
}
