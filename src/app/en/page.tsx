import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import AutomationsSection from "@/components/AutomationsSection";
import TrustSection from "@/components/TrustSection";
import GoalsSection from "@/components/GoalsSection";
import RoiCalculator from "@/components/RoiCalculator";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Noxlytics — AI automations for business",
  description:
    "Noxlytics builds and runs AI automations — leads, chatbots, SEO, accounting integrations — with a dashboard that shows you what's happening.",
  openGraph: {
    type: "website",
    siteName: "Noxlytics",
    locale: "en_US",
    title: "Noxlytics — agents that work for you",
    description:
      "AI automations for small businesses: leads, chatbots, SEO and accounting integrations, with a dashboard to keep control.",
  },
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/" />
      <HeroSection locale="en" />
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
