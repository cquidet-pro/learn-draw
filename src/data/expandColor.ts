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
      // Group fills by colour, remembering the order colours first appear.
      const order: string[] = [];
      const byColor = new Map<string, { d: string; color: string }[]>();
      for (const f of fills) {
        const arr = byColor.get(f.color);
        if (arr) arr.push(f);
        else {
          byColor.set(f.color, [f]);
          order.push(f.color);
        }
      }

      if (byColor.size <= 1) {
        steps.push(step);
        continue;
      }

      changed = true;
      // Lowest on-screen point per colour, to sort the groups bottom-to-top.
      const bottoms = measureBottoms(fills.map((f) => f.d));
      const colorBottom = new Map<string, number>();
      fills.forEach((f, i) => {
        const prev = colorBottom.get(f.color);
        if (prev === undefined || bottoms[i] > prev) colorBottom.set(f.color, bottoms[i]);
      });
      const colors = [...order].sort(
        (a, b) =>
          (colorBottom.get(b) ?? 0) - (colorBottom.get(a) ?? 0) ||
          order.indexOf(a) - order.indexOf(b),
      );

      colors.forEach((color, gi) => {
        steps.push({
          hint: gi === 0 ? step.hint : NEXT_COLOR_HINT,
          color: step.color,
          strokes: [],
          fills: byColor.get(color),
        });
      });
    } else {
      steps.push(step);
    }
  }

  return changed ? { ...animal, steps } : animal;
}
