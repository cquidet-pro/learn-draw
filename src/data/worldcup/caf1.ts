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
  star,
  crescent,
  diagBand,
  clipPoly,
  type Pt,
} from "../flags";

// World Cup 2026 — CAF (Africa) group 1: Algeria, Cape Verde, DR Congo, Egypt,
// Ghana. Same conventions as flags.ts: frame first, every coloured region is
// outlined as a guide stroke BEFORE the single colour step, tiny emblems get a
// thin stroke so their white shows.

const algeria = (() => {
  // Vertical split at the centre (x=100): green hoist, white fly.
  const cx = 100;
  const split = `M ${n(cx)},${T} L ${n(cx)},${B}`;
  // A red crescent straddling the split, opening to the right (toward the fly).
  const cres = crescent(cx, 100, 22, 12, 20);
  // A red five-point star in the crescent's opening, to its right.
  const st = star(cx + 16, 100, 11);
  return flag(
    "flag-algeria",
    "Algeria",
    "🇩🇿",
    [
      frame(),
      { hint: "Add a line down the middle", color: OUTLINE, strokes: [split] },
      { hint: "Draw a crescent moon 🌙", color: OUTLINE, strokes: [cres] },
      { hint: "Add a star ⭐", color: OUTLINE, strokes: [st] },
      colorStep([
        { d: rectPath(L, T, cx, B), color: "#006233" },
        { d: rectPath(cx, T, R, B), color: "#ffffff" },
        { d: cres, color: "#D21034" },
        { d: st, color: "#D21034" },
      ]),
    ],
    "Algeria's flag has a red moon and star.",
  );
})();

const capeVerde = (() => {
  // Blue field with a horizontal white/red/white band, and a ring of 10 yellow
  // stars. Per the official flag the ring centre sits LEFT of centre and BELOW
  // mid-height, with the stripe band passing through that same centre and the
  // ring reaching almost to the bottom edge. Ring centre (74, 124): left of the
  // x=100 midline and well below the T..B middle (100); the lowest star's bottom
  // lands at y=158, nearly touching the bottom (B=160).
  const ringCx = 74;
  const ringCy = 124;
  const ringR = 28;
  // Stripe band is centred on the ring centre (the stripes pass through it).
  const bandCy = ringCy;
  const redHalf = 5; // half-height of the red middle stripe
  const whiteH = 10; // thickness of each white stripe
  const redTop = bandCy - redHalf;
  const redBot = bandCy + redHalf;
  const whiteTop0 = redTop - whiteH;
  const whiteBot1 = redBot + whiteH;
  // Band guide lines (the four dividers between blue / white / red / white / blue).
  const lines = [whiteTop0, redTop, redBot, whiteBot1].map(
    (y) => `M ${L},${n(y)} L ${R},${n(y)}`,
  );
  // A ring of 10 small yellow stars on the circle (one star points straight up).
  const stars = Array.from({ length: 10 }, (_, i) => {
    const a = (-90 + i * 36) * (Math.PI / 180);
    return star(ringCx + ringR * Math.cos(a), ringCy + ringR * Math.sin(a), 6);
  });
  return flag(
    "flag-cape-verde",
    "Cape Verde",
    "🇨🇻",
    [
      frame(),
      { hint: "Add a band across the bottom half", color: OUTLINE, strokes: lines },
      // Stars drawn in the field's own blue so they show on the still-white
      // canvas while the child draws, then vanish into the YELLOW star fill
      // (some stars sit on the white stripes, where a blue guide would show — so
      // the guide is drawn in the stars' own yellow). Thin stroke keeps them crisp.
      { hint: "Add 10 little stars in a circle ⭐", color: "#F7D116", strokes: stars, strokeWidth: 0.7 },
      colorStep([
        { d: RECT, color: "#003893" },
        { d: rectPath(L, whiteTop0, R, redTop), color: "#ffffff" },
        { d: rectPath(L, redTop, R, redBot), color: "#CF2027" },
        { d: rectPath(L, redBot, R, whiteBot1), color: "#ffffff" },
        ...stars.map((d) => ({ d, color: "#F7D116" })),
      ]),
    ],
    "Cape Verde's flag has ten yellow stars in a circle.",
  );
})();

