import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LegalPage } from "@/components/PrivacyPolicy";
import { cookiePolicy } from "@/lib/legal";
import { pageMeta } from "@/lib/site";

const title = `${cookiePolicy.bg.title} | Noxlytics`;

export const metadata: Metadata = {
  title,
  ...pageMeta("/cookies", "bg", { title }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/cookies" />
      <LegalPage doc={cookiePolicy.bg} />
      <SiteFooter locale="bg" />
    </div>
  );
}
