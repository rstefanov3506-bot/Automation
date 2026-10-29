"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

type NavLink = { label: string; href: string };

export default function MobileNav({
  links,
  altHref,
  altLabel,
  contactHref,
  ctaLabel,
}: {
  // readonly so it accepts content.ts's `as const` nav.links arrays too
  links: readonly NavLink[];
  altHref: string;
  altLabel: string;
  contactHref: string;
  ctaLabel: string;
}) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Затвори менюто" : "Отвори менюто"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="h-4 w-4"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <div
        id="mobile-nav-panel"
        className={`fixed inset-x-0 top-[65px] z-40 origin-top border-b border-border bg-background shadow-xl transition-[opacity,transform] duration-200 ${
          open
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4 text-base font-medium text-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 transition hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          <Link
            href={altHref}
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-muted transition hover:text-foreground"
          >
            {altLabel}
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href={contactHref}
              onClick={() => setOpen(false)}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
