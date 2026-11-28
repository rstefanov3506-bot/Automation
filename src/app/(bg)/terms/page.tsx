import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LegalPage } from "@/components/PrivacyPolicy";
import { terms } from "@/lib/legal";
import { pageMeta } from "@/lib/site";

const title = `${terms.bg.title} | Noxlytics`;

export const metadata: Metadata = {
  title,
  ...pageMeta("/terms", "bg", { title }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/terms" />
      <LegalPage doc={terms.bg} />
      <SiteFooter locale="bg" />
    </div>
  );
}
