import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale="en" altHref="/contact" />
      <div className="h-10" />
      <ContactSection locale="en" />
      <SiteFooter locale="en" />
    </div>
  );
}
