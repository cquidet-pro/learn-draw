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
  crescent,
} from "../flags";

// AFC (Asian Football Confederation) 2026 World Cup flags. Each flag is drawn
// in the same 3:2 box (L,T,R,B) as the rest of the collection: dark guide
// outlines animate first, then ONE colour step fills every region. The index
// applies `withName`, so do NOT add the name step here.

const t1 = T + H / 3; // first horizontal third
const t2 = T + (2 * H) / 3; // second horizontal third

// ---------------------------------------------------------------------------
// Iran — green / white / red tricolour with a small red emblem on the white.
// ---------------------------------------------------------------------------
const iran = (() => {
  const cx = 100,
    cy = 100;
  // A small, symmetric red shape standing in for Iran's emblem: a central
  // upright "sword/tulip" petal flanked by two curved side petals — ~14px tall.
  const centre = `M ${cx},${n(cy - 7)} Q ${n(cx + 2.5)},${n(cy - 1)} ${cx},${n(cy + 6)} Q ${n(cx - 2.5)},${n(cy - 1)} ${cx},${n(cy - 7)} Z`;
  const sideR = `M ${n(cx + 2.5)},${n(cy + 2)} Q ${n(cx + 7)},${n(cy - 2)} ${n(cx + 6)},${n(cy - 7)} Q ${n(cx + 4.5)},${n(cy - 1)} ${n(cx + 2.5)},${n(cy + 2)} Z`;
  const sideL = `M ${n(cx - 2.5)},${n(cy + 2)} Q ${n(cx - 7)},${n(cy - 2)} ${n(cx - 6)},${n(cy - 7)} Q ${n(cx - 4.5)},${n(cy - 1)} ${n(cx - 2.5)},${n(cy + 2)} Z`;
  return flag(
    "flag-iran",
    "Iran",
    "🇮🇷",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`] },
      { hint: "Draw a little red emblem in the middle 🌷", color: OUTLINE, strokes: [centre, sideL, sideR], strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, R, t1), color: "#239F40" },
        { d: rectPath(L, t1, R, t2), color: "#ffffff" },
        { d: rectPath(L, t2, R, B), color: "#DA0000" },
        { d: centre, color: "#DA0000" },
        { d: sideL, color: "#DA0000" },
        { d: sideR, color: "#DA0000" },
      ]),
    ],
    "Iran's flag has a red emblem in the middle.",
  );
})();

// ---------------------------------------------------------------------------
// Iraq — red / white / black tricolour with three small green marks (the
// simplified "Allahu Akbar" script) on the white band.
// ---------------------------------------------------------------------------
const iraq = (() => {
  const cy = 100;
  // Three little green strokes spaced across the white band.
  const marks: string[] = [];
  const xs = [78, 100, 122];
  for (const x of xs) {
    marks.push(
      `M ${n(x - 6)},${n(cy + 5)} Q ${n(x - 3)},${n(cy - 6)} ${x},${n(cy - 1)} Q ${n(x + 3)},${n(cy - 6)} ${n(x + 6)},${n(cy + 5)}`,
    );
  }
  return flag(
    "flag-iraq",
    "Iraq",
    "🇮🇶",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`] },
      { hint: "Write three little green marks ✍️", color: "#007A3D", strokes: marks, strokeWidth: 1.5 },
      colorStep([
        { d: rectPath(L, T, R, t1), color: "#CE1126" },
        { d: rectPath(L, t1, R, t2), color: "#ffffff" },
        { d: rectPath(L, t2, R, B), color: "#000000" },
      ]),
    ],
    "Iraq's flag has green writing in the middle.",
  );
})();

