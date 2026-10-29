import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import { content, brand, type Locale } from "@/lib/content";

export default function SiteHeader({
  locale,
  altHref,
}: {
  locale: Locale;
  altHref: string;
}) {
  const t = content[locale];
  const altLocale = locale === "bg" ? "en" : "bg";
  const home = locale === "bg" ? "/" : "/en";
  const contactHref = locale === "bg" ? "/contact" : "/en/contact";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={home} className="text-lg font-semibold tracking-tight">
          {brand}
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {t.nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={altHref}
            className="text-sm font-medium text-muted transition hover:text-foreground"
          >
            {altLocale.toUpperCase()}
          </Link>
          <ThemeToggle />
          <Link
            href={contactHref}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
          >
            {t.nav.cta}
          </Link>
        </div>
        <MobileNav
          links={t.nav.links}
          altHref={altHref}
          altLabel={altLocale.toUpperCase()}
          contactHref={contactHref}
          ctaLabel={t.nav.cta}
        />
      </div>
    </header>
  );
}
