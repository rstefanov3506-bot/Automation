import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AboutView from "@/components/AboutView";
import { pageMeta } from "@/lib/site";

const title = "За нас | Noxlytics";

export const metadata: Metadata = {
  title,
  description: "Кой стои зад Noxlytics и как работим: честно, с ясна цена, AI отзад и данни, които остават при теб.",
  ...pageMeta("/about", "bg", { title, description: "Кой стои зад Noxlytics и как работим: честно, с ясна цена, AI отзад и данни, които остават при теб." }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/about" />
      <AboutView locale="bg" />
      <SiteFooter locale="bg" />
    </div>
  );
}
