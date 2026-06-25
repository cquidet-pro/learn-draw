import type { Animal } from "../animals";
import {
  RECT,
  L,
  T,
  B,
  W,
  rectPath,
  frame,
  colorStep,
  flag,
  star,
  circle,
  crescent,
  striped,
} from "../flags";

// World Cup 2026 — second batch of African (CAF) qualifiers. Drawn in the same
// 3:2 flag box as every other flag (L,T,R,B / RECT). Coloured regions are
// outlined BEFORE the colour step; white counts as paper but is still authored.

// 1. Ivory Coast — vertical orange / white / green tricolour.
const ivoryCoast = striped(
  "flag-ivory-coast",
  "Ivory Coast",
  "🇨🇮",
  "v",
  [{ color: "#FF8200" }, { color: "#ffffff" }, { color: "#009E60" }],
  "Ivory Coast's flag is orange, white and green.",
);

// 2. Morocco — red field with a green five-point star (pentagram) centred.
const morocco = (() => {
  const moroStar = star(100, 100, 30);
  return flag(
    "flag-morocco",
    "Morocco",
    "🇲🇦",
    [
      frame(),
      { hint: "Draw a five-point star in the middle ⭐", color: "#3a3a55", strokes: [moroStar], strokeWidth: 0.7 },
      colorStep([
        { d: RECT, color: "#C1272D" },
        { d: moroStar, color: "#006233" },
      ]),
    ],
    "Morocco's flag has a green star.",
  );
})();

// 3. Senegal — green / yellow / red vertical tricolour with a green star on the
// yellow middle band.
const senegal = (() => {
  const senStar = star(100, 100, 22);
  // Three equal vertical bands.
  const b1 = L + W / 3,
    b2 = L + (2 * W) / 3;
  return flag(
    "flag-senegal",
    "Senegal",
    "🇸🇳",
    [
      frame(),
      {
        hint: "Add 3 stripes up and down",
        color: "#3a3a55",
        strokes: [`M ${b1},${T} L ${b1},${B}`, `M ${b2},${T} L ${b2},${B}`],
      },
      { hint: "Draw a five-point star in the middle ⭐", color: "#3a3a55", strokes: [senStar], strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, b1, B), color: "#00853F" },
        { d: rectPath(b1, T, b2, B), color: "#FDEF42" },
        { d: rectPath(b2, T, L + W, B), color: "#E31B23" },
        { d: senStar, color: "#00853F" },
      ]),
    ],
    "Senegal's flag has a green star.",
  );
})();

