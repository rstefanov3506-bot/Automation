import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AutomationsSection from "@/components/AutomationsSection";
import ContactSection from "@/components/ContactSection";
import { content } from "@/lib/content";
import { alternates } from "@/lib/site";

export const metadata: Metadata = {
  title: `${content.en.automations.title} | Noxlytics`,
  description: content.en.automations.subtitle,
  alternates: alternates("/automations", "en"),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/automations" />
      <AutomationsSection locale="en" />
      <ContactSection locale="en" teaser />
      <SiteFooter locale="en" />
    </div>
  );
}
