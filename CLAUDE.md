# Noxlytics — project memory

Read this first, every session, before touching anything.

## What this is

B2B AI-automation-agency marketing site ("Noxlytics") for Rumen Stefanov
(runs Webtopix, a Bulgarian digital agency). Rumen has **no Next.js/Vercel
experience** — Claude does all code changes, verification, git commits
and pushes directly, without being asked each time. Communication style:
direct, technical, no filler, no unnecessary costs/signups.

Repo: `rstefanov3506-bot/Automation` (GitHub renamed it from `automation`
to `Automation` — old remote URL still works, git just prints a notice).
Stack: Next.js 16 App Router + Turbopack, Tailwind CSS v4, GSAP
(ScrollTrigger, quickTo/quickSetter, gsap.context for cleanup).

## Standing operational constraints (do not relearn these the hard way)

1. **Dev server hot-reload is unreliable in this sandbox.** After any edit
   batch, kill existing `next dev` processes and start a fresh one on a
   new port before verifying. Plain `cmd &` backgrounding is flaky here
   (random exit 144s); the pattern that works reliably:
   ```bash
   setsid nohup npx next dev -p <PORT> > /path/to/scratchpad/dev.log 2>&1 < /dev/null &
   disown
   ```
   Then `sleep 6; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:<PORT>/`
   to confirm it's up. `pgrep -af "node .*next dev"` to find stray
   processes before killing (avoid `pkill -f "next dev"` — it can match
   and kill the wrapping shell itself and throw a confusing exit 144).

2. **Non-ASCII characters (em dashes, etc.) anywhere in `globals.css`,
   including comments, silently truncate the CSS** (a Lightning
   CSS/Tailwind v4 compiler bug). Always use plain hyphens there.

3. **Claude-in-Chrome cannot reach localhost in this sandbox** (separate
   network namespace — confirmed repeatedly: `Frame with ID 0 is showing
   error page` / `ERR_CONNECTION_REFUSED`). It *can* reach real external
   sites fine (used it successfully against jeton.com). For all
   localhost visual verification, use **Playwright directly via Bash**
   instead (Chromium + Playwright are pre-installed, works from any
   directory, `chromium.launch()` needs no extra options) — write a
   small script to `scratchpad/`, screenshot, `Read` the PNG.

4. **The shell's own network egress is restricted** to npm/pip
   registries and GitHub only. Anything else (a tool's internal
   Puppeteer hitting an arbitrary URL, `curl` to a random domain) gets
   blocked (`ERR_TUNNEL_CONNECTION_FAILED` / proxy 403). This is why
   `designlang`'s own CLI can't extract external sites from the shell —
   had to do it manually via Claude-in-Chrome + `javascript_tool`
   computed-style sampling instead (see the extract-design skill note
   below).

5. **Impeccable's `detect` on a URL must run as the non-root `claude`
   user** (Chromium/Puppeteer refuses `--no-sandbox`-less launch as
   root). Pattern:
   ```bash
   su claude -c "cd /home/claude/automation && IMPECCABLE_BIN=/home/claude/.impeccable/bin/0.1.18/impeccable ./.claude/skills/impeccable/scripts/impeccable detect --json http://localhost:<PORT>/"
   ```
   The engine binary is pre-copied to `/home/claude/.impeccable/bin/...`
   for this user (root's `~/.impeccable` is 0700, unreachable to
   `claude`).

6. **Before every commit**: `npx tsc --noEmit`, then `npx next build`,
   both clean. Delete `tsconfig.tsbuildinfo` first (gitignored, but it
   gets regenerated and clutters `git status` if not removed).

7. **Git workflow**: commit and push directly to `main` after each
   verified change — Rumen can't do this himself. Use real commit
   messages explaining *why*, not just *what*. Standard attribution
   trailer goes on every commit per the session's system reminder.

## Current design system (`src/app/globals.css`)

CSS custom properties, redefined under `.dark`:
`--background / --foreground / --surface / --border / --accent /
--accent-rgb / --accent-contrast / --muted`.

