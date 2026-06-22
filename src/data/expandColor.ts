import type { Animal, DrawStep } from "./animals";

// Splitting the single "color it in" step into one step PER COLOUR, so a child
// fills one crayon's worth at a time and presses on for the next colour — each
// colour is its own deliberate step rather than the whole picture flooding in.
//
// Colour groups are ordered bottom-to-top (the group whose lowest region sits
// lowest on screen first), so the big body/background colours before the little
// features stacked on top. Ordering needs real geometry, so we measure each
// fill's bounding box with an offscreen SVG (browser only; falls back to the
// authored order when there's no DOM).
//
// White is "paper". A child draws on a white sheet, so you never colour white on
// top of another colour — you colour AROUND it and leave the paper showing. So
// white fills never become their own colour step: an overlay white (e.g. the
// Swiss cross over red, a dog's eye sparkle over the dark eye) is shown as a
// paper-coloured "hole" on top of the colour beneath it, revealed with that
// colour's step so the child colours around it; a background white (e.g. a
// flag's white field) is simply dropped — the canvas already is the paper.

type Fill = { d: string; color: string; paper?: boolean };

function measureBoxes(ds: string[]): { bottom: number; area: number }[] {
  if (typeof document === "undefined") return ds.map(() => ({ bottom: 0, area: 0 }));
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 200 200");
  svg.style.cssText =
    "position:absolute;left:-9999px;top:-9999px;width:0;height:0;visibility:hidden";
  const path = document.createElementNS(NS, "path");
  svg.appendChild(path);
  document.body.appendChild(svg);
  const out = ds.map((d) => {
    try {
      path.setAttribute("d", d);
      const b = path.getBBox();
      return { bottom: b.y + b.height, area: Math.max(0, b.width) * Math.max(0, b.height) };
    } catch {
      return { bottom: 0, area: 0 };
    }
  });
  document.body.removeChild(svg);
  return out;
}

/** Hint shown on each colour step after the first. */
const NEXT_COLOR_HINT = "Now the next colour! 🖍️";

// Colours are merged into one step AND flattened to a single shade when they're
// "the same colour to a child". Near-identical shades always merge (small RGB
// distance). Beyond that we merge by PERCEPTION: same colour family (close hue)
// and not too far apart — so two subtle greens, or two pinks, become one, but a
// pink cheek on a tan face (different hue) and a brown ear on a tan head (far in
// RGB) stay their own colours. Tunable below.
const RGB_SAME = 36; // always-merge: basically the same hex
const HUE_SAME = 25; // degrees: within this hue, same colour family
const RGB_FAMILY = 80; // …and within this RGB distance, merge the family

// A fill this close to white counts as "paper" (left blank, not coloured).
const PAPER_DIST = 16;

