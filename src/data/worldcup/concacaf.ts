import type { Animal } from "../animals";
import {
  OUTLINE,
  L,
  R,
  T,
  B,
  W,
  H,
  RECT,
  n,
  frame,
  colorStep,
  flag,
  rectPath,
  star,
} from "../flags";

// CONCACAF (North/Central America & Caribbean) 2026 World Cup flags. Each flag
// is drawn in the same 3:2 box (L,T,R,B) as the rest of the collection: dark
// guide outlines animate first, then ONE colour step fills every region. The
// index applies `withName`, so do NOT add the name step here.

// ---------------------------------------------------------------------------
// Curaçao — blue field with a yellow horizontal stripe across the lower third
// and two white five-pointed stars in the upper-left (one bigger, one smaller).
// ---------------------------------------------------------------------------
const curacao = (() => {
  const BLUE = "#002B7F";
  const YELLOW = "#F9E814";
  // Yellow stripe across the lower third of the flag (full width).
  const stripeTop = T + (H * 5) / 6 - H / 12; // a band sitting in the lower third
  const sty0 = T + (H * 2) / 3 + 6; // top edge of the yellow band
  const stripe = rectPath(L, sty0, R, sty0 + H / 6);
  void stripeTop;
  // Two white stars in the upper-left: a bigger one, then a smaller one tucked
  // up and to the right of it.
  const bigStar = star(48, 78, 13);
  const smallStar = star(74, 64, 8);
  return flag(
    "flag-curacao",
    "Curaçao",
    "🇨🇼",
    [
      frame(),
      { hint: "Add a wide stripe across the bottom", color: OUTLINE, strokes: [stripe] },
      { hint: "Draw two white stars in the corner ⭐", color: OUTLINE, strokes: [bigStar, smallStar], strokeWidth: 0.7 },
      colorStep([
        { d: RECT, color: BLUE },
        { d: stripe, color: YELLOW },
        { d: bigStar, color: "#ffffff" },
        { d: smallStar, color: "#ffffff" },
      ]),
    ],
    "Curaçao's flag has two white stars.",
  );
})();

// ---------------------------------------------------------------------------
// Haiti — blue over red, with a small white panel in the centre holding a
// simplified coat of arms: a green palm tree on a little green mound.
// ---------------------------------------------------------------------------
const haiti = (() => {
  const BLUE = "#00209F";
  const RED = "#D21034";
  const GREEN = "#007A33";
  const midY = (T + B) / 2;
  const cx = 100;
  // White panel in the very centre.
  const panel = rectPath(cx - 26, midY - 22, cx + 26, midY + 22);
  // Little green mound the tree grows from.
  const mound = `M ${n(cx - 18)},${n(midY + 16)} Q ${cx},${n(midY + 9)} ${n(cx + 18)},${n(midY + 16)} L ${n(cx + 18)},${n(midY + 18)} L ${n(cx - 18)},${n(midY + 18)} Z`;
  // Palm trunk: a thin upright bar rising from the mound.
  const trunk = `M ${n(cx - 2)},${n(midY + 16)} L ${n(cx - 1.2)},${n(midY - 10)} L ${n(cx + 1.2)},${n(midY - 10)} L ${n(cx + 2)},${n(midY + 16)} Z`;
  // Palm fronds: arching leaves spreading from the top of the trunk.
  const ty = midY - 10;
  const fronds = [
    `M ${cx},${n(ty)} Q ${n(cx - 14)},${n(ty - 4)} ${n(cx - 22)},${n(ty + 4)} Q ${n(cx - 12)},${n(ty - 1)} ${cx},${n(ty)} Z`,
    `M ${cx},${n(ty)} Q ${n(cx + 14)},${n(ty - 4)} ${n(cx + 22)},${n(ty + 4)} Q ${n(cx + 12)},${n(ty - 1)} ${cx},${n(ty)} Z`,
    `M ${cx},${n(ty)} Q ${n(cx - 9)},${n(ty - 13)} ${n(cx - 15)},${n(ty - 14)} Q ${n(cx - 8)},${n(ty - 7)} ${cx},${n(ty)} Z`,
    `M ${cx},${n(ty)} Q ${n(cx + 9)},${n(ty - 13)} ${n(cx + 15)},${n(ty - 14)} Q ${n(cx + 8)},${n(ty - 7)} ${cx},${n(ty)} Z`,
    `M ${cx},${n(ty)} Q ${n(cx - 2)},${n(ty - 16)} ${cx},${n(ty - 19)} Q ${n(cx + 2)},${n(ty - 16)} ${cx},${n(ty)} Z`,
  ];
  return flag(
    "flag-haiti",
    "Haiti",
    "🇭🇹",
    [
      frame(),
      { hint: "Add a line across the middle", color: OUTLINE, strokes: [`M ${L},${n(midY)} L ${R},${n(midY)}`] },
      { hint: "Draw a little white box in the middle", color: OUTLINE, strokes: [panel] },
      { hint: "Draw a palm tree on a hill 🌴", color: OUTLINE, strokes: [mound, trunk, ...fronds], strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, R, midY), color: BLUE },
        { d: rectPath(L, midY, R, B), color: RED },
        { d: panel, color: "#ffffff" },
        { d: mound, color: GREEN },
        { d: trunk, color: GREEN },
        ...fronds.map((d) => ({ d, color: GREEN })),
      ]),
    ],
    "Haiti's flag has a palm tree in the middle.",
  );
})();

