import type { Animal } from "../animals";
import {
  OUTLINE,
  L,
  R,
  T,
  B,
  W,
  H,
  n,
  frame,
  colorStep,
  flag,
  rectPath,
  star,
  circle,
  striped,
} from "../flags";

// World Cup 2026 — CONMEBOL (South America): Argentina, Colombia, Ecuador,
// Paraguay, Uruguay. Same conventions as flags.ts: frame first, every coloured
// region is outlined as a guide stroke BEFORE the single colour step, tiny
// emblems get a thin stroke so their white shows. The index applies `withName`,
// so do NOT add the name step here.

// ---------------------------------------------------------------------------
// Reusable "Sun of May" — a gold disc with straight + wavy rays around it and a
// simple smiley face (two dot eyes + a small smile). Used by Argentina (white
// middle band) and Uruguay (canton). Returns the guide line-art (disc + one
// multi-subpath rays stroke + face) and the fills, so each flag can outline
// then colour it. Simplified to 16 rays alternating straight/wavy.
// ---------------------------------------------------------------------------
function sunOfMay(cx: number, cy: number, r: number, gold = "#F6B40E") {
  const disc = circle(cx, cy, r);
  // 16 rays around the disc, alternating a straight pointed ray and a short
  // wavy ray. Straight rays reach out to r*1.9, wavy ones wiggle out to r*1.7.
  const rayPaths: string[] = [];
  const rays = 16;
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * 2 * Math.PI - Math.PI / 2;
    const c = Math.cos(a),
      s = Math.sin(a);
    const x0 = cx + c * r,
      y0 = cy + s * r;
    if (i % 2 === 0) {
      // Straight triangular ray: base spread a little, tip out at r*1.9.
      const tx = cx + c * r * 1.95,
        ty = cy + s * r * 1.95;
      // perpendicular for the base spread
      const px = -s,
        py = c;
      const spread = r * 0.18;
      rayPaths.push(
        `M ${n(x0 + px * spread)},${n(y0 + py * spread)} L ${n(tx)},${n(ty)} L ${n(x0 - px * spread)},${n(y0 - py * spread)}`,
      );
    } else {
      // Short wavy ray: a small S-curve out to r*1.65.
      const a2 = a + 0.06;
      const mx = cx + Math.cos(a2) * r * 1.35,
        my = cy + Math.sin(a2) * r * 1.35;
      const tx = cx + Math.cos(a - 0.04) * r * 1.62,
        ty = cy + Math.sin(a - 0.04) * r * 1.62;
      rayPaths.push(`M ${n(x0)},${n(y0)} Q ${n(mx)},${n(my)} ${n(tx)},${n(ty)}`);
    }
  }
  const rayStroke = rayPaths.join(" ");
  // A simple smiley face: two dot eyes + a small smile arc.
  const eyeR = Math.max(0.7, r * 0.1);
  const eyeL = circle(cx - r * 0.32, cy - r * 0.18, eyeR);
  const eyeRr = circle(cx + r * 0.32, cy - r * 0.18, eyeR);
  const smile = `M ${n(cx - r * 0.35)},${n(cy + r * 0.18)} Q ${n(cx)},${n(cy + r * 0.55)} ${n(cx + r * 0.35)},${n(cy + r * 0.18)}`;
  return {
    disc,
    rayStroke,
    facePaths: [eyeL, eyeRr, smile],
    // Fills: gold disc; the face features are dark so the smiley reads.
    discFill: { d: disc, color: gold },
    faceFills: [
      { d: eyeL, color: gold },
      { d: eyeRr, color: gold },
    ],
    faceColor: "#7a5200",
    smile,
    eyes: [eyeL, eyeRr],
  };
}

