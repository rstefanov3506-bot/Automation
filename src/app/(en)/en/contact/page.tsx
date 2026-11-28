import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactView from "@/components/ContactView";
import { pageMeta } from "@/lib/site";

const title = "Contact | Noxlytics";

export const metadata: Metadata = {
  title,
  description: "Write to us or request a free 30-minute audit. We reply within 1 business day.",
  ...pageMeta("/contact", "en", { title, description: "Write to us or request a free 30-minute audit. We reply within 1 business day." }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/contact" />
      <ContactView locale="en" />
      <SiteFooter locale="en" />
    </div>
  );
}