const drCongo = (() => {
  // Sky-blue field with a wide red diagonal stripe from bottom-left to top-right,
  // edged by thin yellow borders: a yellow band behind a slightly narrower red
  // band along (L,B)->(R,T).
  const p0: Pt = [L, B];
  const p1: Pt = [R, T];
  const toPath = (poly: Pt[]) =>
    "M " + poly.map(([x, y]) => `${n(x)},${n(y)}`).join(" L ") + " Z";
  // Clip the (extended) bands to the flag box so they don't poke past corners.
  const box: Pt[] = [
    [L, T],
    [R, T],
    [R, B],
    [L, B],
  ];
  const yellowBand = toPath(clipPoly(diagBand(p0, p1, 18), box));
  const redBand = toPath(clipPoly(diagBand(p0, p1, 12), box));
  // A yellow five-point star in the top-left corner.
  const st = star(40, 70, 12);
  return flag(
    "flag-dr-congo",
    "DR Congo",
    "🇨🇩",
    [
      frame(),
      { hint: "Draw a wide stripe corner to corner", color: OUTLINE, strokes: [yellowBand] },
      { hint: "Add a thinner stripe inside it", color: OUTLINE, strokes: [redBand] },
      { hint: "Add a star in the top corner ⭐", color: OUTLINE, strokes: [st] },
      colorStep([
        { d: RECT, color: "#007FFF" },
        { d: yellowBand, color: "#F7D618" },
        { d: redBand, color: "#CE1021" },
        { d: st, color: "#F7D618" },
      ]),
    ],
    "DR Congo's flag has a yellow star and a red stripe.",
  );
})();

const egypt = (() => {
  // Horizontal tricolour red / white / black, with a small gold eagle (the
  // Eagle of Saladin, simplified to a clean symmetric bird) centred on the white.
  const t1 = T + H / 3;
  const t2 = T + (2 * H) / 3;
  const cx = 100;
  const cy = (t1 + t2) / 2; // centre of the white band
  // A small symmetric gold bird: a head + body teardrop, two spread wings, a
  // little shield on the chest, and a fanned tail — all ~22px wide overall.
  const body = `M ${n(cx)},${n(cy - 9)} Q ${n(cx + 3)},${n(cy - 2)} ${n(cx + 2)},${n(cy + 4)} L ${n(cx - 2)},${n(cy + 4)} Q ${n(cx - 3)},${n(cy - 2)} ${n(cx)},${n(cy - 9)} Z`;
  const wingR = `M ${n(cx + 2)},${n(cy - 5)} Q ${n(cx + 9)},${n(cy - 7)} ${n(cx + 11)},${n(cy - 1)} Q ${n(cx + 7)},${n(cy - 1)} ${n(cx + 8)},${n(cy + 3)} Q ${n(cx + 4)},${n(cy)} ${n(cx + 2)},${n(cy + 1)} Z`;
  const wingL = `M ${n(cx - 2)},${n(cy - 5)} Q ${n(cx - 9)},${n(cy - 7)} ${n(cx - 11)},${n(cy - 1)} Q ${n(cx - 7)},${n(cy - 1)} ${n(cx - 8)},${n(cy + 3)} Q ${n(cx - 4)},${n(cy)} ${n(cx - 2)},${n(cy + 1)} Z`;
  const tail = `M ${n(cx - 3)},${n(cy + 4)} L ${n(cx + 3)},${n(cy + 4)} L ${n(cx + 2)},${n(cy + 9)} L ${n(cx)},${n(cy + 7)} L ${n(cx - 2)},${n(cy + 9)} Z`;
  const shield = `M ${n(cx - 2)},${n(cy + 1)} L ${n(cx + 2)},${n(cy + 1)} L ${n(cx + 2)},${n(cy + 4)} L ${n(cx)},${n(cy + 6)} L ${n(cx - 2)},${n(cy + 4)} Z`;
  const eagle = [body, wingL, wingR, tail, shield];
  return flag(
    "flag-egypt",
    "Egypt",
    "🇪🇬",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`] },
      { hint: "Draw a little eagle in the middle 🦅", color: OUTLINE, strokes: eagle, strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, R, t1), color: "#CE1126" },
        { d: rectPath(L, t1, R, t2), color: "#ffffff" },
        { d: rectPath(L, t2, R, B), color: "#000000" },
        ...eagle.map((d) => ({ d, color: "#C09300" })),
      ]),
    ],
    "Egypt's flag has a golden eagle.",
  );
})();

const ghana = (() => {
  // Horizontal tricolour red / yellow / green, with a black five-point star
  // centred on the yellow band.
  const t1 = T + H / 3;
  const t2 = T + (2 * H) / 3;
  const cy = (t1 + t2) / 2;
  const st = star(100, cy, 16);
  return flag(
    "flag-ghana",
    "Ghana",
    "🇬🇭",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`] },
      { hint: "Draw a big star in the middle ⭐", color: OUTLINE, strokes: [st] },
      colorStep([
        { d: rectPath(L, T, R, t1), color: "#CE1126" },
        { d: rectPath(L, t1, R, t2), color: "#FCD116" },
        { d: rectPath(L, t2, R, B), color: "#006B3F" },
        { d: st, color: "#000000" },
      ]),
    ],
    "Ghana's flag has a black star.",
  );
})();

export const caf1Flags: Animal[] = [algeria, capeVerde, drCongo, egypt, ghana];
