// Pre-renders one static "How to draw X" landing page per drawing into
// dist/draw/<id>/index.html, plus a full sitemap.xml covering them all.
//
// Why: the app is a single client-rendered page, so search engines and non-JS
// AI crawlers see only one URL. These pages give every drawing its own real,
// indexable URL with genuine content (steps, a finished picture, HowTo schema,
// internal links) and target the long-tail "how to draw a <thing> for kids"
// queries the SPA can't rank for. Each page links into the app (`/?d=<id>`).
//
// The drawing data is loaded by bundling the real TypeScript with esbuild (no
// fragile text parsing), and the finished picture reuses the same
// previewStrokes/previewFills helpers as the in-app home cards — so the pages
// always match the actual drawings.

import { build } from "esbuild";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { tmpdir } from "node:os";

const ORIGIN = "https://learn2drawkids.com";
const DIST = resolve("dist");

// Difficulty icons, matching src/components/LevelSelector.tsx.
const LEVEL_ICON = { 5: "🌱", 7: "🌟", 10: "🔥" };

// --- load the real drawing data via esbuild -------------------------------
async function loadData() {
  const result = await build({
    stdin: {
      contents: `
        export { animals, previewStrokes, previewFills, drawingLevel, LEVEL_LABEL } from "./src/data/animals.ts";
        export { friendPool } from "./src/data/friends.ts";
      `,
      resolveDir: resolve("."),
      loader: "ts",
    },
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    // The friends graph transitively imports the masterpiece image assets; we
    // don't use the image values here, so stub them so the bundle resolves.
    loader: { ".jpg": "empty", ".jpeg": "empty", ".png": "empty", ".svg": "empty" },
  });
  const tmp = join(tmpdir(), `ld-seo-${Date.now()}-${process.pid}.mjs`);
  writeFileSync(tmp, result.outputFiles[0].text);
  try {
    return await import(pathToFileURL(tmp).href);
  } finally {
    rmSync(tmp, { force: true });
  }
}

// --- helpers --------------------------------------------------------------
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const article = (name) => (/^[aeiou]/i.test(name) ? "an" : "a");
// Safe to embed inside a <script type="application/ld+json"> block.
const jsonLd = (obj) =>
  JSON.stringify(obj, null, 2).replace(/</g, "\\u003c");

// A difficulty chip styled like the home page's level buttons. `current` marks
// this page's own level (highlighted, like the active selector button); `href`
// makes it a link to that level's page.
function lvlChip(level, label, opts = {}) {
  const inner = `<span class="lvl-ico">${LEVEL_ICON[level] ?? ""}</span> ${label}`;
  const cls = `lvl-chip${opts.current ? " current" : ""}`;
  return opts.href
    ? `<a class="${cls}" href="${opts.href}">${inner}</a>`
    : `<span class="${cls}">${inner}</span>`;
}

function previewSvg(animal, previewStrokes, previewFills) {
  const fills = previewFills(animal)
    .map((f) => `<path d="${f.d}" fill="${f.color}"/>`)
    .join("");
  const strokes = previewStrokes(animal)
    .map(
      (s) =>
        `<path d="${s.d}" fill="none" stroke="${s.color}" stroke-width="${s.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`,
    )
    .join("");
  return `<svg viewBox="${animal.viewBox}" xmlns="http://www.w3.org/2000/svg" class="picture" role="img" aria-label="A finished drawing of ${article(animal.name)} ${esc(animal.name)}">${fills}${strokes}</svg>`;
}

