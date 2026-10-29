import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale="bg" altHref="/en/contact" />
      <div className="h-10" />
      <ContactSection locale="bg" />
      <SiteFooter locale="bg" />
    </div>
  );
}
