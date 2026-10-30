// Generates the Noxlytics "Path N" logo drafts.
// Symbol: the letter N drawn as one automation path with three nodes:
// trigger (bottom-left, hollow) -> agent (mid-diagonal, hollow) -> result (top-right, filled).
import fs from "node:fs";
import opentype from "opentype.js";

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const C = {
  dark: { bg: "#0A0D12", line: "#F2F4F7", accent: "#34D399" },
  light: { bg: "#FAFAF9", line: "#0A0A0A", accent: "#047857" },
};

// 24-unit grid. Verticals at x=6 and x=18, span y 5..19 -> diagonal ~49deg.
const P = { x1: 6, x2: 18, top: 5, bottom: 19 };
const mid = { x: (P.x1 + P.x2) / 2, y: (P.top + P.bottom) / 2 };

function symbol(t, { stroke = 2.5, node = 2.9, hollowStroke = 2 } = {}) {
  const d = `M${P.x1} ${P.bottom}V${P.top}L${P.x2} ${P.bottom}V${P.top}`;
  return [
    `<path d="${d}" fill="none" stroke="${t.line}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<circle cx="${P.x1}" cy="${P.bottom}" r="${node}" fill="${t.bg}" stroke="${t.line}" stroke-width="${hollowStroke}"/>`,
    `<circle cx="${mid.x}" cy="${mid.y}" r="${node}" fill="${t.bg}" stroke="${t.line}" stroke-width="${hollowStroke}"/>`,
    `<circle cx="${P.x2}" cy="${P.top}" r="${+(node + 0.3).toFixed(2)}" fill="${t.accent}"/>`,
  ].join("\n  ");
}

const svg = (vb, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${title}">\n  <title>${title}</title>\n  ${body}\n</svg>\n`;

// 1. Symbol, both themes (transparent background).
for (const [name, t] of Object.entries(C)) {
  fs.writeFileSync(`${OUT}/noxlytics-symbol-${name}.svg`, svg("0 0 24 24", symbol(t), "Noxlytics"));
}

// 2. Favicon: the full symbol (all three nodes) on a rounded Nox Night tile,
// as Rumen chose - same look as the apple icon. Scaled to 80% around the
// centre so the nodes keep clear of the tile edge.
{
  const t = C.dark;
  const body = [
    `<rect width="24" height="24" rx="5" fill="${t.bg}"/>`,
    `<g transform="translate(12 12) scale(0.8) translate(-12 -12)">\n  ${symbol(t)}\n  </g>`,
  ].join("\n  ");
  fs.writeFileSync(`${OUT}/noxlytics-favicon.svg`, svg("0 0 24 24", body, "Noxlytics"));
}

// 3. Lockup: symbol + "noxlytics" wordmark converted to outlines (Onest 600,
// tracking -0.02em), so it renders identically without the font installed.
const font = opentype.parse(
  fs.readFileSync(new URL("./node_modules/@fontsource/onest/files/onest-latin-600-normal.woff", import.meta.url)).buffer
);
const word = "noxlytics";
const S = 2; // symbol scale: 24 units -> 48px box
const span = (P.bottom - P.top) * S; // 28px from trigger to result node
const lBox = font.charToGlyph("l").getBoundingBox();
const fontSize = (span / (lBox.y2 / font.unitsPerEm)) * 1.02; // "l" ascender matches the path height
const scale = fontSize / font.unitsPerEm;
const tracking = -0.02 * fontSize;
const baseline = P.bottom * S;
const textX = 24 * S + 8;

let x = textX;
const parts = [];
const glyphs = font.stringToGlyphs(word);
glyphs.forEach((g, i) => {
  parts.push(g.getPath(x, baseline, fontSize).toPathData(2));
  const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) * scale : 0;
  x += g.advanceWidth * scale + kern + (i < glyphs.length - 1 ? tracking : 0);
});
const width = Math.ceil(x + 4);
const descender = Math.abs(font.charToGlyph("y").getBoundingBox().y1) * scale;
const height = Math.ceil(Math.max(24 * S, baseline + descender + 4));

for (const [name, t] of Object.entries(C)) {
  const body = [
    `<g transform="scale(${S})">\n  ${symbol(t)}\n  </g>`,
    `<path d="${parts.join("")}" fill="${t.line}"/>`,
  ].join("\n  ");
  fs.writeFileSync(`${OUT}/noxlytics-logo-${name}.svg`, svg(`0 0 ${width} ${height}`, body, "Noxlytics"));
}

console.log("lockup", width, "x", height, "fontSize", fontSize.toFixed(1));
