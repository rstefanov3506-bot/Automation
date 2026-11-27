import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { privacy } from "@/lib/privacy";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: `${privacy.en.title} | Noxlytics`,
  ...pageMeta("/privacy", "en", { title: `${privacy.en.title} | Noxlytics` }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/privacy" />
      <PrivacyPolicy locale="en" />
      <SiteFooter locale="en" />
    </div>
  );
}