// Crayon palette + wordmark + mascot, matching src/components/Brand.tsx so the
// header on these pages is identical to the home page (and supports dark mode).
const PALETTE = ["#e63946", "#f4a300", "#06d6a0", "#118ab2", "#9b5de5"];
const WORDMARK = "Learn 2 Draw";
function brandLetters() {
  let ci = 0;
  return [...WORDMARK]
    .map((ch) =>
      ch === " "
        ? `<span class="brand-space"> </span>`
        : `<span style="color:${PALETTE[ci++ % PALETTE.length]}">${ch}</span>`,
    )
    .join("");
}
const MASCOT = `<svg class="brand-mascot" viewBox="0 0 60 76" role="img" aria-label="Learn 2 Draw crayon"><path d="M30,3 L41,22 L19,22 Z" fill="#fb8500" stroke="#3a2a20" stroke-width="2" stroke-linejoin="round"/><rect x="17" y="21" width="26" height="50" rx="7" fill="#ffd23f" stroke="#3a2a20" stroke-width="2"/><rect x="17" y="27" width="26" height="9" fill="#fff3c4" stroke="#3a2a20" stroke-width="1.5"/><ellipse cx="21" cy="54" rx="3" ry="2.2" fill="#ff9eb1"/><ellipse cx="39" cy="54" rx="3" ry="2.2" fill="#ff9eb1"/><circle cx="25" cy="49" r="2.4" fill="#3a2a20"/><circle cx="35" cy="49" r="2.4" fill="#3a2a20"/><path d="M25,55 Q30,60 35,55" fill="none" stroke="#3a2a20" stroke-width="2" stroke-linecap="round"/></svg>`;
const BRAND_HEADER = `<header class="brand">
        <a class="brand-row" href="/" aria-label="Learn 2 Draw — home">
          ${MASCOT}
          <span class="brand-name" aria-label="Learn 2 Draw">${brandLetters()}</span>
        </a>
        <span class="brand-stripes" aria-hidden="true"></span>
        <p class="brand-tagline">Let's learn to draw, step by step — a free drawing site for kids 💛</p>
      </header>`;

