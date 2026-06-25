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

type Fill = { d: string; color: string; paper?: boolean; hint?: string };

type Box = { x: number; y: number; w: number; h: number; bottom: number; area: number };
function measureBoxes(ds: string[]): Box[] {
  const empty = (): Box => ({ x: 0, y: 0, w: 0, h: 0, bottom: 0, area: 0 });
  if (typeof document === "undefined") return ds.map(empty);
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
      const w = Math.max(0, b.width);
      const h = Math.max(0, b.height);
      return { x: b.x, y: b.y, w, h, bottom: b.y + h, area: w * h };
    } catch {
      return empty();
    }
  });
  document.body.removeChild(svg);
  return out;
}

// Do two bounding boxes really overlap (not merely touch)? Used to decide
// stacking constraints, so a small overlap epsilon avoids false positives from
// regions that only share an edge (e.g. adjacent stripes).
function boxesOverlap(a: Box, b: Box): boolean {
  const e = 0.5;
  return a.x < b.x + b.w - e && b.x < a.x + a.w - e && a.y < b.y + b.h - e && b.y < a.y + a.h - e;
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

    const distinctColours = new Set(painted.map((x) => x.f.color)).size;
    // One colour and no paper to convert — leave the step untouched.
    if (distinctColours === 1 && papers.length === 0) {
      steps.push(step);
      continue;
    }

    changed = true;

    // Geometry of every fill (bbox + overlap test) for ordering and stacking.
    const boxes = measureBoxes(fills.map((f) => f.d));
    const overlaps = (i: number, j: number) => boxesOverlap(boxes[i], boxes[j]);

    // Cluster painted fills by colour, but start a NEW cluster for a colour when
    // a different-colour fill that OVERLAPS it was painted in between — otherwise
    // merging would drag a fill into an earlier step and invert the stacking
    // (e.g. a flag's shield is the same red as the field but sits over the badge).
    type Cluster = { rep: string; items: { f: Fill; i: number }[]; maxI: number };
    const clusters: Cluster[] = [];
    for (const x of painted) {
      let host: Cluster | undefined;
      for (let k = clusters.length - 1; k >= 0; k--) {
        if (!sameColour(clusters[k].rep, x.f.color)) continue;
        const blocked = painted.some(
          (g) =>
            g.i > clusters[k].maxI &&
            g.i < x.i &&
            !sameColour(g.f.color, x.f.color) &&
            overlaps(g.i, x.i),
        );
        host = blocked ? undefined : clusters[k];
        break;
      }
      if (host) {
        host.items.push(x);
        host.maxI = x.i;
      } else {
        clusters.push({ rep: x.f.color, items: [x], maxI: x.i });
      }
    }

    // The dominant (largest-area) shade each cluster is flattened to.
    const dominant = (cl: Cluster) =>
      cl.items.reduce((best, x) => (boxes[x.i].area > boxes[best.i].area ? x : best)).f.color;
    const clusterBottom = (cl: Cluster) =>
      Math.max(...cl.items.map((x) => boxes[x.i].bottom));

    // Order the clusters: cluster A must come BEFORE B if a fill of A sits under
    // (authored earlier than, and overlaps) a fill of B — so authored stacking is
    // preserved. Among clusters with no such constraint, colour the lowest one
    // first (bottom-to-top). Topological sort (Kahn) with that tiebreak.
    const N = clusters.length;
    const reqAfter: Set<number>[] = clusters.map(() => new Set<number>());
    const indeg = new Array(N).fill(0);
    for (let a = 0; a < N; a++) {
      for (let b = 0; b < N; b++) {
        if (a === b || reqAfter[a].has(b)) continue;
        const under = clusters[a].items.some((ia) =>
          clusters[b].items.some((ib) => ia.i < ib.i && overlaps(ia.i, ib.i)),
        );
        if (under) {
          reqAfter[a].add(b);
          indeg[b]++;
        }
      }
    }
    const order: number[] = [];
    const avail = new Set<number>();
    for (let k = 0; k < N; k++) if (indeg[k] === 0) avail.add(k);
    while (avail.size) {
      let pick = -1;
      let best = -Infinity;
      for (const k of avail) {
        const cb = clusterBottom(clusters[k]);
        if (cb > best) {
          best = cb;
          pick = k;
        }
      }
      avail.delete(pick);
      order.push(pick);
      for (const m of reqAfter[pick]) if (--indeg[m] === 0) avail.add(m);
    }
    for (let k = 0; k < N; k++) if (!order.includes(k)) order.push(k); // cycle safety

    const orderedClusters = order.map((k) => clusters[k]);
    const stepItems: { d: string; color: string; i: number; paper: boolean; hint?: string }[][] =
      orderedClusters.map((cl) => {
        const col = dominant(cl);
        return cl.items.map((x) => ({ d: x.f.d, color: col, i: x.i, paper: false, hint: x.f.hint }));
      });
    const stepOfIndex = new Map<number, number>();
    orderedClusters.forEach((cl, si) => cl.items.forEach((x) => stepOfIndex.set(x.i, si)));

    // Attach each paper region to the colour directly beneath it: the nearest
    // earlier painted fill that OVERLAPS it (fall back to nearest earlier by
    // index). A paper region under no colour is dropped — the canvas is paper.
    for (const pf of papers) {
      let bestOv = -1;
      let bestAny = -1;
      for (const idx of stepOfIndex.keys()) {
        if (idx >= pf.i) continue;
        if (idx > bestAny) bestAny = idx;
        if (idx > bestOv && overlaps(idx, pf.i)) bestOv = idx;
      }
      const host = bestOv >= 0 ? bestOv : bestAny;
      if (host >= 0) {
        const si = stepOfIndex.get(host)!;
        stepItems[si].push({ d: pf.f.d, color: pf.f.color, i: pf.i, paper: true });
      }
    }

    stepItems.forEach((items, si) => {
      // Restore authored order WITHIN the step so stacking is preserved — e.g. a
      // white band stays under the maple leaf, the white cross under the red one.
      items.sort((a, b) => a.i - b.i);
      // A fill can name its own colour step (e.g. Brazil's band text); otherwise
      // the first step keeps the authored hint and the rest say "next colour".
      const customHint = items.find((it) => it.hint)?.hint;
      steps.push({
        hint: customHint ?? (si === 0 ? step.hint : NEXT_COLOR_HINT),
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
