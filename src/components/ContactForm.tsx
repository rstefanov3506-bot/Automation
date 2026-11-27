"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { content, type Locale } from "@/lib/content";
import Turnstile from "./Turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const EMAIL = "hello@noxlytics.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = content[locale].contact.form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [website, setWebsite] = useState(""); // honeypot
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = t.requiredError;
    if (!email.trim()) next.email = t.requiredError;
    else if (!EMAIL_RE.test(email.trim())) next.email = t.emailError;
    if (!message.trim()) next.message = t.requiredError;
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length > 0) return;
    if (!token) {
      setFormError(t.captchaError);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          locale,
          page: pathname,
          token,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("sent");
        return;
      }
      setFormError(data.error === "captcha" ? t.captchaError : t.sendError);
    } catch {
      setFormError(t.sendError);
    }
    // A Turnstile token is single-use: get a fresh one for the next attempt.
    setResetKey((k) => k + 1);
    setStatus("error");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the email text is already selectable.
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mx-auto max-w-md rounded-2xl border border-accent/30 bg-accent/10 p-6 text-center"
      >
        <p className="text-sm font-semibold text-foreground">{t.successTitle}</p>
        <p className="mt-2 text-sm text-muted">{t.successBody}</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          <span className="text-muted">{t.fallbackLabel}</span>
          <button
            type="button"
            onClick={copyEmail}
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            {EMAIL} · {copied ? t.copiedLabel : t.copyLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative mx-auto max-w-md text-left">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-muted">
          {t.nameLabel}
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          aria-invalid={Boolean(errors.name)}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="contact-email" className="text-sm font-medium text-muted">
          {t.emailLabel}
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="text-sm font-medium text-muted">
          {t.messageLabel}
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          rows={4}
          aria-invalid={Boolean(errors.message)}
          className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {SITE_KEY && (
        <Turnstile siteKey={SITE_KEY} language={locale} resetKey={resetKey} onToken={setToken} />
      )}

      {formError && (
        <p role="alert" className="mt-4 text-sm text-red-500">
          {formError}
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        {t.consentNote}{" "}
        <Link
          href={locale === "bg" ? "/privacy" : "/en/privacy"}
          className="underline underline-offset-2 hover:text-foreground"
        >
          {content[locale].footer.privacy}
        </Link>
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? t.sendingLabel : t.submitLabel}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm">
        <span className="text-muted">{t.fallbackLabel}</span>
        <button
          type="button"
          onClick={copyEmail}
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          {EMAIL} · {copied ? t.copiedLabel : t.copyLabel}
        </button>
      </div>
    </form>
  );
}