- `--accent` is WCAG-AA-passing emerald (`#047857` light / `#34d399`
  dark) — computed via a one-off Node contrast-ratio script, don't
  revert to a lighter/brighter green without re-checking contrast.
- `--muted` is the foreground ink at reduced opacity
  (`rgba(fg, 0.68)` light / `0.65` dark), **not** a separate gray hex —
  jeton.com-inspired single-ink pattern, same contrast as before (~7:1).
- `.gradient-text` is a **solid** accent color, not an actual gradient
  (deliberate — gradient-clip text reads as generic AI-template
  polish). Misleading class name, intentionally kept.
- `.shadow-accent` is a soft two-layer brand-tinted shadow
  (`rgba(var(--accent-rgb), 0.25/0.15)`) for the one or two elements
  that should read as the "lifted focal point" (highlighted pricing
  tier, hero dashboard mock) — don't apply it everywhere, it's meant to
  be rare.
- Font: **Onest Variable**, self-hosted via `@fontsource-variable/onest`
  (imported in `layout.tsx`, first in `--font-sans`). Chosen for proper
  Cyrillic; deliberately not Sofia Sans (cyberninjas' signature). Not
  `next/font/google` - that fetches from Google at build time, which the
  sandbox blocks.
- `.edge-light` = 1px inset top highlight on cards (light/dark variants,
  combined variant with `.shadow-accent`). Applied to automations/trust
  cards, hero dashboard, goals panel, ROI card. Do not add it to elements
  using Tailwind `ring-*` (both use box-shadow, they clobber each other).
- Headings (`h1/h2/h3`) are `font-semibold` (600) sitewide, not
  `font-bold` — hierarchy comes from size. Price/stat *figures* (not
  headings) keep `font-bold` for emphasis.

## Site structure

- Homepage order: Hero -> GoalsSection (intent tabs) -> Automations teaser
  -> Trust -> RoiCalculator -> Pricing teaser -> Contact teaser.
- `/`, `/automations`, `/pricing`, `/contact` (Bulgarian, primary) +
  `/en/*` mirrors. Content lives in `src/lib/content.ts` (bg/en objects,
  manually duplicated — not a keyed i18n system; fine for now, a future
  maintenance risk if copy drifts).
- **Only the homepage is fully built.** `/automations`, `/pricing`,
  `/contact` are still `PageSkeleton` placeholders — **this is
  intentional**, Rumen explicitly deferred filling them in
  ("после ще ги пълним със съдържание"). Don't "fix" this unprompted;
  wait for him to ask.
- `ContactSection`/`PricingSection`/`AutomationsSection` components
  already support a non-teaser (full page) render path for when that
  content does get filled in later.

## Installed tooling

- **Impeccable** (`.claude/skills/impeccable/`) — design-audit skill,
  62 deterministic "AI slop" detector rules + `/impeccable critique`
  (dual-sub-agent design review + detector), `/impeccable polish`,
  `/impeccable quieter`, etc. Snapshots persist to `.impeccable/critique/`.
  Latest run: **17/32** Design Health Score (2026-10-29,
  `.impeccable/critique/2026-10-29T18-53-15Z__localhost.md`) — all 5
  priority issues from that run are now fixed (see History). Re-run
  `/impeccable critique` to get an updated score before deciding what's
  next.
- **extract-design** (`.claude/skills/extract-design/`, wraps the
  `designlang` CLI) — pulls a *reference* site's design language
  (palette, type, spacing, radii, shadows). Its own Puppeteer browser
  can't reach external sites from this sandbox (constraint #4 above),
  so extraction has to go through Claude-in-Chrome + manual
  computed-style sampling instead of the automated `npx designlang`
  pipeline. Already used once against jeton.com; patterns from that run
  are now partially applied to the site (see History).
- **react-bits MCP** (`.mcp.json`, `reactbits-dev-mcp-server`, free/MIT,
  no API key) — exposes `list_components` / `get_component` /
  `search_components` / `get_component_demo` / `list_categories` for
  135+ animated React components from reactbits.dev. **Configured but
  not yet connected** — MCP servers only connect at session start, so
  this activates on the *next* fresh session in this repo, not
  mid-conversation. Not yet used to install anything.
- Considered but **not installed**: GSAP AI Skills (deferred, not
  requested again since).

## History (chronological, most recent first)

- Applied cyberninjas-derived *patterns* (not styling): `GoalsSection`
  (4 goal tabs -> concrete automation flow -> pricing/contact CTAs, ARIA
  tablist with arrow keys, CSS fade, no scroll-jacking) and `RoiCalculator`
  (hours/week x hourly value x automatable share vs the highlighted tier's
  build+monthly price parsed from content.ts; client-side only, honest
  "estimate, not a promise" note). Plus Onest font and `.edge-light`.
- Manually extracted cyberninjas.ai (direct BG competitor) design language
  via Claude-in-Chrome into `design-references/cyberninjas.md`. Reference
  only: its palette/Sofia Sans are deliberately NOT adopted (too close to a
  competitor); only section patterns (intent tabs, ROI-style analyzer) are
  candidates.
- Added `reactbits` MCP server config (free, no signup).
- Applied 3 jeton.com-derived design patterns: opacity-based `--muted`,
  `font-semibold` headings sitewide, `.shadow-accent` on the highlighted
  pricing tier + hero dashboard mock. Also fixed an unrelated low-contrast
  advisory on `ContactForm` placeholders (browser-default gray instead
  of `--muted`).
- Installed `extract-design` skill; manually extracted jeton.com's
  design language via Claude-in-Chrome (automated CLI blocked by
  sandbox networking).
- Ran `/impeccable critique` on the whole site (dual-sub-agent: design
  review + detector). Score: 17/32. 5 priority issues found, all fixed
  one at a time per Rumen's request:
  1. **Mobile nav** — `SiteHeader` had no nav below `md:`. Added
     `MobileNav.tsx` (hamburger + slide panel).
  2. **Contact form** — was a bare `mailto:` link. Added
     `ContactForm.tsx`: validated name/email/message, success state,
     copy-to-clipboard email fallback. **Still routes through the
     visitor's own mail client** — a real backend send needs a free
     email API key (Resend/Formspree) from Rumen, not set up yet.
  3. **Hero motion overload** (8+ simultaneous animations) — deleted
     `FloatingShapes.tsx` (7 decorative looping SVGs), removed
     redundant `IdleFloat`-on-top-of-`ParallaxFloat` stacking on the
     two snippet cards, limited the sitewide particle canvas to home
     routes only via `SiteBackground.tsx` (was running fixed behind
     every page incl. empty skeletons).
  4. **No social proof** — Rumen confirmed no real client data exists
     yet, so **did not fabricate testimonials**. Added `TrustSection.tsx`
     instead: honest 3-step process + 3 already-true commitments
     (clear pricing, GDPR statement, 1-day response time).
  5. **Cursor opt-out** — `MouseDrone` forced `cursor: none` sitewide
     with no escape hatch. Added a small persistent toggle
     (bottom-right, low-opacity, localStorage-persisted).
- Installed Impeccable, fixed its first detector pass (12 findings:
  low-contrast accent color, fake `gradient-text`, `animate-pulse` dot,
  tiny text, orphan-word heading) — see earlier commits for details.
- Earlier: particle-field background, cursor-drone, scroll-fill
  headline + parallax hero cards (jeton.com-inspired, kept), a pinned
  automations stepper (tried, **explicitly rejected by Rumen, reverted
  — avoid pinned/scroll-jacking effects on that section again** unless
  he asks for it specifically).

Full detail for any of the above: `git log` (commit messages are
written to be self-explanatory) and `.impeccable/critique/*.md`.

## Open / deferred items (don't start these unprompted)

- Real backend email send for the contact form (needs Rumen to get a
  free Resend/Formspree key).
- Filling in `/automations`, `/pricing`, `/contact` real content
  (explicitly deferred by Rumen).
- Using the react-bits MCP to actually install any component (just
  configured, nothing pulled in yet).
- Re-running `/impeccable critique` to measure score improvement since
  17/32 (all 5 priority issues from that run are fixed, worth a fresh
  pass before picking the next thing).