// ---------------------------------------------------------------------------
// Jordan — black / white / green tricolour with a red triangle on the hoist
// and a white 7-pointed star in the triangle.
// ---------------------------------------------------------------------------
const jordan = (() => {
  const midY = (T + B) / 2;
  const midX = (L + R) / 2;
  const triangle = `M ${L},${T} L ${n(midX)},${n(midY)} L ${L},${B} Z`;
  // Small white 7-pointed star centred in the triangle (toward the hoist).
  const cx = L + W * 0.18,
    cy = midY;
  const st = star(cx, cy, 9, -90, 7);
  return flag(
    "flag-jordan",
    "Jordan",
    "🇯🇴",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`] },
      { hint: "Draw a triangle on the left 🔺", color: OUTLINE, strokes: [triangle] },
      { hint: "Add a star with seven points ⭐", color: "#CE1126", strokes: [st], strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, R, t1), color: "#000000" },
        { d: rectPath(L, t1, R, t2), color: "#ffffff" },
        { d: rectPath(L, t2, R, B), color: "#007A3D" },
        { d: triangle, color: "#CE1126" },
        { d: st, color: "#ffffff" },
      ]),
    ],
    "Jordan's flag has a white star with seven points.",
  );
})();

// ---------------------------------------------------------------------------
// Saudi Arabia — green field with a white horizontal sword and white script
// (simplified) above it.
// ---------------------------------------------------------------------------
const saudiArabia = (() => {
  // Sword: a long thin blade lying horizontally low-centre, point to the left,
  // with a small handle on the right.
  const swY = 132;
  const blade = `M ${n(L + 18)},${n(swY)} L ${n(R - 40)},${n(swY - 4)} L ${n(R - 40)},${n(swY + 4)} Z`;
  // Guard + handle on the right end of the blade.
  const guard = rectPath(R - 42, swY - 6, R - 38, swY + 6);
  const handle = rectPath(R - 38, swY - 2.5, R - 20, swY + 2.5);
  // A few simplified white "marks" for the shahada script, sitting above the
  // sword, centred across the field.
  const script: string[] = [];
  const sx = [55, 78, 100, 122, 145];
  for (const x of sx) {
    script.push(
      `M ${n(x - 7)},${n(100 + 5)} Q ${n(x - 3)},${n(100 - 7)} ${x},${n(100 - 1)} Q ${n(x + 3)},${n(100 - 7)} ${n(x + 7)},${n(100 + 5)}`,
    );
  }
  return flag(
    "flag-saudi-arabia",
    "Saudi Arabia",
    "🇸🇦",
    [
      frame(),
      { hint: "Write some white marks across ✍️", color: "#ffffff", strokes: script, strokeWidth: 1.5 },
      { hint: "Draw a long sword underneath 🗡️", color: "#ffffff", strokes: [blade, guard, handle], strokeWidth: 0.9 },
      colorStep([
        { d: RECT, color: "#006C35" },
        { d: blade, color: "#ffffff" },
        { d: guard, color: "#ffffff" },
        { d: handle, color: "#ffffff" },
      ]),
    ],
    "Saudi Arabia's flag has a sword.",
  );
})();

// ---------------------------------------------------------------------------
// Uzbekistan — blue / white / green horizontal bands with thin red lines
// between them, a white crescent and a cluster of white stars on the blue.
// ---------------------------------------------------------------------------
const uzbekistan = (() => {
  // Three equal bands, with thin red fimbriation bars between them.
  const redW = 2.2; // half-width of each thin red bar
  const b1 = t1; // blue/white boundary
  const b2 = t2; // white/green boundary
  const redTop = rectPath(L, b1 - redW, R, b1 + redW);
  const redBot = rectPath(L, b2 - redW, R, b2 + redW);
  // White crescent on the blue band, opening right (toward the fly), top-left.
  const cmx = 44,
    cmy = T + H / 6; // centre of the blue band, hoist side
  const cres = crescent(cmx, cmy, 11, 6, 9.5);
  // A small cluster of 5 white stars beside the crescent's opening.
  const starPts: [number, number][] = [
    [62, cmy - 6],
    [62, cmy + 6],
    [72, cmy - 9],
    [72, cmy + 9],
    [72, cmy],
  ];
  const stars = starPts.map(([x, y]) => star(x, y, 3));
  return flag(
    "flag-uzbekistan",
    "Uzbekistan",
    "🇺🇿",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(b1)} L ${R},${n(b1)}`, `M ${L},${n(b2)} L ${R},${n(b2)}`] },
      { hint: "Add thin red lines between the stripes", color: OUTLINE, strokes: [redTop, redBot], strokeWidth: 0.7 },
      { hint: "Draw a crescent moon 🌙", color: OUTLINE, strokes: [cres] },
      { hint: "Add a little cluster of stars ⭐", color: "#0099B5", strokes: stars, strokeWidth: 0.7 },
      colorStep([
        { d: rectPath(L, T, R, b1), color: "#0099B5" },
        { d: rectPath(L, b1, R, b2), color: "#ffffff" },
        { d: rectPath(L, b2, R, B), color: "#1EB53A" },
        { d: redTop, color: "#CE1126" },
        { d: redBot, color: "#CE1126" },
        { d: cres, color: "#ffffff" },
        ...stars.map((d) => ({ d, color: "#ffffff" })),
      ]),
    ],
    "Uzbekistan's flag has a moon and stars.",
  );
})();

export const afcFlags: Animal[] = [iran, iraq, jordan, saudiArabia, uzbekistan];
