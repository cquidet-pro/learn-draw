import type { DrawStep } from "./animals";

// Capital-letter "handwriting" used by the hard-mode "write the name" finale.
// Each glyph is defined in a unit box (x: 0→1 left→right, y: 0→1 top→bottom)
// as one or more pen-strokes in natural writing order. `nameStep` lays a word
// out as a row of SVG path strings at a given size/position, so the letters
// draw themselves one pen-stroke at a time like everything else in the app.

type Cmd = (string | number)[]; // ["M",x,y] | ["L",x,y] | ["Q",cx,cy,x,y]
interface Glyph {
  /** advance width as a fraction of the cap height */
  wf: number;
  /** strokes, each a list of commands in unit coordinates */
  s: Cmd[][];
}

// A monoline capital alphabet. Only the letters used by the drawing names are
// defined; add more here if a new name needs them.
const GLYPHS: Record<string, Glyph> = {
  A: { wf: 0.64, s: [[["M", 0, 1], ["L", 0.5, 0]], [["M", 0.5, 0], ["L", 1, 1]], [["M", 0.18, 0.62], ["L", 0.82, 0.62]]] },
  B: { wf: 0.62, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 0, 0], ["Q", 0.92, 0, 0.92, 0.26], ["Q", 0.92, 0.5, 0, 0.5]], [["M", 0, 0.5], ["Q", 1, 0.5, 1, 0.75], ["Q", 1, 1, 0, 1]]] },
  C: { wf: 0.66, s: [[["M", 0.95, 0.22], ["Q", 0.7, 0, 0.42, 0.05], ["Q", 0, 0.12, 0, 0.5], ["Q", 0, 0.88, 0.42, 0.95], ["Q", 0.7, 1, 0.95, 0.78]]] },
  D: { wf: 0.68, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 0, 0], ["Q", 0.95, 0.05, 0.95, 0.5], ["Q", 0.95, 0.95, 0, 1]]] },
  E: { wf: 0.6, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 0, 0], ["L", 0.85, 0]], [["M", 0, 0.5], ["L", 0.62, 0.5]], [["M", 0, 1], ["L", 0.85, 1]]] },
  F: { wf: 0.58, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 0, 0], ["L", 0.85, 0]], [["M", 0, 0.5], ["L", 0.62, 0.5]]] },
  G: { wf: 0.7, s: [[["M", 0.95, 0.22], ["Q", 0.7, 0, 0.42, 0.05], ["Q", 0, 0.12, 0, 0.5], ["Q", 0, 0.88, 0.45, 0.95], ["Q", 0.9, 1, 0.92, 0.6], ["L", 0.92, 0.55], ["L", 0.6, 0.55]]] },
  H: { wf: 0.68, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 1, 0], ["L", 1, 1]], [["M", 0, 0.5], ["L", 1, 0.5]]] },
  I: { wf: 0.24, s: [[["M", 0.5, 0], ["L", 0.5, 1]]] },
  J: { wf: 0.5, s: [[["M", 0.72, 0], ["L", 0.72, 0.72], ["Q", 0.72, 1, 0.36, 1], ["Q", 0.04, 1, 0, 0.74]]] },
  K: { wf: 0.64, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 0.95, 0], ["L", 0, 0.52]], [["M", 0.28, 0.5], ["L", 0.95, 1]]] },
  L: { wf: 0.56, s: [[["M", 0, 0], ["L", 0, 1], ["L", 0.82, 1]]] },
  M: { wf: 0.84, s: [[["M", 0, 1], ["L", 0, 0], ["L", 0.5, 0.6], ["L", 1, 0], ["L", 1, 1]]] },
  N: { wf: 0.72, s: [[["M", 0, 1], ["L", 0, 0], ["L", 1, 1], ["L", 1, 0]]] },
  O: { wf: 0.72, s: [[["M", 0.5, 0], ["Q", 0, 0, 0, 0.5], ["Q", 0, 1, 0.5, 1], ["Q", 1, 1, 1, 0.5], ["Q", 1, 0, 0.5, 0]]] },
  P: { wf: 0.6, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 0, 0], ["Q", 0.92, 0, 0.9, 0.28], ["Q", 0.86, 0.54, 0, 0.54]]] },
  Q: { wf: 0.74, s: [[["M", 0.5, 0], ["Q", 0, 0, 0, 0.5], ["Q", 0, 1, 0.5, 1], ["Q", 1, 1, 1, 0.5], ["Q", 1, 0, 0.5, 0]], [["M", 0.6, 0.64], ["L", 0.98, 1.02]]] },
  R: { wf: 0.64, s: [[["M", 0, 0], ["L", 0, 1]], [["M", 0, 0], ["Q", 0.92, 0, 0.9, 0.27], ["Q", 0.86, 0.52, 0, 0.52]], [["M", 0.32, 0.52], ["L", 0.95, 1]]] },
  S: { wf: 0.6, s: [[["M", 0.9, 0.2], ["Q", 0.68, 0, 0.4, 0.05], ["Q", 0.06, 0.12, 0.16, 0.36], ["Q", 0.26, 0.52, 0.6, 0.56], ["Q", 0.96, 0.62, 0.84, 0.86], ["Q", 0.66, 1.02, 0.1, 0.84]]] },
  T: { wf: 0.62, s: [[["M", 0, 0], ["L", 1, 0]], [["M", 0.5, 0], ["L", 0.5, 1]]] },
  U: { wf: 0.68, s: [[["M", 0, 0], ["L", 0, 0.68], ["Q", 0, 1, 0.5, 1], ["Q", 1, 1, 1, 0.68], ["L", 1, 0]]] },
  V: { wf: 0.64, s: [[["M", 0, 0], ["L", 0.5, 1], ["L", 1, 0]]] },
  W: { wf: 0.86, s: [[["M", 0, 0], ["L", 0.25, 1], ["L", 0.5, 0.4], ["L", 0.75, 1], ["L", 1, 0]]] },
  X: { wf: 0.64, s: [[["M", 0, 0], ["L", 1, 1]], [["M", 1, 0], ["L", 0, 1]]] },
  Y: { wf: 0.62, s: [[["M", 0, 0], ["L", 0.5, 0.55], ["L", 1, 0]], [["M", 0.5, 0.55], ["L", 0.5, 1]]] },
  Z: { wf: 0.62, s: [[["M", 0, 0], ["L", 1, 0], ["L", 0, 1], ["L", 1, 1]]] },
  "-": { wf: 0.5, s: [[["M", 0.12, 0.54], ["L", 0.6, 0.54]]] },
};

