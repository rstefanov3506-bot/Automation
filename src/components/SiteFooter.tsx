import Link from "next/link";
import { content, brand, type Locale } from "@/lib/content";
import { company } from "@/lib/privacy";
import LogoMark from "./LogoMark";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = content[locale];
  const privacyHref = locale === "bg" ? "/privacy" : "/en/privacy";
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 font-semibold lowercase text-foreground">
          <LogoMark className="h-5 w-5" />
          {brand}
        </span>
        <span>
          © 2026 {brand}. {t.footer.rights}
        </span>
      </div>
      <div className="mx-auto mt-4 flex max-w-6xl flex-wrap gap-x-4 gap-y-1 px-6 text-xs text-muted">
        <span>
          {locale === "bg" ? company.name : company.nameEn} · {t.footer.eik} {company.eik}
        </span>
        <a href={`mailto:${company.email}`} className="hover:text-foreground">
          {company.email}
        </a>
        <Link href={privacyHref} className="underline-offset-2 hover:text-foreground hover:underline">
          {t.footer.privacy}
        </Link>
      </div>
    </footer>
  );
}
