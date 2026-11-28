import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LegalPage } from "@/components/PrivacyPolicy";
import { cookiePolicy } from "@/lib/legal";
import { pageMeta } from "@/lib/site";

const title = `${cookiePolicy.en.title} | Noxlytics`;

export const metadata: Metadata = {
  title,
  ...pageMeta("/cookies", "en", { title }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/cookies" />
      <LegalPage doc={cookiePolicy.en} />
      <SiteFooter locale="en" />
    </div>
  );
}
