import Link from "next/link";
import { content, brand, type Locale } from "@/lib/content";
import { company } from "@/lib/privacy";
import LogoMark from "./LogoMark";
import { ConsentSettingsLink } from "./ConsentBanner";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = content[locale];
  const p = locale === "bg" ? "" : "/en";
  const legal = [
    { href: `${p}/terms`, label: t.footer.terms },
    { href: `${p}/privacy`, label: t.footer.privacy },
    { href: `${p}/cookies`, label: t.footer.cookies },
  ];
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
          {locale === "bg" ? company.name : company.nameEn} · {t.footer.eik} {company.eik} ·{" "}
          {locale === "bg" ? company.address : company.addressEn}
        </span>
        <a href={`mailto:${company.email}`} className="hover:text-foreground">
          {company.email}
        </a>
        {legal.map((l) => (
          <Link key={l.href} href={l.href} className="underline-offset-2 hover:text-foreground hover:underline">
            {l.label}
          </Link>
        ))}
        <ConsentSettingsLink label={t.footer.cookieSettings} />
      </div>
    </footer>
  );
}
