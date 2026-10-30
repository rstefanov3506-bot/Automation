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

- Dark mode base is **Nox Night** from the brand guidelines: `--background`
  `#0a0d12`, `--surface` `#141922` (blue-tinted night, deliberately not
  cyberninjas' green-black). Contrast checked: text 17.8:1, muted 7.8:1,
  accent 10.1:1 on background. Light mode unchanged.
- **Palette = "Nox Sunrise"** (chosen by Rumen 2026-10-30, replacing the
  emerald look he found too dull): `--accent` orange `#c2410c` light /
  `#ff8a4c` dark (`--accent-contrast` `#fff` / `#1a0b02`); aurora blobs
  orange + pink `rgba(236,72,153)` + violet `rgba(139,92,246)`. All AA:
  dark accent 8.3:1 on bg, ink on accent button 8.2:1, light accent 5.0:1 on
  paper, white on light accent 5.2:1. Re-check contrast before any change.
- `--muted` is the foreground ink at reduced opacity
  (`rgba(fg, 0.68)` light / `0.65` dark), **not** a separate gray hex —
  jeton.com-inspired single-ink pattern, same contrast as before (~7:1).
- Hero h1 is plain solid text (the old ScrollFillHeading outline-until-scroll
  effect was deleted: it made the key line hard to read).
- `.gradient-text` is a **solid** accent color, not an actual gradient
  (deliberate — gradient-clip text reads as generic AI-template
  polish). Misleading class name, intentionally kept.
- `.shadow-accent` is a soft two-layer brand-tinted shadow
  (`rgba(var(--accent-rgb), 0.25/0.15)`) for the one or two elements
  that should read as the "lifted focal point" (highlighted pricing
  tier, hero dashboard mock) — don't apply it everywhere, it's meant to
  be rare.
- Headings h1-h3: **Rubik Variable** via `--font-display`
  (`@fontsource-variable/rubik`), warmer/rounder, normal Bulgarian letterforms.
  Unbounded was tried and rejected - with lang="bg" it renders Bulgarian
  cursive-style forms and the hero line became unreadable.
- Body font: **Onest Variable**, self-hosted via `@fontsource-variable/onest`
  (imported in `layout.tsx`, first in `--font-sans`). Chosen for proper
  Cyrillic; deliberately not Sofia Sans (cyberninjas' signature). Not
  `next/font/google` - that fetches from Google at build time, which the
  sandbox blocks.
- `--pop` `#a78bfa` / `--pop-contrast` `#1e1033` (both themes, Tailwind
  `bg-pop text-pop-contrast`, 6.6:1): rare secondary accent, replaced the
  amber `--ember` once orange became the main accent. Used ONLY on the pricing
  "most popular" badge. Fill only, never as text on light (2.6:1).
- Mono: **JetBrains Mono Variable** (`@fontsource-variable/jetbrains-mono`,
  `--font-mono`). Functional only: `.label-mono` (uppercase 12px 500
  +0.08em) for eyebrows, plus step numbers (01-04), dashboard title,
  statuses and timestamps in the hero mock. Never for headings or body.
- `.edge-light` = 1px inset top highlight on cards (light/dark variants,
  combined variant with `.shadow-accent`). Applied to automations/trust
  cards, hero dashboard, goals panel, ROI card. Do not add it to elements
  using Tailwind `ring-*` (both use box-shadow, they clobber each other).
- Headings (`h1/h2/h3`) are `font-semibold` (600) sitewide, not
  `font-bold` — hierarchy comes from size. Price/stat *figures* (not
  headings) keep `font-bold` for emphasis.

## Brand assets

- Logo (Path N draft): `brand/logo/` - SVG symbol/lockup (dark+light),
  favicon SVGs: `noxlytics-favicon.svg` (full 3-node symbol on a rounded
  Nox Night tile, Rumen's choice) and `noxlytics-favicon-16.svg` (simplified N
  for the 16px frame only - hybrid agreed 2026-10-30), preview PNG; rebuild with
  `node brand/logo/generate.mjs <outdir>` (needs opentype.js +
  @fontsource/onest in a scratch dir). Still a draft pending Rumen's sign-off
  (open question: drop the bottom-left node so it reads less like a note).
- On-site logo: `src/components/LogoMark.tsx` - inline, theme-aware SVG
  (line = currentColor, result node = `--accent`, hollow nodes filled with
  `--background`) + lowercase `noxlytics` text in Onest, used in
  `SiteHeader` (28px) and `SiteFooter` (20px). Keep its geometry in sync with
  `brand/logo/generate.mjs` if the symbol changes.
- Share/icons: `node brand/og/generate.mjs` (repo root) renders
  `src/app/opengraph-image.png`, `src/app/en/opengraph-image.png`,
  `apple-icon.png` (opaque tile, iOS needs it), `src/app/icon.svg` = copy of
  `brand/logo/noxlytics-favicon-adaptive.svg` (TRANSPARENT, Rumen's request
  2026-10-30; follows the browser theme via prefers-color-scheme inside the
  SVG, hollow nodes cut with a mask) and `favicon.ico` = transparent raster
  fallback in light-theme colors. This supersedes the earlier hybrid
  tile/simplified-16px favicon. Re-run after any logo change. Root layout sets `metadataBase` from `NEXT_PUBLIC_SITE_URL`, falling
  back to Vercel's production URL - set that env var when the domain is live.

## Site structure

- Hero visual is `FlowHero.tsx`: a 2D-canvas "automation run" along the Path N
  logo (trigger -> agent -> result), cycling 3 scenarios from `content.flow`.
  Replaced the static dashboard mock + its parallax cards (IdleFloat,
  TiltCard, ParallaxFloat deleted). Budget rules: no libs/assets, particle
  count scales with panel area, DPR<=2, stops off-screen/tab hidden (verified
  0 redraws off-screen), reduced-motion = static finished frame, re-reads
  theme colors on toggle. Keep its N geometry in sync with LogoMark.
- Perf lesson (measured): animated `filter: blur()` blobs + `backdrop-filter`
  over them were the hero's real cost (15 fps in software render vs 39 after).
  Aurora blobs are now radial gradients (`.aurora-blob`); don't reintroduce
  big animated blur filters or backdrop blur over moving layers.
- Hero is `min-h-[88svh]` (was full screen), columns 1.1fr/0.9fr, flow panel
  capped at 420px. Background particle field (`HeroParticles`) is theme-aware:
  stronger alpha in light mode (was invisible there), re-reads on toggle.
- `IntegrationsMarquee` (right under the hero): two pure-CSS infinite rows in
  opposite directions (track holds the list twice, slides -50%; verified
  seamless), hover pauses, edge fade mask, reduced-motion = static wrapped
  chips. Deliberately labelled "tools we connect" (NOT client logos - we have
  no clients yet, same honesty rule as testimonials) and rendered as our own
  name chips, no third-party logo artwork. Dot colors = AI (accent) /
  automation (pop) / business tools (muted), with a legend. Includes Econt,
  Speedy, Microinvest as local differentiators.
- Homepage order: Hero -> IntegrationsMarquee -> GoalsSection (intent tabs) -> Automations teaser
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
- **react-bits** (`.mcp.json`, `reactbits-dev-mcp-server`, MIT + Commons
  Clause: free to use inside our sites, not to resell the components
  themselves). Tested 2026-10-30: the MCP server starts and its catalogue
  tools work (`list_categories`, `list_components`, `search_components`),
  but `get_component` fails - it pulls code via the unauthenticated GitHub
  API, which is rate-limited from this sandbox's shared IP, and its
  reactbits.dev scraper fallback is blocked by egress. It accepts
  `GITHUB_TOKEN` / `GITHUB_PERSONAL_ACCESS_TOKEN` env if ever needed.
  **Working path, no token:** shallow `git clone
  https://github.com/DavidHDev/react-bits` into scratchpad and copy from
  `src/ts-tailwind/<Category>/<Name>/<Name>.tsx`. Check each component's
  imports first: many need `motion/react`, `ogl`, `three` or
  `@hugeicons/react` - prefer zero-dependency ones or port to GSAP, which
  we already ship. Nothing installed into the site yet.
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
- Using react-bits to actually add a component (verified working via git
  clone; nothing added yet).
- Re-running `/impeccable critique` to measure score improvement since
  17/32 (all 5 priority issues from that run are fixed, worth a fresh
  pass before picking the next thing).