const GAP = 0.18; // default space between letters, as a fraction of cap height
const SPACE = 0.45; // width of a blank space, as a fraction of cap height
const STROKE = 3; // letters read better a little thinner than the 4px drawing

const r = (n: number) => Math.round(n * 10) / 10;

function glyphStrokes(g: Glyph, ox: number, oy: number, lw: number, H: number): string[] {
  return g.s.map((stroke) =>
    stroke
      .map((cmd) => {
        const t = cmd[0] as string;
        const nums = cmd.slice(1) as number[];
        const pairs: string[] = [];
        for (let i = 0; i < nums.length; i += 2) {
          pairs.push(`${r(ox + nums[i] * lw)},${r(oy + nums[i + 1] * H)}`);
        }
        return `${t} ${pairs.join(" ")}`;
      })
      .join(" "),
  );
}

interface NameOpts {
  /** horizontal centre of the word (default 100) */
  cx?: number;
  /** baseline (bottom of the letters) in viewBox units (default 192) */
  baseline?: number;
  /** target cap height; shrunk automatically if the word is too wide */
  height?: number;
  /** widest the word may be before it is scaled down (default 184) */
  maxWidth?: number;
  /** extra space between letters, as a fraction of cap height (default 0.18) */
  gap?: number;
  color?: string;
  hint?: string;
}

/**
 * Build a "write the name" DrawStep: the given word rendered as capital letters
 * that draw themselves one pen-stroke at a time. Spelt-out letters appear in
 * the hint so a grown-up (or the voice) can read them aloud.
 */
export function nameStep(word: string, opts: NameOpts = {}): DrawStep {
  // Strip accents so e.g. Curaçao → CURACAO (we only have plain A–Z glyphs).
  const text = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  const { cx = 100, baseline = 192, height = 20, maxWidth = 184, gap = GAP, color = "#118ab2", hint } = opts;
  const chars = [...text];

  // Total width (at unit height) to centre the word and fit it to maxWidth.
  let widthFactor = 0;
  chars.forEach((c, i) => {
    widthFactor += c === " " ? SPACE : GLYPHS[c]?.wf ?? SPACE;
    if (i < chars.length - 1) widthFactor += gap;
  });
  const H = widthFactor * height > maxWidth ? maxWidth / widthFactor : height;

  const totalW = widthFactor * H;
  let x = cx - totalW / 2;
  const topY = baseline - H;

  const strokes: string[] = [];
  for (const c of chars) {
    const g = GLYPHS[c];
    const lw = (c === " " ? SPACE : g?.wf ?? SPACE) * H;
    if (g) strokes.push(...glyphStrokes(g, x, topY, lw, H));
    x += lw + gap * H;
  }

  const spelt = chars.map((c) => (c === " " ? "·" : c)).join("-");
  return { hint: hint ?? `Last of all, write the name: ${spelt}! ✏️`, color, strokes, strokeWidth: STROKE };
}
