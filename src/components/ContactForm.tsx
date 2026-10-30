"use client";

import { useState } from "react";
import { content, type Locale } from "@/lib/content";

const EMAIL = "hello@noxlytics.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = content[locale].contact.form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = t.requiredError;
    if (!email.trim()) next.email = t.requiredError;
    else if (!EMAIL_RE.test(email.trim())) next.email = t.emailError;
    if (!message.trim()) next.message = t.requiredError;
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `${locale === "bg" ? "Запитване от" : "Inquiry from"} ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
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

  if (sent) {
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
    <form onSubmit={onSubmit} noValidate className="mx-auto max-w-md text-left">
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

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
      >
        {t.submitLabel}
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
