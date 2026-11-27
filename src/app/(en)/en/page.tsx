import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { pageMeta } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import AutomationsSection from "@/components/AutomationsSection";
import TrustSection from "@/components/TrustSection";
import GoalsSection from "@/components/GoalsSection";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import RoiCalculator from "@/components/RoiCalculator";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import ProblemsSection from "@/components/ProblemsSection";
import ScrollWordsText from "@/components/ScrollWordsText";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  ...pageMeta("/", "en"),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/" />
      <HeroSection locale="en" />
      <IntegrationsMarquee locale="en" />
      <ProblemsSection locale="en" />
      <ScrollWordsText text={content.en.statement} />
      <GoalsSection locale="en" />
      <AutomationsSection locale="en" teaser />
      <TrustSection locale="en" />
      <RoiCalculator locale="en" />
      <PricingSection locale="en" />
      <ContactSection locale="en" teaser />
      <SiteFooter locale="en" />
    </div>
  );
}
