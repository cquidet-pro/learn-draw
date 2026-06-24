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

const STYLE = `
:root{color-scheme:light}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  color:#3a2e24;background:#fff7e6;line-height:1.55;-webkit-text-size-adjust:100%}
.wrap{max-width:760px;margin:0 auto;padding:20px 18px 60px}
a{color:#c8552b}
header a.brand{font-weight:800;font-size:1.25rem;text-decoration:none;color:#3a2e24}
nav.crumbs{font-size:.85rem;margin:14px 0 6px;color:#8a7a68}
nav.crumbs a{color:#8a7a68}
h1{font-size:1.9rem;line-height:1.15;margin:.2em 0 .35em}
.badge{display:inline-block;background:#ffe1a8;color:#7a5a17;border-radius:999px;
  padding:3px 12px;font-size:.8rem;font-weight:700}
.picture{display:block;width:min(340px,80vw);height:auto;margin:18px auto;
  background:#fff;border:3px solid #ffd166;border-radius:24px;padding:10px}
a.cta{display:block;max-width:420px;margin:18px auto;text-align:center;
  background:#ffd166;color:#3a2e24;font-weight:800;font-size:1.15rem;
  text-decoration:none;padding:16px 22px;border-radius:18px}
a.cta:hover{background:#ffc94d}
ol.steps{padding-left:1.2em}
ol.steps li{margin:.45em 0;font-size:1.08rem}
h2{margin-top:1.8em}
ul.more{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:10px}
ul.more a{display:inline-block;background:#fff;border:2px solid #ffd166;
  border-radius:14px;padding:8px 14px;text-decoration:none;color:#3a2e24;font-weight:600}
.sib{margin:.4em 0 .2em}
footer{margin-top:40px;font-size:.85rem;color:#8a7a68}
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
  const siblingsHtml = siblings.length
    ? `<p class="sib">Also try drawing ${art} ${esc(name)} at another level: ${siblings
        .map(
          (a) =>
            `<a href="/draw/${a.id}/">${LEVEL_LABEL[drawingLevel(a)]}</a>`,
        )
        .join(" · ")}</p>`
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
      <header><a class="brand" href="/">🎨 Learn 2 Draw</a></header>
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> › How to draw ${art} ${esc(name)}
      </nav>
      <span class="badge">${levelLabel}</span>
      <h1>How to draw ${art} ${esc(name)} ${animal.emoji ? esc(animal.emoji) : ""}</h1>
      ${previewSvg(animal, previewStrokes, previewFills)}
      <a class="cta" href="/?d=${animal.id}">▶ Draw this ${esc(name)} step by step</a>
      <p>
        Follow along and learn how to draw ${art} ${esc(name)}, step by step. This
        ${levelLabel.toLowerCase()} drawing for kids is broken into ${n} easy steps, and in the
        app each step shows the lines drawing themselves so children can copy along.
        It's completely free, with no sign-up and no ads.
      </p>
      ${siblingsHtml}
      <h2>Steps to draw ${art} ${esc(name)}</h2>
      <ol class="steps">
${stepsHtml}
      </ol>
      <h2>More things to draw</h2>
      <ul class="more">
${moreHtml}
      </ul>
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