// 4. South Africa — the famous Y / pall flag. Built from clean polygons stacked
// largest-first: red top band + blue bottom band, then the gold (outermost),
// white (middle) and green (inner) Y bands painted over each other, then a black
// triangle at the hoist. The Y is a horizontal arm to the fly plus two diagonal
// arms reaching the top- and bottom-hoist corners; each colour band is one
// non-self-intersecting hexagon traced around its outer edge.
const southAfrica = (() => {
  const cy = (T + B) / 2; // 100
  const hx = L; // hoist x = 10
  const fx = L + W; // fly x = 190 (RECT right edge)
  // The Y converges on the centre line ~2/5 in from the hoist.
  const fork = hx + W * 0.42; // ~85.6

  // A pall band of half-width hw, as ONE hexagon. Trace: down the upper diagonal
  // arm's TOP edge (offset outward) from the hoist-top corner to where it meets
  // the horizontal arm's top edge near the fork, straight to the fly along the
  // horizontal top edge, down the fly, back along the horizontal bottom edge,
  // out the lower diagonal arm's BOTTOM edge to the hoist-bottom corner, then up
  // the hoist edge to close. The diagonal arm's outer-edge endpoints are the box
  // corners shifted out along the arm's perpendicular; the corner where the
  // diagonal top edge meets the horizontal top edge (y = cy − hw) is found by
  // extending the diagonal's centre line and shifting.
  const slopeDX = fork - hx; // run of the upper diagonal centre line
  const slopeDY = cy - T; // rise of the upper diagonal centre line
  const len = Math.hypot(slopeDX, slopeDY);
  const pall = (hw: number) => {
    // Perpendicular to the upper diagonal, pointing up-and-left (outer side):
    // px is negative (left), py negative (up).
    const px = (-slopeDY / len) * hw,
      py = (slopeDX / len) * hw * -1;
    // The upper arm's TOP edge is the centre line (hx,T)→(fork,cy) shifted by
    // (px,py). It would start left of the frame, so clamp it to the frame's left
    // edge x = hx: find the t where x = hx, take the y there. This makes the band
    // enter cleanly at the hoist edge instead of poking outside.
    const t0 = -px / slopeDX; // (hx - (hx+px)) / slopeDX
    const upHoistY = T + py + t0 * slopeDY;
    // Where that top edge meets the horizontal arm's top edge (y = cy − hw):
    const k = (cy - hw - (T + py)) / slopeDY;
    const apexTopX = hx + px + slopeDX * k;
    return [
      `M ${hx},${upHoistY}`, // upper arm top edge, at the frame's left edge
      `L ${apexTopX},${cy - hw}`, // up to the horizontal top edge near the fork
      `L ${fx},${cy - hw}`, // along the horizontal arm top edge to the fly
      `L ${fx},${cy + hw}`, // down the fly
      `L ${apexTopX},${cy + hw}`, // back along the horizontal bottom edge
      `L ${hx},${2 * cy - upHoistY}`, // lower arm bottom edge, at the frame's left edge
      "Z",
    ].join(" ");
  };

  const gold = 5; // gold fimbriation thickness
  const white = 4; // white fimbriation thickness (between green and the fields)
  const gw = 13; // green band half-width
  const greenPall = pall(gw);
  const whitePall = pall(gw + white);
  const goldPall = pall(gw + white + gold);

  // Black hoist triangle: base on the hoist, apex just inside the green Y's tip.
  const blackTip = fork - (gw + white + gold);
  const blackTri = `M ${hx},${T} L ${blackTip},${cy} L ${hx},${B} Z`;

  // Red top field and blue bottom field (the Y + black triangle paint on top).
  const redRegion = rectPath(L, T, L + W, cy);
  const blueRegion = rectPath(L, cy, L + W, B);

  return flag(
    "flag-south-africa",
    "South Africa",
    "🇿🇦",
    [
      frame(),
      // The Y-shaped band (outline its outer gold edge).
      { hint: "Draw a sideways Y across the flag", color: "#3a3a55", strokes: [goldPall] },
      // Black triangle at the hoist.
      { hint: "Draw a triangle at the left edge 🔺", color: "#3a3a55", strokes: [blackTri] },
      colorStep([
        { d: redRegion, color: "#E03C31" },
        { d: blueRegion, color: "#002395" },
        { d: goldPall, color: "#FFB915" }, // gold edge (outermost)
        { d: whitePall, color: "#ffffff" }, // white edge (middle)
        { d: greenPall, color: "#007749" }, // green Y (innermost)
        { d: blackTri, color: "#000000" }, // black hoist triangle, on top
      ]),
    ],
    "South Africa's flag has six colours in a Y shape.",
  );
})();

// 5. Tunisia — red field, white centre circle, with a red crescent (opens right)
// and a red five-point star inside the circle.
const tunisia = (() => {
  const cx = 100,
    cy = 100;
  const disc = circle(cx, cy, 30);
  // Crescent: centred a little left of the disc centre, opening right.
  const cres = crescent(cx - 4, cy, 17, 9, 14);
  // Star sits to the right, inside the crescent's opening.
  const tunStar = star(cx + 12, cy, 11);
  return flag(
    "flag-tunisia",
    "Tunisia",
    "🇹🇳",
    [
      frame(),
      { hint: "Draw a big circle in the middle ⭕", color: "#3a3a55", strokes: [disc] },
      { hint: "Draw a crescent moon 🌙", color: "#3a3a55", strokes: [cres] },
      { hint: "Add a five-point star ⭐", color: "#3a3a55", strokes: [tunStar], strokeWidth: 0.7 },
      colorStep([
        { d: RECT, color: "#E70013" },
        { d: disc, color: "#ffffff" },
        { d: cres, color: "#E70013" },
        { d: tunStar, color: "#E70013" },
      ]),
    ],
    "Tunisia's flag has a red moon and star in a white circle.",
  );
})();

export const caf2Flags: Animal[] = [ivoryCoast, morocco, senegal, southAfrica, tunisia];