// ---------------------------------------------------------------------------
// Argentina — light blue / white / light blue horizontal tricolour, with a
// golden Sun of May centred on the white middle band.
// ---------------------------------------------------------------------------
const argentina = (() => {
  const LIGHT = "#74ACDF";
  const t1 = T + H / 3,
    t2 = T + (2 * H) / 3;
  const cy = 100; // centre of the white middle band
  const sun = sunOfMay(100, cy, 13, "#F6B40E");
  return flag(
    "flag-argentina",
    "Argentina",
    "🇦🇷",
    [
      frame(),
      {
        hint: "Add 3 stripes across",
        color: OUTLINE,
        strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`],
      },
      {
        hint: "Draw a smiling sun in the middle ☀️",
        color: OUTLINE,
        strokes: [sun.disc, sun.rayStroke],
      },
      {
        // Tiny smiley face on the sun — thin stroke so the gold shows.
        hint: "Give the sun a happy face 🙂",
        color: "#7a5200",
        strokes: sun.facePaths,
        strokeWidth: 0.7,
      },
      colorStep([
        { d: rectPath(L, T, R, t1), color: LIGHT },
        { d: rectPath(L, t1, R, t2), color: "#ffffff" },
        { d: rectPath(L, t2, R, B), color: LIGHT },
        sun.discFill,
        ...sun.eyes.map((d) => ({ d, color: "#7a5200" })),
        { d: sun.smile, color: "#7a5200" },
      ]),
    ],
    "Argentina's flag has a smiling golden sun.",
  );
})();

// ---------------------------------------------------------------------------
// Colombia — yellow (half) / blue (quarter) / red (quarter), horizontal.
// ---------------------------------------------------------------------------
const colombia = striped(
  "flag-colombia",
  "Colombia",
  "🇨🇴",
  "h",
  [
    { color: "#FCD116", w: 2 },
    { color: "#003893", w: 1 },
    { color: "#CE1126", w: 1 },
  ],
  "Colombia's flag is yellow, blue and red.",
);

// ---------------------------------------------------------------------------
// Ecuador — yellow (half) / blue (quarter) / red (quarter), with a small
// simplified coat of arms centred (a shield with a brown condor on top).
// ---------------------------------------------------------------------------
const ecuador = (() => {
  // Band boundaries: yellow top half, blue + red quarters below.
  const yB = T + H * 0.5; // bottom of yellow
  const bB = T + H * 0.75; // bottom of blue
  const cx = 100;
  // A little shield centred on the flag, ~22px tall overall (incl. condor).
  const sTop = 96,
    sBot = 116,
    sW = 8;
  const shield = `M ${n(cx - sW)},${n(sTop)} L ${n(cx + sW)},${n(sTop)} L ${n(cx + sW)},${n(sBot - 6)} Q ${n(cx + sW)},${n(sBot)} ${n(cx)},${n(sBot + 2)} Q ${n(cx - sW)},${n(sBot)} ${n(cx - sW)},${n(sBot - 6)} Z`;
  // A simple brown condor silhouette perched above the shield: a body with two
  // spread wings and a small head. Drawn as one symmetric path.
  const cyB = 90; // condor body centre y
  const condor =
    `M ${n(cx)},${n(cyB - 4)} ` + // top of head
    `Q ${n(cx - 1.5)},${n(cyB - 5)} ${n(cx - 2)},${n(cyB - 2)} ` + // head left
    `L ${n(cx - 14)},${n(cyB - 5)} ` + // left wingtip up
    `Q ${n(cx - 8)},${n(cyB + 1)} ${n(cx - 2.5)},${n(cyB + 2)} ` + // left wing under
    `L ${n(cx - 2)},${n(cyB + 5)} L ${n(cx + 2)},${n(cyB + 5)} ` + // body bottom
    `L ${n(cx + 2.5)},${n(cyB + 2)} ` + // body right
    `Q ${n(cx + 8)},${n(cyB + 1)} ${n(cx + 14)},${n(cyB - 5)} ` + // right wing
    `L ${n(cx + 2)},${n(cyB - 2)} ` + // head right
    `Q ${n(cx + 1.5)},${n(cyB - 5)} ${n(cx)},${n(cyB - 4)} Z`;
  return flag(
    "flag-ecuador",
    "Ecuador",
    "🇪🇨",
    [
      frame(),
      {
        hint: "Add 3 stripes across",
        color: OUTLINE,
        strokes: [`M ${L},${n(yB)} L ${R},${n(yB)}`, `M ${L},${n(bB)} L ${R},${n(bB)}`],
      },
      {
        hint: "Draw a shield with a bird on top 🛡️",
        color: OUTLINE,
        strokes: [condor, shield],
        strokeWidth: 0.7,
      },
      colorStep([
        { d: rectPath(L, T, R, yB), color: "#FFDD00" },
        { d: rectPath(L, yB, R, bB), color: "#034EA2" },
        { d: rectPath(L, bB, R, B), color: "#ED1C24" },
        { d: shield, color: "#FFDD00" },
        { d: condor, color: "#8B5A2B" },
      ]),
    ],
    "Ecuador's flag has a condor on a shield.",
  );
})();

// ---------------------------------------------------------------------------
// Paraguay — red / white / blue horizontal tricolour, with a small emblem
// centred on the white: a gold 5-point star inside a thin green wreath circle.
// ---------------------------------------------------------------------------
const paraguay = (() => {
  const t1 = T + H / 3,
    t2 = T + (2 * H) / 3;
  const cx = 100,
    cy = 100;
  const wreath = circle(cx, cy, 11); // thin green wreath ring
  const st = star(cx, cy, 6); // gold five-point star inside
  return flag(
    "flag-paraguay",
    "Paraguay",
    "🇵🇾",
    [
      frame(),
      {
        hint: "Add 3 stripes across",
        color: OUTLINE,
        strokes: [`M ${L},${n(t1)} L ${R},${n(t1)}`, `M ${L},${n(t2)} L ${R},${n(t2)}`],
      },
      {
        hint: "Draw a star inside a ring ⭐",
        color: OUTLINE,
        strokes: [wreath, st],
        strokeWidth: 0.7,
      },
      colorStep([
        { d: rectPath(L, T, R, t1), color: "#D52B1E" },
        { d: rectPath(L, t1, R, t2), color: "#ffffff" },
        { d: rectPath(L, t2, R, B), color: "#0038A8" },
        // Green wreath ring drawn as a fat-stroked outline so it reads as a ring,
        // then the gold star painted inside it.
        { d: wreath, color: "#009B3A" },
        { d: circle(cx, cy, 8.5), color: "#ffffff" },
        { d: st, color: "#FCD116" },
      ]),
    ],
    "Paraguay's flag has a star in the middle.",
  );
})();

// ---------------------------------------------------------------------------
// Uruguay — 9 horizontal stripes (white first, alternating white/blue) with a
// white canton top-left holding a golden Sun of May. Like the USA flag, draw
// the canton box FIRST, then stripe dividers only to the RIGHT of the canton
// for the top stripes, then the sun.
// ---------------------------------------------------------------------------
const uruguay = (() => {
  const BLUE = "#0038A8";
  const stripeH = H / 9;
  const cantonR = L + W * 0.4; // ~40% wide
  const cantonB = T + stripeH * 5; // 5 stripes tall
  const canton = rectPath(L, T, cantonR, cantonB);
  // Stripe dividers: the top 5 dividers must NOT cross the canton, so start them
  // at the canton's right edge; divider i=5 is the canton's bottom edge.
  const stripes: string[] = [];
  for (let i = 1; i < 9; i++) {
    const y = n(T + i * stripeH);
    stripes.push(`M ${i < 5 ? n(cantonR) : L},${y} L ${R},${y}`);
  }
  // Stripe fills (white first, top): 9 stripes alternating white/blue.
  const stripeFills = [];
  for (let i = 0; i < 9; i++)
    stripeFills.push({
      d: rectPath(L, T + i * stripeH, R, T + (i + 1) * stripeH),
      color: i % 2 === 0 ? "#ffffff" : BLUE,
    });
  // Sun of May centred in the canton.
  const scx = (L + cantonR) / 2,
    scy = (T + cantonB) / 2;
  const sun = sunOfMay(scx, scy, 11, "#FCD116");
  return flag(
    "flag-uruguay",
    "Uruguay",
    "🇺🇾",
    [
      frame(),
      { hint: "Add a box in the corner for the sun", color: OUTLINE, strokes: [canton] },
      {
        hint: "Draw a smiling sun in the box ☀️",
        color: OUTLINE,
        strokes: [sun.disc, sun.rayStroke],
      },
      {
        hint: "Give the sun a happy face 🙂",
        color: "#7a5200",
        strokes: sun.facePaths,
        strokeWidth: 0.7,
      },
      { hint: "Add 9 stripes across", color: OUTLINE, strokes: stripes },
      colorStep([
        ...stripeFills,
        { d: canton, color: "#ffffff" },
        sun.discFill,
        ...sun.eyes.map((d) => ({ d, color: "#7a5200" })),
        { d: sun.smile, color: "#7a5200" },
      ]),
    ],
    "Uruguay's flag has a golden sun and nine stripes.",
  );
})();

export const conmebolFlags: Animal[] = [argentina, colombia, ecuador, paraguay, uruguay];
