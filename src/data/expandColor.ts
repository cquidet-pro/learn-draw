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

/**
 * Return a copy of `animal` where every "color it in" step (no strokes, 2+
 * colours of `fills`) is expanded into one step per colour, bottom-to-top. A
 * step with a single colour, or no fills, is left untouched. Memoise the result
 * per drawing — it touches the DOM to measure.
 */
export function expandColorSteps(animal: Animal): Animal {
  let changed = false;
  const steps: DrawStep[] = [];

  for (const step of animal.steps) {
    const fills = step.fills;
    if (step.strokes.length === 0 && fills && fills.length > 0) {
      // Greedily cluster fills by colour: a fill joins the first cluster whose
      // representative colour is within COLOR_MERGE, else it starts a new one.
      // Each fill keeps its own colour; only the *grouping into steps* merges.
      const clusters: { rep: string; fills: { d: string; color: string }[] }[] = [];
      for (const f of fills) {
        const c = clusters.find((cl) => colorDist(cl.rep, f.color) <= COLOR_MERGE);
        if (c) c.fills.push(f);
        else clusters.push({ rep: f.color, fills: [f] });
      }

      if (clusters.length <= 1) {
        steps.push(step);
        continue;
      }

      changed = true;
      // Lowest on-screen point per fill, to sort the clusters bottom-to-top.
      const bottoms = measureBottoms(fills.map((f) => f.d));
      const bottomOf = new Map<{ d: string; color: string }, number>();
      fills.forEach((f, i) => bottomOf.set(f, bottoms[i]));
      const clusterBottom = (cl: (typeof clusters)[number]) =>
        Math.max(...cl.fills.map((f) => bottomOf.get(f) ?? 0));
      // Stable sort keeps authored order among equal-bottom clusters.
      clusters.sort((a, b) => clusterBottom(b) - clusterBottom(a));

      clusters.forEach((cl, gi) => {
        steps.push({
          hint: gi === 0 ? step.hint : NEXT_COLOR_HINT,
          color: step.color,
          strokes: [],
          fills: cl.fills,
        });
      });
    } else {
      steps.push(step);
    }
  }

  return changed ? { ...animal, steps } : animal;
}
