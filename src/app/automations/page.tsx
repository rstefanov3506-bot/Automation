import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AutomationsSection from "@/components/AutomationsSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale="bg" altHref="/en/automations" />
      <div className="h-6" />
      <AutomationsSection locale="bg" />
      <ContactSection locale="bg" teaser />
      <SiteFooter locale="bg" />
    </div>
  );
}