// ---------------------------------------------------------------------------
// Mexico — green / white / red vertical tricolour with a small emblem on the
// white: a simplified brown eagle perched on a green cactus pad.
// ---------------------------------------------------------------------------
const mexico = (() => {
  const GREEN = "#006847";
  const RED = "#CE1126";
  const BROWN = "#6b4423";
  const CACTUS = "#2e7d32";
  const v1 = L + W / 3;
  const v2 = L + (2 * W) / 3;
  const cx = 100,
    cy = 100;
  // Cactus pad: a low, wide green paddle the eagle perches on, plus a little
  // stem under it. Sits in the bottom half of the emblem (~cy+2 .. cy+15).
  const padCy = cy + 5;
  const pad = `M ${cx},${n(padCy - 7)} Q ${n(cx - 10)},${n(padCy - 6)} ${n(cx - 11)},${n(padCy)} Q ${n(cx - 11)},${n(padCy + 6)} ${cx},${n(padCy + 7)} Q ${n(cx + 11)},${n(padCy + 6)} ${n(cx + 11)},${n(padCy)} Q ${n(cx + 11)},${n(padCy - 6)} ${cx},${n(padCy - 7)} Z`;
  const stem = rectPath(cx - 2.5, padCy + 6, cx + 2.5, padCy + 12);
  // Eagle in side profile, facing LEFT, perched on top of the pad. Built as one
  // outline read head-first: a hooked beak and round head at the upper-left, a
  // dipped neck, an upswept wing peaking top-right, the wing tip curling down to
  // a pointed tail, then the rounded breast back up to the head. The neck dip and
  // wing peak give a clear head-vs-body shape (not a plain blob). (~26px wide.)
  const ey = cy; // feet rest just on top of the pad
  const eagle =
    `M ${n(cx - 14)},${n(ey - 13)} ` + // hooked beak tip (points left)
    `L ${n(cx - 10)},${n(ey - 16)} ` + // up to the brow
    `Q ${n(cx - 7)},${n(ey - 18)} ${n(cx - 5)},${n(ey - 15)} ` + // round head crown
    `Q ${n(cx - 4)},${n(ey - 12)} ${n(cx - 2)},${n(ey - 14)} ` + // neck dip (head/body break)
    `Q ${n(cx + 2)},${n(ey - 24)} ${n(cx + 8)},${n(ey - 21)} ` + // wing leading edge sweeping up
    `Q ${n(cx + 13)},${n(ey - 18)} ${n(cx + 10)},${n(ey - 11)} ` + // wing peak top-right
    `Q ${n(cx + 8)},${n(ey - 6)} ${n(cx + 11)},${n(ey - 3)} ` + // wing tip curling down
    `L ${n(cx + 7)},${n(ey - 1)} ` + // out to the tail tip
    `Q ${n(cx + 3)},${n(ey - 2)} ${cx},${n(ey - 4)} ` + // tail underside up to the feet
    `Q ${n(cx - 4)},${n(ey - 5)} ${n(cx - 6)},${n(ey - 9)} ` + // rounded breast
    `Q ${n(cx - 8)},${n(ey - 13)} ${n(cx - 11)},${n(ey - 12)} ` + // throat back to the head
    `Z`;
  return flag(
    "flag-mexico",
    "Mexico",
    "🇲🇽",
    [
      frame(),
      { hint: "Add 3 stripes up and down", color: OUTLINE, strokes: [`M ${n(v1)},${T} L ${n(v1)},${B}`, `M ${n(v2)},${T} L ${n(v2)},${B}`] },
      { hint: "Draw a little cactus in the middle 🌵", color: OUTLINE, strokes: [pad, stem], strokeWidth: 0.7 },
      { hint: "Add an eagle on top 🦅", color: OUTLINE, strokes: [eagle], strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, v1, B), color: GREEN },
        { d: rectPath(v1, T, v2, B), color: "#ffffff" },
        { d: rectPath(v2, T, R, B), color: RED },
        { d: pad, color: CACTUS },
        { d: stem, color: CACTUS },
        { d: eagle, color: BROWN },
      ]),
    ],
    "Mexico's flag has an eagle on a cactus.",
  );
})();

// ---------------------------------------------------------------------------
// Panama — four quarters split at the centre: top-left white (with a blue
// star), top-right red, bottom-left blue, bottom-right white (with a red star).
// ---------------------------------------------------------------------------
const panama = (() => {
  const BLUE = "#072357";
  const RED = "#DA121A";
  const cx = 100,
    cy = 100;
  const tl = rectPath(L, T, cx, cy);
  const tr = rectPath(cx, T, R, cy);
  const bl = rectPath(L, cy, cx, B);
  const br = rectPath(cx, cy, R, B);
  // A blue star centred in the top-left white quarter, a red star centred in
  // the bottom-right white quarter.
  const blueStar = star((L + cx) / 2, (T + cy) / 2, 16);
  const redStar = star((cx + R) / 2, (cy + B) / 2, 16);
  return flag(
    "flag-panama",
    "Panama",
    "🇵🇦",
    [
      frame(),
      {
        hint: "Split it into four boxes",
        color: OUTLINE,
        strokes: [`M ${cx},${T} L ${cx},${B}`, `M ${L},${cy} L ${R},${cy}`],
      },
      { hint: "Draw two stars ⭐", color: OUTLINE, strokes: [blueStar, redStar], strokeWidth: 0.7 },
      colorStep([
        { d: tl, color: "#ffffff" },
        { d: tr, color: RED },
        { d: bl, color: BLUE },
        { d: br, color: "#ffffff" },
        { d: blueStar, color: BLUE },
        { d: redStar, color: RED },
      ]),
    ],
    "Panama's flag has a blue star and a red star.",
  );
})();

export const concacafFlags: Animal[] = [curacao, haiti, mexico, panama];
