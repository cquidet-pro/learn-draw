import type { Animal } from "../animals";
import {
  OUTLINE,
  L,
  R,
  T,
  B,
  H,
  RECT,
  n,
  frame,
  colorStep,
  flag,
  rectPath,
  plusOutline,
  star,
  crescent,
  clipPoly,
  diagBand,
  type Pt,
} from "../flags";

// World Cup 2026 — UEFA (Europe) flags: Bosnia and Herzegovina, Croatia, Czech
// Republic, England, Scotland, Turkey. Same conventions as flags.ts: frame
// first, every coloured region outlined as a guide stroke BEFORE the single
// colour step (white = paper, still listed as a fill), tiny stars get a thin
// 0.7px stroke so their white shows. Crosses use ONE plusOutline; saltires use
// diagBand clipped to RECT, drawn in the saltire colour so guide lines vanish.

const toPath = (poly: Pt[]) =>
  "M " + poly.map(([x, y]) => `${n(x)},${n(y)}`).join(" L ") + " Z";
const BOX: Pt[] = [
  [L, T],
  [R, T],
  [R, B],
  [L, B],
];

// ---------------------------------------------------------------------------
// Bosnia and Herzegovina — blue field, a yellow right-triangle along the TOP
// edge, and a diagonal line of small white stars along the hypotenuse.
// ---------------------------------------------------------------------------
const bosnia = (() => {
  // Authentic geometry (from the official SVG): yellow right-triangle with its
  // top-left point at (58,T), along the top to (148,T), down to (148,B). The
  // right side sits at x=148, so a blue strip stays on the right (the rightmost
  // ~quarter) — as on the real flag. Hypotenuse runs (58,T) → (148,B).
  const triangle = toPath([
    [58, T],
    [148, T],
    [148, B],
  ]);
  // Nine white stars running ALONG the hypotenuse from top-left to bottom-right,
  // on the BLUE side just lower-left of the line (official offset), evenly spaced
  // and all fully inside the flag.
  const starCentres: Pt[] = [
    [47, 47],
    [57, 60],
    [67, 74],
    [77, 87],
    [87, 100],
    [97, 113],
    [107, 126],
    [117, 140],
    [127, 153],
  ];
  const stars: string[] = starCentres.map(([sx, sy]) => star(sx, sy, 6));
  return flag(
    "flag-bosnia-and-herzegovina",
    "Bosnia and Herzegovina",
    "🇧🇦",
    [
      frame(),
      { hint: "Draw a big yellow triangle 🔺", color: OUTLINE, strokes: [triangle] },
      { hint: "Add a line of little stars ⭐", color: "#ffffff", strokes: stars, strokeWidth: 0.6 },
      colorStep([
        { d: RECT, color: "#002395" },
        { d: triangle, color: "#FECB00" },
        ...stars.map((d) => ({ d, color: "#ffffff" })),
      ]),
    ],
    "Bosnia's flag has a yellow triangle and white stars.",
  );
})();

