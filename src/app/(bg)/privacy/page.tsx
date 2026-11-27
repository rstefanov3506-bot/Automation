import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { privacy } from "@/lib/privacy";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: `${privacy.bg.title} | Noxlytics`,
  ...pageMeta("/privacy", "bg", { title: `${privacy.bg.title} | Noxlytics` }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/privacy" />
      <PrivacyPolicy locale="bg" />
      <SiteFooter locale="bg" />
    </div>
  );
}
