import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AboutView from "@/components/AboutView";
import { pageMeta } from "@/lib/site";

const title = "About us | Noxlytics";

export const metadata: Metadata = {
  title,
  description: "Who is behind Noxlytics and how we work: honest, clear pricing, AI in the back and data that stays yours.",
  ...pageMeta("/about", "en", { title, description: "Who is behind Noxlytics and how we work: honest, clear pricing, AI in the back and data that stays yours." }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/about" />
      <AboutView locale="en" />
      <SiteFooter locale="en" />
    </div>
  );
}
