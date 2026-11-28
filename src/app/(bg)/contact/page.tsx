import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactView from "@/components/ContactView";
import { pageMeta } from "@/lib/site";

const title = "Контакти | Noxlytics";

export const metadata: Metadata = {
  title,
  description: "Пиши ни или заяви безплатен 30-минутен одит. Отговаряме до 1 работен ден.",
  ...pageMeta("/contact", "bg", { title, description: "Пиши ни или заяви безплатен 30-минутен одит. Отговаряме до 1 работен ден." }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/contact" />
      <ContactView locale="bg" />
      <SiteFooter locale="bg" />
    </div>
  );
}