// ---------------------------------------------------------------------------
// Croatia — red / white / blue horizontal tricolour with a checkerboard shield.
// ---------------------------------------------------------------------------
const croatia = (() => {
  const t1 = T + H / 3;
  const t2 = T + (2 * H) / 3;
  // Shield centred on (100,100): ~26px wide, square top, pointed bottom.
  const cx = 100,
    sw = 13, // half-width (26px wide)
    top = 86,
    shoulder = 104,
    bot = 122;
  const shield = `M ${n(cx - sw)},${n(top)} L ${n(cx + sw)},${n(top)} L ${n(cx + sw)},${n(shoulder)} Q ${n(cx + sw)},${n(bot - 2)} ${n(cx)},${n(bot)} Q ${n(cx - sw)},${n(bot - 2)} ${n(cx - sw)},${n(shoulder)} Z`;
  // A small red band above the shield, standing in for the crown of shields.
  const crown = rectPath(cx - sw, top - 4, cx + sw, top);
  // 5x5 checkerboard inside the shield's upper rectangular part (top..shoulder),
  // continued into the pointed tip. We tile the full bounding box and clip each
  // cell to the shield polygon so the check follows the point.
  const shieldPoly: Pt[] = [
    [cx - sw, top],
    [cx + sw, top],
    [cx + sw, shoulder],
    [cx, bot],
    [cx - sw, shoulder],
  ];
  const cols = 5,
    rows = 5;
  const cw = (2 * sw) / cols;
  const chh = (bot - top) / rows;
  const redCells: string[] = [];
  const whiteCells: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = cx - sw + c * cw;
      const y0 = top + r * chh;
      const cell: Pt[] = [
        [x0, y0],
        [x0 + cw, y0],
        [x0 + cw, y0 + chh],
        [x0, y0 + chh],
      ];
      const clipped = clipPoly(cell, shieldPoly);
      if (clipped.length < 3) continue;
      const d = toPath(clipped);
      // Top-left cell is red on the real Croatian checkerboard.
      if ((r + c) % 2 === 0) redCells.push(d);
      else whiteCells.push(d);
    }
  }
  return flag(
    "flag-croatia",
    "Croatia",
    "🇭🇷",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`] },
      { hint: "Draw a shield in the middle 🛡️", color: OUTLINE, strokes: [crown, shield] },
      { hint: "Fill it with a checkerboard ▩", color: OUTLINE, strokes: redCells, strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, R, t1), color: "#FF0000" },
        { d: rectPath(L, t1, R, t2), color: "#ffffff" },
        { d: rectPath(L, t2, R, B), color: "#171796" },
        { d: crown, color: "#d10000" },
        // White shield base first, then the red checks on top; the white squares
        // are the paper shield showing through.
        { d: shield, color: "#ffffff" },
        ...whiteCells.map((d) => ({ d, color: "#ffffff" })),
        ...redCells.map((d) => ({ d, color: "#d10000" })),
      ]),
    ],
    "Croatia's flag has a red-and-white checkerboard.",
  );
})();

// ---------------------------------------------------------------------------
// Czech Republic — white top, red bottom, blue triangle from the hoist.
// ---------------------------------------------------------------------------
const czechia = (() => {
  const midY = (T + B) / 2; // 100
  const split = `M ${L},${n(midY)} L ${R},${n(midY)}`;
  // Blue triangle: hoist corners (L,T) and (L,B) meeting at the centre (100,100).
  const triangle = toPath([
    [L, T],
    [100, 100],
    [L, B],
  ]);
  return flag(
    "flag-czech-republic",
    "Czech Republic",
    "🇨🇿",
    [
      frame(),
      { hint: "Add a line across the middle", color: OUTLINE, strokes: [split] },
      { hint: "Draw a triangle from the side 🔺", color: OUTLINE, strokes: [triangle] },
      colorStep([
        { d: rectPath(L, T, R, midY), color: "#ffffff" },
        { d: rectPath(L, midY, R, B), color: "#D7141A" },
        { d: triangle, color: "#11457E" },
      ]),
    ],
    "The Czech flag has a blue triangle.",
  );
})();

// ---------------------------------------------------------------------------
// England — white field, red St George cross (one plus-shaped outline).
// ---------------------------------------------------------------------------
const england = (() => {
  const cx = 100,
    cy = (T + B) / 2; // 100
  const hw = 7; // half-width => 14px bar
  const vbar = rectPath(cx - hw, T, cx + hw, B);
  const hbar = rectPath(L, cy - hw, R, cy + hw);
  // ONE plus outline so the bars don't leave a boxed-in square where they cross.
  const cross = plusOutline(cx - hw, cx + hw, T, B, L, R, cy - hw, cy + hw);
  return flag(
    "flag-england",
    "England",
    "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    [
      frame(),
      { hint: "Draw a big red cross ✚", color: OUTLINE, strokes: [cross] },
      colorStep([
        { d: RECT, color: "#ffffff" },
        { d: vbar, color: "#CE1124" },
        { d: hbar, color: "#CE1124" },
      ]),
    ],
    "England's flag is a red cross.",
  );
})();

// ---------------------------------------------------------------------------
// Scotland — blue field with a white St Andrew saltire (diagonal X).
// ---------------------------------------------------------------------------
const scotland = (() => {
  const hw = 6.5; // half-width => ~13px band
  const d1 = toPath(clipPoly(diagBand([L, T], [R, B], hw), BOX));
  const d2 = toPath(clipPoly(diagBand([R, T], [L, B], hw), BOX));
  return flag(
    "flag-scotland",
    "Scotland",
    "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    [
      frame(),
      // Drawn in white so the guide lines vanish into the white saltire fill.
      { hint: "Draw a big white X corner to corner ╳", color: "#ffffff", strokes: [d1, d2] },
      colorStep([
        { d: RECT, color: "#005EB8" },
        { d: d1, color: "#ffffff" },
        { d: d2, color: "#ffffff" },
      ]),
    ],
    "Scotland's flag is a white X on blue.",
  );
})();

// ---------------------------------------------------------------------------
// Turkey — red field with a white crescent (opens right) and a white star.
// ---------------------------------------------------------------------------
const turkey = (() => {
  // Crescent left-of-centre, opening toward the fly (right).
  const cres = crescent(88, 100, 26, 13, 21);
  // Five-point star to the right of the crescent's opening.
  const st = star(120, 100, 12);
  return flag(
    "flag-turkey",
    "Turkey",
    "🇹🇷",
    [
      frame(),
      { hint: "Draw a crescent moon 🌙", color: OUTLINE, strokes: [cres] },
      { hint: "Add a star ⭐", color: OUTLINE, strokes: [st], strokeWidth: 0.7 },
      colorStep([
        { d: RECT, color: "#E30A17" },
        { d: cres, color: "#ffffff" },
        { d: st, color: "#ffffff" },
      ]),
    ],
    "Turkey's flag has a white moon and star.",
  );
})();

export const uefaFlags: Animal[] = [bosnia, croatia, czechia, england, scotland, turkey];
