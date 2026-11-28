import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LegalPage } from "@/components/PrivacyPolicy";
import { terms } from "@/lib/legal";
import { pageMeta } from "@/lib/site";

const title = `${terms.en.title} | Noxlytics`;

export const metadata: Metadata = {
  title,
  ...pageMeta("/terms", "en", { title }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/terms" />
      <LegalPage doc={terms.en} />
      <SiteFooter locale="en" />
    </div>
  );
}