function parseHex(c: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** RGB euclidean distance; Infinity if either colour isn't a parseable hex. */
function colorDist(a: string, b: string): number {
  if (a === b) return 0;
  const pa = parseHex(a);
  const pb = parseHex(b);
  if (!pa || !pb) return Infinity;
  return Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
}

/** Hue angle (0–360) of an RGB triple; 0 for greys. */
function hueOf([r, g, b]: [number, number, number]): number {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const d = mx - mn;
  if (d === 0) return 0;
  let h: number;
  if (mx === r) h = ((g - b) / d) % 6;
  else if (mx === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

/** Should these two fill colours be treated as the same colour (one step, one
 *  flat shade)? */
function sameColour(a: string, b: string): boolean {
  const d = colorDist(a, b);
  if (d <= RGB_SAME) return true;
  const pa = parseHex(a);
  const pb = parseHex(b);
  if (!pa || !pb) return false;
  let dh = Math.abs(hueOf(pa) - hueOf(pb));
  if (dh > 180) dh = 360 - dh;
  return dh < HUE_SAME && d < RGB_FAMILY;
}

const isPaper = (c: string) => colorDist(c, "#ffffff") <= PAPER_DIST;

/**
 * Return a copy of `animal` where every "color it in" step (no strokes, with
 * `fills`) is expanded into one step per colour, bottom-to-top, with white
 * treated as paper (see file header). Steps with a single colour and no white
 * are left untouched. Memoise the result per drawing — it touches the DOM.
 */
export function expandColorSteps(animal: Animal): Animal {
  let changed = false;
  const steps: DrawStep[] = [];

  for (const step of animal.steps) {
    const fills = step.fills;
    if (!(step.strokes.length === 0 && fills && fills.length > 0)) {
      steps.push(step);
      continue;
    }
    // Opt-out: keep layered emblems as one step so the per-colour reordering
    // can't paint a later colour over them (their authored stacking is correct).
    if (step.noSplit) {
      steps.push(step);
      continue;
    }

    // Separate the real colours from the "paper" (white) regions.
    const painted = fills
      .map((f, i) => ({ f, i }))
      .filter((x) => !isPaper(x.f.color));
    const papers = fills
      .map((f, i) => ({ f, i }))
      .filter((x) => isPaper(x.f.color));

    // Nothing to colour (all paper) — drop the step; the canvas is the paper.
    if (painted.length === 0) {
      changed = true;
      continue;
    }

    // Cluster the painted fills by colour (same-colour shades share a step).
    const clusters: { rep: string; items: { f: Fill; i: number }[] }[] = [];
    for (const x of painted) {
      const c = clusters.find((cl) => sameColour(cl.rep, x.f.color));
      if (c) c.items.push(x);
      else clusters.push({ rep: x.f.color, items: [x] });
    }

    const distinctColours = new Set(painted.map((x) => x.f.color)).size;
    // One colour already, nothing to flatten, no paper to convert — leave as-is.
    if (clusters.length === 1 && distinctColours === 1 && papers.length === 0) {
      steps.push(step);
      continue;
    }

    changed = true;

    // Measure geometry: bottom (for bottom-to-top order) and area (to pick each
    // cluster's dominant shade — the colour the whole group is flattened to).
    const boxes = measureBoxes(fills.map((f) => f.d));
    const clusterBottom = (cl: (typeof clusters)[number]) =>
      Math.max(...cl.items.map((x) => boxes[x.i].bottom));
    clusters.sort((a, b) => clusterBottom(b) - clusterBottom(a));

    // The dominant (largest-area) shade each cluster is flattened to, so subtle
    // variations of the same colour render as one flat colour.
    const dominant = (cl: (typeof clusters)[number]) =>
      cl.items.reduce((best, x) => (boxes[x.i].area > boxes[best.i].area ? x : best)).f
        .color;

    // Build each colour step's items, tracking each fill's ORIGINAL index so we
    // can restore authored stacking order within the step.
    const stepItems: { d: string; color: string; i: number; paper: boolean }[][] =
      clusters.map((cl) => {
        const col = dominant(cl);
        return cl.items.map((x) => ({ d: x.f.d, color: col, i: x.i, paper: false }));
      });
    const stepOfIndex = new Map<number, number>();
    clusters.forEach((cl, si) => cl.items.forEach((x) => stepOfIndex.set(x.i, si)));

    // Attach each paper region to the step of the colour directly beneath it
    // (the nearest earlier painted fill), so that colour fills around it. A paper
    // region under no colour is dropped (the canvas already is the paper).
    for (const pf of papers) {
      let bestIdx = -1;
      let bestStep = -1;
      for (const [idx, si] of stepOfIndex) {
        if (idx < pf.i && idx > bestIdx) {
          bestIdx = idx;
          bestStep = si;
        }
      }
      if (bestStep >= 0) {
        stepItems[bestStep].push({ d: pf.f.d, color: pf.f.color, i: pf.i, paper: true });
      }
    }

    stepItems.forEach((items, si) => {
      // Restore authored order WITHIN the step so stacking is preserved — e.g. a
      // white band stays under the maple leaf, the white cross under the red one.
      items.sort((a, b) => a.i - b.i);
      steps.push({
        hint: si === 0 ? step.hint : NEXT_COLOR_HINT,
        color: step.color,
        strokes: [],
        fills: items.map((it) =>
          it.paper ? { d: it.d, color: it.color, paper: true } : { d: it.d, color: it.color },
        ),
      });
    });
  }

  return changed ? { ...animal, steps } : animal;
}
