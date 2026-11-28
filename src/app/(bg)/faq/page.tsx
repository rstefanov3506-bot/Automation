import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FaqView from "@/components/FaqView";
import { pageMeta } from "@/lib/site";

const title = "Често задавани въпроси | Noxlytics";

export const metadata: Metadata = {
  title,
  description: "Отговори за безплатния одит, цените, месечната поддръжка, данните и AI текстовете при Noxlytics.",
  ...pageMeta("/faq", "bg", { title, description: "Отговори за безплатния одит, цените, месечната поддръжка, данните и AI текстовете при Noxlytics." }),
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteHeader locale="bg" altHref="/en/faq" />
      <FaqView locale="bg" />
      <SiteFooter locale="bg" />
    </div>
  );
}
