import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FaqView from "@/components/FaqView";
import { pageMeta } from "@/lib/site";

const title = "FAQ | Noxlytics";

export const metadata: Metadata = {
  title,
  description: "Answers about the free audit, pricing, monthly support, data ownership and AI-written content at Noxlytics.",
  ...pageMeta("/faq", "en", { title, description: "Answers about the free audit, pricing, monthly support, data ownership and AI-written content at Noxlytics." }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="en" altHref="/faq" />
      <FaqView locale="en" />
      <SiteFooter locale="en" />
    </div>
  );
}
