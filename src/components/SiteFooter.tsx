import { content, brand, type Locale } from "@/lib/content";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted">
        <span>{brand}</span>
        <span>
          © 2026 {brand}. {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
