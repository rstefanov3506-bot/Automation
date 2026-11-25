import { NextResponse } from "next/server";

// Contact form endpoint. Flow: browser -> this route (Vercel) -> Turnstile
// check -> n8n webhook on the home server via Cloudflare Tunnel. The n8n URL
// and its shared secret live only in server env vars, never in the browser.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 200, email: 200, message: 5000, page: 300 };

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  locale?: unknown;
  page?: unknown;
  token?: unknown;
  website?: unknown; // honeypot: real people never see or fill it
};

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const fail = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: AbortSignal.timeout(8000) }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return fail("invalid", 400);
  }

  // Bots that fill every field get a fake success and nothing is sent.
  if (str(data.website, 200)) return NextResponse.json({ ok: true });

  const name = str(data.name, LIMITS.name);
  const email = str(data.email, LIMITS.email).toLowerCase();
  const message = str(data.message, LIMITS.message);
  const page = str(data.page, LIMITS.page);
  const locale = data.locale === "en" ? "en" : "bg";
  const token = str(data.token, 4096);

  if (!name || !message || !EMAIL_RE.test(email)) return fail("invalid", 400);
  if (!token) return fail("captcha", 400);

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;
  if (!(await verifyTurnstile(token, ip))) return fail("captcha", 400);

  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  const secret = process.env.N8N_LEAD_WEBHOOK_SECRET;
  if (!url || !secret) return fail("unavailable", 503);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Noxlytics-Secret": secret,
      },
      body: JSON.stringify({ name, email, message, locale, page }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return fail("unavailable", 502);
  } catch {
    return fail("unavailable", 502);
  }

  return NextResponse.json({ ok: true });
}
