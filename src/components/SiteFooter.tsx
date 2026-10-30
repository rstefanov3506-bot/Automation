import { content, brand, type Locale } from "@/lib/content";
import LogoMark from "./LogoMark";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted">
        <span className="flex items-center gap-2 font-semibold lowercase text-foreground">
          <LogoMark className="h-5 w-5" />
          {brand}
        </span>
        <span>
          © 2026 {brand}. {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
