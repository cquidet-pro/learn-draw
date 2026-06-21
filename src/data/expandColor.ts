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

function measureBottoms(ds: string[]): number[] {
  if (typeof document === "undefined") return ds.map(() => 0);
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
      return b.y + b.height;
    } catch {
      return 0;
    }
  });
  document.body.removeChild(svg);
  return out;
}

/** Hint shown on each colour step after the first. */
const NEXT_COLOR_HINT = "Now the next colour! 🖍️";

// Two fills whose colours are within this RGB distance are treated as "the same
// colour" and share a step — so near-identical shades (e.g. a dog's dark eyes
// #3a2a20 and dark nose #42301f) colour together instead of as two steps. Kept
// small so genuinely different colours stay separate.
const COLOR_MERGE = 36;

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

    // Cluster the painted fills by colour (near-identical shades share a step).
    const clusters: { rep: string; items: { f: Fill; i: number }[] }[] = [];
    for (const x of painted) {
      const c = clusters.find((cl) => colorDist(cl.rep, x.f.color) <= COLOR_MERGE);
      if (c) c.items.push(x);
      else clusters.push({ rep: x.f.color, items: [x] });
    }

    // A single colour and no paper to convert — leave the step exactly as-is.
    if (clusters.length === 1 && papers.length === 0) {
      steps.push(step);
      continue;
    }

    changed = true;

    // Order the colour clusters bottom-to-top by their lowest-on-screen region.
    const bottoms = measureBottoms(fills.map((f) => f.d));
    const clusterBottom = (cl: (typeof clusters)[number]) =>
      Math.max(...cl.items.map((x) => bottoms[x.i]));
    clusters.sort((a, b) => clusterBottom(b) - clusterBottom(a));

    // Build each colour step's fill list, and remember which step a painted
    // fill (by its original index) ended up in.
    const stepFills: Fill[][] = clusters.map((cl) =>
      cl.items.map((x) => ({ d: x.f.d, color: x.f.color })),
    );
    const stepOfIndex = new Map<number, number>();
    clusters.forEach((cl, si) => cl.items.forEach((x) => stepOfIndex.set(x.i, si)));

    // Attach each paper region to the step of the colour directly beneath it
    // (the nearest earlier painted fill), drawn ON TOP as a paper-coloured hole
    // so that colour fills around it. A paper region under no colour is dropped.
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
        stepFills[bestStep].push({ d: pf.f.d, color: pf.f.color, paper: true });
      }
    }

    stepFills.forEach((fl, si) => {
      steps.push({
        hint: si === 0 ? step.hint : NEXT_COLOR_HINT,
        color: step.color,
        strokes: [],
        fills: fl,
      });
    });
  }

  return changed ? { ...animal, steps } : animal;
}
