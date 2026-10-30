import { content, type Locale } from "@/lib/content";

// Two infinite rows of tool names moving in opposite directions, placed right
// under the hero. Labelled as "tools we connect", NOT client logos - a logo
// strip under a hero usually reads as "trusted by", and we have no clients to
// show yet. Names are rendered as our own chips (no third-party logo artwork).
//
// Pure CSS: each track holds the list twice and slides by -50%, so the loop is
// seamless; only transform animates (compositor-only, no JS). Hover pauses,
// edges fade out, and reduced-motion gets one static, wrapped row.

type Tool = { name: string; kind: "ai" | "auto" | "biz" };

const ROWS: Tool[][] = [
  [
    { name: "Claude", kind: "ai" },
    { name: "n8n", kind: "auto" },
    { name: "ChatGPT", kind: "ai" },
    { name: "Make", kind: "auto" },
    { name: "Gemini", kind: "ai" },
    { name: "Zapier", kind: "auto" },
    { name: "Mistral", kind: "ai" },
    { name: "Airtable", kind: "auto" },
    { name: "ElevenLabs", kind: "ai" },
    { name: "Supabase", kind: "auto" },
    { name: "Perplexity", kind: "ai" },
    { name: "Google Sheets", kind: "auto" },
    { name: "Whisper", kind: "ai" },
    { name: "Webhooks", kind: "auto" },
  ],
  [
    { name: "Econt", kind: "biz" },
    { name: "WordPress", kind: "biz" },
    { name: "Viber", kind: "biz" },
    { name: "WooCommerce", kind: "biz" },
    { name: "Speedy", kind: "biz" },
    { name: "Shopify", kind: "biz" },
    { name: "WhatsApp", kind: "biz" },
    { name: "Microinvest", kind: "biz" },
    { name: "Gmail", kind: "biz" },
    { name: "Meta Ads", kind: "biz" },
    { name: "Google Ads", kind: "biz" },
    { name: "Telegram", kind: "biz" },
    { name: "HubSpot", kind: "biz" },
    { name: "Slack", kind: "biz" },
    { name: "Notion", kind: "biz" },
    { name: "Stripe", kind: "biz" },
  ],
];

const DOT: Record<Tool["kind"], string> = {
  ai: "bg-accent",
  auto: "bg-pop",
  biz: "bg-foreground/35",
};

function Chip({ tool }: { tool: Tool }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium whitespace-nowrap">
      <span className={`h-2 w-2 rounded-full ${DOT[tool.kind]}`} aria-hidden="true" />
      {tool.name}
    </li>
  );
}

function Row({ tools, reverse, seconds }: { tools: Tool[]; reverse?: boolean; seconds: number }) {
  return (
    <div className="marquee">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${seconds}s` }}
      >
        <ul className="marquee-group">
          {tools.map((t) => (
            <Chip key={t.name} tool={t} />
          ))}
        </ul>
        {/* Visual duplicate for the seamless loop; hidden from screen readers. */}
        <ul className="marquee-group marquee-dupe" aria-hidden="true">
          {tools.map((t) => (
            <Chip key={t.name} tool={t} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function IntegrationsMarquee({ locale }: { locale: Locale }) {
  const t = content[locale].integrations;
  return (
    <section aria-labelledby="integrations-title" className="py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="label-mono text-accent">{t.eyebrow}</p>
        <h2 id="integrations-title" className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          {t.title}
        </h2>
      </div>
      <div className="mt-8 space-y-3">
        {/* Top row runs right-to-left, bottom row left-to-right. */}
        <Row tools={ROWS[0]} seconds={46} />
        <Row tools={ROWS[1]} seconds={54} reverse />
      </div>
      <p className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 text-xs text-muted">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />{t.legend.ai}</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-pop" aria-hidden="true" />{t.legend.auto}</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-foreground/35" aria-hidden="true" />{t.legend.biz}</span>
      </p>
    </section>
  );
}
