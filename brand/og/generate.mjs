// Renders the site's share image (Open Graph, 1200x630, bg + en) and the
// raster app icons from the logo SVGs, using the same self-hosted fonts as
// the site. Run from the repo root:
//   node brand/og/generate.mjs
// Needs Playwright (preinstalled globally in the build sandbox).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const globalRoot = execFileSync("npm", ["root", "-g"]).toString().trim();
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(globalRoot, "playwright"));

const nm = (p) => "file://" + path.join(root, "node_modules", p);
const logo = (f) => fs.readFileSync(path.join(root, "brand/logo", f), "utf8");

const copy = {
  bg: {
    label: "AI автоматизации за бизнеса",
    title: "Агенти, които работят",
    accent: "вместо теб",
    flow: ["Запитване", "Агент", "Резултат"],
    out: "src/app/opengraph-image.png",
  },
  en: {
    label: "AI automations for business",
    title: "Agents that work",
    accent: "for you",
    flow: ["Inquiry", "Agent", "Result"],
    out: "src/app/en/opengraph-image.png",
  },
};

const fonts = `
@font-face{font-family:Onest;font-weight:100 900;src:url(${nm("@fontsource-variable/onest/files/onest-cyrillic-wght-normal.woff2")}) format("woff2");unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}
@font-face{font-family:Onest;font-weight:100 900;src:url(${nm("@fontsource-variable/onest/files/onest-latin-wght-normal.woff2")}) format("woff2");unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2192}
@font-face{font-family:Mono;font-weight:100 800;src:url(${nm("@fontsource-variable/jetbrains-mono/files/jetbrains-mono-cyrillic-wght-normal.woff2")}) format("woff2");unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}
@font-face{font-family:Mono;font-weight:100 800;src:url(${nm("@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2")}) format("woff2");unicode-range:U+0000-00FF,U+2000-206F,U+2192}
`;

function ogHtml(c) {
  const flow = c.flow
    .map((s, i) => `<span class="chip ${i === c.flow.length - 1 ? "on" : ""}">${s}</span>`)
    .join('<span class="arrow">&rarr;</span>');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0A0D12;color:#F2F4F7;font-family:Onest;position:relative;overflow:hidden}
.glow{position:absolute;width:760px;height:760px;left:-260px;top:-360px;border-radius:50%;background:radial-gradient(closest-side,rgba(52,211,153,.22),transparent)}
.glow2{position:absolute;width:620px;height:620px;right:-160px;bottom:-320px;border-radius:50%;background:radial-gradient(closest-side,rgba(56,189,248,.10),transparent)}
.grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.07) 1px,transparent 0);background-size:32px 32px;-webkit-mask-image:radial-gradient(ellipse 70% 80% at 30% 40%,#000,transparent)}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.lockup svg{height:46px;width:auto;display:block}
.label{margin-top:auto;font-family:Mono;font-size:20px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#34D399}
h1{margin-top:18px;font-size:84px;line-height:1.02;font-weight:600;letter-spacing:-.03em;max-width:720px}
h1 em{font-style:normal;color:#34D399;white-space:nowrap}
.flow{margin-top:40px;display:flex;align-items:center;gap:14px;font-family:Mono;font-size:20px;font-weight:500}
.chip{padding:10px 18px;border-radius:999px;border:1.5px solid rgba(242,244,247,.16);color:rgba(242,244,247,.78);background:rgba(20,25,34,.8)}
.chip.on{border-color:#34D399;color:#052E22;background:#34D399}
.arrow{color:rgba(242,244,247,.4)}
.mark{position:absolute;right:84px;top:170px;width:250px;height:250px}
.mark svg{width:100%;height:100%}
</style></head><body>
<div class="glow"></div><div class="glow2"></div><div class="grid"></div>
<div class="mark">${logo("noxlytics-symbol-dark.svg")}</div>
<div class="wrap">
  <div class="lockup">${logo("noxlytics-logo-dark.svg")}</div>
  <div class="label">${c.label}</div>
  <h1>${c.title} <em>${c.accent}</em></h1>
  <div class="flow">${flow}</div>
</div></body></html>`;
}

// Square icon: symbol on Nox Night, with safe padding (iOS rounds the corners itself).
function iconHtml(size) {
  return `<!doctype html><html><head><style>*{margin:0}body{width:${size}px;height:${size}px;background:#0A0D12;display:grid;place-items:center}
svg{width:${Math.round(size * 0.72)}px;height:${Math.round(size * 0.72)}px}</style></head><body>${logo("noxlytics-symbol-dark.svg")}</body></html>`;
}

const tmp = fs.mkdtempSync(path.join(root, ".og-tmp-"));
const browser = await chromium.launch();
try {
  for (const c of Object.values(copy)) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    // Loaded from a file:// URL (not setContent) so the local font files are readable.
    const file = path.join(tmp, "og.html");
    fs.writeFileSync(file, ogHtml(c));
    await page.goto("file://" + file, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const ok = await page.evaluate(() => document.fonts.check('600 84px Onest') && document.fonts.check('500 20px Mono'));
    if (!ok) throw new Error("fonts did not load for " + c.out);
    await page.screenshot({ path: path.join(root, c.out) });
    await page.close();
    console.log("wrote", c.out);
  }

  const shot = async (size, out) => {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(iconHtml(size), { waitUntil: "load" });
    await page.screenshot({ path: out });
    await page.close();
  };
  await shot(180, path.join(root, "src/app/apple-icon.png"));
  console.log("wrote src/app/apple-icon.png");

  // Hybrid favicon.ico: the 16px frame (browser tab at 1x) is the simplified
  // N - the full symbol's nodes blur at that size; 32/48px frames carry the
  // full three-node symbol. Browsers pick the frame by size.
  const favFor = (s) => logo(s === 16 ? "noxlytics-favicon-16.svg" : "noxlytics-favicon.svg");
  for (const s of [16, 32, 48]) {
    const fav = favFor(s);
    const page = await browser.newPage({ viewport: { width: s, height: s } });
    await page.setContent(`<style>*{margin:0}body{background:transparent}svg{width:${s}px;height:${s}px;display:block}</style>${fav}`);
    await page.screenshot({ path: path.join(tmp, `f${s}.png`), omitBackground: true });
    await page.close();
  }
} finally {
  await browser.close();
}

// Minimal ICO container with the PNGs embedded as-is (16/32/48 only).
// No extra tool: an off-the-shelf converter upscaled to 256px (285 KB).
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size, 0); // width
    e.writeUInt8(size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}
const ico = buildIco([16, 32, 48].map((size) => ({ size, data: fs.readFileSync(path.join(tmp, `f${size}.png`)) })));
fs.writeFileSync(path.join(root, "src/app/favicon.ico"), ico);
// No icon.svg on purpose: browsers prefer an SVG icon over the ICO and would
// scale the full symbol down to 16px, defeating the hybrid.
fs.rmSync(path.join(root, "src/app/icon.svg"), { force: true });
fs.rmSync(tmp, { recursive: true, force: true });
console.log("wrote src/app/favicon.ico (16 simplified, 32/48 full)");
