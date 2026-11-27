import type { Metadata } from "next";
import Link from "next/link";
import RootShell from "@/components/RootShell";
import LogoMark from "@/components/LogoMark";

// Unmatched URLs. Two root layouts exist (app/(bg), app/(en)), so this page
// brings its own shell; the URL alone can't tell the language, so it's bilingual.
export const metadata: Metadata = {
  title: "404 | Noxlytics",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="bg">
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center text-foreground">
        <LogoMark className="h-10 w-10" />
        <p className="label-mono mt-6 text-muted">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Страницата не е намерена</h1>
        <p className="mt-1 text-muted" lang="en">Page not found</p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast">
            Начало
          </Link>
          <Link href="/en" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">
            Home (EN)
          </Link>
        </div>
      </main>
    </RootShell>
  );
}