// Applies the saved/system theme before first paint (shares the home page's
// localStorage key so the choice carries across the whole site).
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("learn-draw:theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name=\\"theme-color\\"]');if(m)m.setAttribute("content",t==="dark"?"#181824":"#ffd166");}catch(e){}})();`;

const STYLE = `
:root{--bg:#fff8e7;--surface:#fff;--canvas:#fff;--accent:#ffd166;
  --ink:#3a3a55;--muted:#857a93;--link:#c8552b;color-scheme:light;
  font-family:"Comic Sans MS","Baloo 2","Trebuchet MS",system-ui,-apple-system,sans-serif}
[data-theme="dark"]{--bg:#181824;--surface:#262636;--canvas:#ece8dd;--accent:#ffd166;
  --ink:#ecebf6;--muted:#a89fba;--link:#ffc488;color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;font-family:inherit;color:var(--ink);background:var(--bg);
  line-height:1.55;-webkit-text-size-adjust:100%}
.wrap{max-width:760px;margin:0 auto;padding:14px 18px 60px}
a{color:var(--link)}
.brand{display:flex;flex-direction:column;align-items:center;margin:.5rem 0 1.3rem}
.brand-row{display:flex;align-items:center;gap:.5rem;text-decoration:none}
.brand-mascot{width:clamp(40px,9vw,60px);height:auto;transform-origin:50% 90%;
  animation:brand-wiggle 3.5s ease-in-out infinite}
.brand-name{margin:0;font-size:clamp(2.4rem,8vw,4rem);font-weight:800;letter-spacing:.01em;line-height:1}
.brand-name span{display:inline-block;transition:transform .15s ease}
.brand-row:hover .brand-name span{transform:translateY(-4px) rotate(-4deg)}
.brand-name .brand-space{display:inline;margin:0 .08em}
.brand-stripes{width:clamp(160px,40vw,280px);height:7px;margin-top:.45rem;border-radius:99px;
  background:linear-gradient(90deg,#e63946 0 20%,#f4a300 20% 40%,#06d6a0 40% 60%,#118ab2 60% 80%,#9b5de5 80% 100%)}
.brand-tagline{margin:.5rem 0 0;font-size:clamp(.95rem,2.6vw,1.2rem);font-weight:700;opacity:.85;text-align:center}
@keyframes brand-wiggle{0%,88%,100%{transform:rotate(0)}92%{transform:rotate(-7deg)}96%{transform:rotate(7deg)}}
@media (prefers-reduced-motion:reduce){.brand-mascot{animation:none}}
.pagehead{display:flex;align-items:center;flex-wrap:wrap;gap:6px 12px;margin:12px 0 2px}
.home-btn{display:inline-block;background:var(--accent);color:#2a2333;border:none;border-radius:999px;
  font-size:1.05rem;font-weight:700;padding:.45rem 1rem;text-decoration:none;font-family:inherit;
  box-shadow:0 4px 0 rgba(0,0,0,.12);line-height:1}
.home-btn:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(0,0,0,.12)}
.crumb-sep{color:var(--muted);font-size:1.1rem}
.pagehead h1{margin:0;font-size:1.3rem;line-height:1.2;font-weight:800;color:var(--ink)}
.lvl-chip{display:inline-flex;align-items:center;gap:5px;background:var(--surface);
  border:3px solid var(--accent);color:var(--ink);border-radius:14px;padding:2px 11px;
  font-size:.92rem;font-weight:800;text-decoration:none;box-shadow:0 3px 0 rgba(0,0,0,.08);line-height:1.5}
.lvl-chip .lvl-ico{font-size:1.2rem;line-height:1}
.lvl-chip.current{border-color:var(--accent-2);background:#fff0f4}
[data-theme="dark"] .lvl-chip.current{background:#3b2b39}
.picture{display:block;width:min(340px,80vw);height:auto;margin:18px auto;
  background:var(--canvas);border:3px solid var(--accent);border-radius:24px;padding:10px}
a.cta{display:block;max-width:420px;margin:18px auto;text-align:center;
  background:var(--accent);color:#2a2333;font-weight:800;font-size:1.15rem;
  text-decoration:none;padding:16px 22px;border-radius:18px}
a.cta:hover{filter:brightness(.96)}
ol.steps{padding-left:1.2em}
ol.steps li{margin:.45em 0;font-size:1.08rem}
h2{margin-top:1.8em}
ul.more{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:10px}
ul.more a{display:inline-block;background:var(--surface);border:2px solid var(--accent);
  border-radius:14px;padding:8px 14px;text-decoration:none;color:var(--ink);font-weight:600}
.levelrow{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:8px 0}
.sib{font-size:.95rem;color:var(--muted)}
.coffee-link{font-size:1.25em;text-decoration:none;vertical-align:-2px}
.more-facts{margin-top:14px;font-size:1.02rem}
footer{margin-top:40px;font-size:.85rem;color:var(--muted)}
`;

function pageHtml(animal, ctx) {
  const { drawings: animals, previewStrokes, previewFills, drawingLevel, LEVEL_LABEL } = ctx;
  const name = animal.name;
  const art = article(name);
  const lvl = drawingLevel(animal);
  const levelLabel = LEVEL_LABEL[lvl];
  const url = `${ORIGIN}/draw/${animal.id}/`;
  const steps = animal.steps.map((s) => s.hint).filter((h) => h && h.trim());
  const n = steps.length;

  const title = `How to Draw ${art} ${name} for Kids — ${levelLabel}, Step by Step | Learn 2 Draw`;
  const desc = `Learn how to draw ${art} ${name} for kids, step by step. A free ${levelLabel.toLowerCase()} tutorial in ${n} simple steps, with the lines drawing themselves so children can follow along. No sign-up, no ads.`;

  // Same subject at other difficulty levels.
  const siblings = animals
    .filter((a) => a.name === name && a.id !== animal.id)
    .sort((a, b) => drawingLevel(a) - drawingLevel(b));
  // A handful of other drawings at the same level, for internal linking.
  const more = animals
    .filter((a) => a.id !== animal.id && a.name !== name && drawingLevel(a) === lvl)
    .slice(0, 12);

  const stepsHtml = steps
    .map((h) => `      <li>${esc(h)}</li>`)
    .join("\n");
  const siblingsRow = siblings.length
    ? `<div class="levelrow"><span class="sib">Also try ${art} ${esc(name)} at another level:</span> ${siblings
        .map((a) =>
          lvlChip(drawingLevel(a), LEVEL_LABEL[drawingLevel(a)], { href: `/draw/${a.id}/` }),
        )
        .join(" ")}</div>`
    : "";
  const moreHtml = more
    .map(
      (a) =>
        `      <li><a href="/draw/${a.id}/">${a.emoji ? esc(a.emoji) + " " : ""}${esc(a.name)}</a></li>`,
    )
    .join("\n");

  const graph = jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: `How to draw ${art} ${name} for kids`,
        description: desc,
        image: `${ORIGIN}/og-image.png`,
        totalTime: "PT5M",
        estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
        supply: { "@type": "HowToSupply", name: "A web browser" },
        step: steps.map((h, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: `Step ${i + 1}`,
          text: h,
          url: `${url}#step-${i + 1}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Learn 2 Draw", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: `How to draw ${art} ${name}`, item: url },
        ],
      },
    ],
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ffd166" />
    <script>${THEME_SCRIPT}</script>
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Learn 2 Draw" />
    <meta property="og:title" content="${esc(`How to draw ${art} ${name} for kids, step by step`)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ORIGIN}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <style>${STYLE}</style>
    <script type="application/ld+json">
${graph}
    </script>
  </head>
  <body>
    <div class="wrap">
      ${BRAND_HEADER}
      <div class="pagehead" aria-label="Breadcrumb">
        <a class="home-btn" href="/" aria-label="Back to home">🏠 Home</a>
        <span class="crumb-sep" aria-hidden="true">›</span>
        <h1>How to draw ${art} ${esc(name)} ${animal.emoji ? esc(animal.emoji) : ""}</h1>
        ${lvlChip(lvl, levelLabel, { current: true })}
      </div>
      ${siblingsRow}
      ${previewSvg(animal, previewStrokes, previewFills)}
      <a class="cta" href="/?d=${animal.id}">▶ Draw this ${esc(name)} step by step</a>
      <p>
        Follow along and learn how to draw ${art} ${esc(name)}, step by step. This
        ${levelLabel.toLowerCase()} drawing for kids is broken into ${n} easy steps, and in the
        app each step shows the lines drawing themselves so children can copy along.
        It's completely free, with no sign-up and no ads — but you can buy us a
        <a class="coffee-link" href="https://buy.stripe.com/5kQ7sE4pQdjc2JGfrG8Zq00" target="_blank" rel="noopener noreferrer" aria-label="Buy us a coffee to support Learn 2 Draw">☕</a>,
        if you like and want to support the website.
      </p>
      <h2>Steps to draw ${art} ${esc(name)}</h2>
      <ol class="steps">
${stepsHtml}
      </ol>
      <h2>More things to draw</h2>
      <ul class="more">
${moreHtml}
        <li><a href="/?go=paintings">🖼️ Famous Paintings</a></li>
        <li><a href="/?go=flags">🏳️ Flags of the world</a></li>
      </ul>
      <p class="more-facts">You can also <a href="/?go=facts">💡 learn Fun Facts</a> about the animals and things you draw.</p>
      <footer>
        <p>
          <a href="/?d=${animal.id}">Open ${esc(name)} in Learn 2 Draw →</a> ·
          <a href="/">Back to all drawings</a>
        </p>
        <p>Learn 2 Draw is a free, ad-free way for young children to learn to draw, step by step.</p>
      </footer>
    </div>
  </body>
</html>
`;
}

// --- main -----------------------------------------------------------------
const data = await loadData();

// Regular leveled drawings + the reward-only "friend" drawings (fox, whale,
// …), deduped by id, so every registered subject gets its own page.
const byId = new Map();
for (const a of [...data.animals, ...(data.friendPool ?? [])]) {
  if (!byId.has(a.id)) byId.set(a.id, a);
}
const drawings = [...byId.values()];
const ctx = {
  drawings,
  previewStrokes: data.previewStrokes,
  previewFills: data.previewFills,
  drawingLevel: data.drawingLevel,
  LEVEL_LABEL: data.LEVEL_LABEL,
};

let count = 0;
for (const animal of drawings) {
  const dir = join(DIST, "draw", animal.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), pageHtml(animal, ctx));
  count++;
}

// Full sitemap: the home page (top priority) + every drawing page.
const urls = [
  { loc: `${ORIGIN}/`, priority: "1.0", changefreq: "weekly" },
  ...drawings.map((a) => ({
    loc: `${ORIGIN}/draw/${a.id}/`,
    priority: "0.8",
    changefreq: "monthly",
  })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

console.log(`[seo-pages] generated ${count} drawing pages + sitemap (${urls.length} urls)`);
