import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AutomationsSection from "@/components/AutomationsSection";
import ContactSection from "@/components/ContactSection";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `${content.bg.automations.title} | Noxlytics`,
  description: content.bg.automations.subtitle,
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/automations" />
      <AutomationsSection locale="bg" />
      <ContactSection locale="bg" teaser />
      <SiteFooter locale="bg" />
    </div>
  );
}
