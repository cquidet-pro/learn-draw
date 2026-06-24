import type { Animal, DrawStep } from "./animals";
import { nameStep } from "./handwriting";

// "Flags of the World" — each flag is drawn in our style: dark outline strokes
// (the frame + the divisions/shapes) animate first, then a final step colours
// every region in. Every flag lives in the same 3:2 box centred in the 200×200
// canvas (even ones a different shape in real life). Complex national emblems are
// simplified into clean, kid-friendly shapes.

const OUTLINE = "#3a3a55";
// The flag box (3:2).
const L = 10,
  R = 190,
  T = 40,
  B = 160;
const W = R - L,
  H = B - T;
const RECT = `M ${L},${T} L ${R},${T} L ${R},${B} L ${L},${B} Z`;

const n = (x: number) => Math.round(x * 10) / 10;

function frame(rect = RECT): DrawStep {
  return { hint: "Draw the flag's box 🏁", color: OUTLINE, strokes: [rect] };
}
function colorStep(fills: { d: string; color: string }[]): DrawStep {
  return { hint: "Now colour the flag in! 🖍️", color: OUTLINE, strokes: [], fills };
}
function flag(
  id: string,
  name: string,
  emoji: string,
  steps: DrawStep[],
  fact?: string,
): Animal {
  // Flags are flat colour regions, so the guide outlines should be thin and
  // crisp (not the bold 4px default) — closer to a real flag, less heavy.
  const thin = steps.map((s) => (s.strokeWidth == null ? { ...s, strokeWidth: 1.5 } : s));
  return { id, name, emoji, viewBox: "0 0 200 200", color: OUTLINE, fact, steps: thin };
}

const rectPath = (x0: number, y0: number, x1: number, y1: number) =>
  `M ${n(x0)},${n(y0)} L ${n(x1)},${n(y0)} L ${n(x1)},${n(y1)} L ${n(x0)},${n(y1)} Z`;

// A single plus/cross-shaped outline (the union of a vertical and a horizontal
// bar). Drawing the cross as one path avoids the black-outlined square that two
// overlapping rectangles leave where the bars cross. The vertical bar spans
// x∈[vx0,vx1] over y∈[yTop,yBot]; the horizontal bar spans y∈[hy0,hy1] over
// x∈[xLeft,xRight].
const plusOutline = (
  vx0: number,
  vx1: number,
  yTop: number,
  yBot: number,
  xLeft: number,
  xRight: number,
  hy0: number,
  hy1: number,
) =>
  `M ${n(vx0)},${n(yTop)} L ${n(vx1)},${n(yTop)} L ${n(vx1)},${n(hy0)} L ${n(xRight)},${n(hy0)} L ${n(xRight)},${n(hy1)} L ${n(vx1)},${n(hy1)} L ${n(vx1)},${n(yBot)} L ${n(vx0)},${n(yBot)} L ${n(vx0)},${n(hy1)} L ${n(xLeft)},${n(hy1)} L ${n(xLeft)},${n(hy0)} L ${n(vx0)},${n(hy0)} Z`;

// A pointed star. Defaults to five points; pass `points` for others (the
// Australian flag's stars are seven-pointed). Inner radius shrinks a little for
// busier stars so they don't look like gears.
function star(cx: number, cy: number, r: number, rotDeg = -90, points = 5): string {
  // 7-point inner ratio 0.444 matches the official Australian flag star.
  const inner = r * (points >= 7 ? 0.444 : 0.5);
  const step = 360 / points;
  const pts: string[] = [];
  for (let i = 0; i < points; i++) {
    const ao = ((rotDeg + i * step) * Math.PI) / 180;
    pts.push(`${n(cx + r * Math.cos(ao))},${n(cy + r * Math.sin(ao))}`);
    const ai = ((rotDeg + i * step + step / 2) * Math.PI) / 180;
    pts.push(`${n(cx + inner * Math.cos(ai))},${n(cy + inner * Math.sin(ai))}`);
  }
  return "M " + pts.join(" L ") + " Z";
}
const circle = (cx: number, cy: number, r: number) =>
  `M ${n(cx - r)},${cy} a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 ${-2 * r},0`;

// A crescent (lune): the part of the outer circle (cx,cy,R) NOT covered by a
// bite circle of radius `br` whose centre is `dx` to the right. Opens rightward.
// Returns a single path so it draws and fills as a real crescent (not a ring).
const crescent = (cx: number, cy: number, R: number, dx: number, br: number) => {
  const a = (dx * dx + R * R - br * br) / (2 * dx);
  const h = Math.sqrt(Math.max(0, R * R - a * a));
  const px = cx + a;
  // Outer arc sweeps the major arc AROUND THE LEFT (the far side from the bite),
  // inner arc is the bite's left edge — giving a moon that opens to the RIGHT.
  // The sweep flags below are verified by rendering; re-check if params change.
  return `M ${n(px)},${n(cy - h)} A ${R},${R} 0 1,0 ${n(px)},${n(cy + h)} A ${br},${br} 0 0,1 ${n(px)},${n(cy - h)} Z`;
};

// ---- Striped flags (equal or weighted bands) -------------------------------
interface Band {
  color: string;
  w?: number;
}
function striped(
  id: string,
  name: string,
  emoji: string,
  dir: "v" | "h",
  bands: Band[],
  fact?: string,
): Animal {
  const total = bands.reduce((s, b) => s + (b.w ?? 1), 0);
  const span = dir === "v" ? W : H;
  const start = dir === "v" ? L : T;
  const bounds = [start];
  let acc = start;
  for (const b of bands) {
    acc += (span * (b.w ?? 1)) / total;
    bounds.push(acc);
  }
  const dividers: string[] = [];
  for (let i = 1; i < bands.length; i++) {
    const p = bounds[i];
    dividers.push(
      dir === "v" ? `M ${n(p)},${T} L ${n(p)},${B}` : `M ${L},${n(p)} L ${R},${n(p)}`,
    );
  }
  const fills = bands.map((b, i) => {
    const a = bounds[i],
      c = bounds[i + 1];
    const d =
      dir === "v" ? rectPath(a, T, c, B) : rectPath(L, a, R, c);
    return { d, color: b.color };
  });
  return flag(
    id,
    name,
    emoji,
    [
      frame(),
      {
        // Always say how many stripes — "Add 3 stripes across", not a vague
        // "add the stripes". The count is the number of colour bands.
        hint:
          dir === "v"
            ? `Add ${bands.length} stripes up and down`
            : `Add ${bands.length} stripes across`,
        color: OUTLINE,
        strokes: dividers,
      },
      colorStep(fills),
    ],
    fact,
  );
}

// ---- Cross flags -----------------------------------------------------------
function nordic(
  id: string,
  name: string,
  emoji: string,
  field: string,
  cross: string,
  inner?: string,
  fact?: string,
  // Cross arm width and inner-cross width. Defaults suit a plain Nordic cross;
  // Norway uses a bolder 1:2:1 white/blue/white cross (cw 30, inner 15).
  cw = 16,
  iw = 6,
): Animal {
  const vx0 = L + 0.3 * W,
    vx1 = vx0 + cw;
  const cy = (T + B) / 2;
  const hy0 = cy - cw / 2,
    hy1 = cy + cw / 2;
  const vbar = rectPath(vx0, T, vx1, B);
  const hbar = rectPath(L, hy0, R, hy1);
  // One plus-shaped outline so the bars don't leave a boxed-in square where
  // they cross.
  const crossOutline = plusOutline(vx0, vx1, T, B, L, R, hy0, hy1);
  const fills = [
    { d: RECT, color: field },
    { d: vbar, color: cross },
    { d: hbar, color: cross },
  ];
  if (inner) {
    const ivx0 = vx0 + (cw - iw) / 2;
    fills.push({ d: rectPath(ivx0, T, ivx0 + iw, B), color: inner });
    fills.push({ d: rectPath(L, cy - iw / 2, R, cy + iw / 2), color: inner });
  }
  return flag(
    id,
    name,
    emoji,
    [
      frame(),
      {
        hint: "Add a cross — a tall line and a wide line ➕",
        color: OUTLINE,
        strokes: [crossOutline],
      },
      colorStep(fills),
    ],
    fact,
  );
}

// ---------------------------------------------------------------------------
// The flags
// ---------------------------------------------------------------------------

const switzerland = (() => {
  // Drawn in the same 3:2 box as every other flag (the real one is square).
  const cx = 100,
    cy = 100,
    t = 16,
    len = 40;
  const vbar = rectPath(cx - t, cy - len, cx + t, cy + len);
  const hbar = rectPath(cx - len, cy - t, cx + len, cy + t);
  const cross = plusOutline(cx - t, cx + t, cy - len, cy + len, cx - len, cx + len, cy - t, cy + t);
  return flag(
    "flag-switzerland",
    "Switzerland",
    "🇨🇭",
    [
      frame(),
      { hint: "Add a fat white cross in the middle ➕", color: OUTLINE, strokes: [cross] },
      colorStep([
        { d: RECT, color: "#D52B1E" },
        { d: vbar, color: "#ffffff" },
        { d: hbar, color: "#ffffff" },
      ]),
    ],
    "In real life, Switzerland's flag is a perfect square!",
  );
})();

const japan = flag(
  "flag-japan",
  "Japan",
  "🇯🇵",
  [
    frame(),
    { hint: "Draw a big circle in the middle ⭕", color: OUTLINE, strokes: [circle(100, 100, 38)] },
    colorStep([
      { d: RECT, color: "#ffffff" },
      { d: circle(100, 100, 38), color: "#BC002D" },
    ]),
  ],
  "Japan's flag shows the rising sun.",
);

const china = (() => {
  const field = { d: RECT, color: "#DE2910" };
  const big = star(42, 72, 16);
  const smalls = [
    star(70, 58, 6, -60),
    star(80, 70, 6, -75),
    star(80, 86, 6, 80),
    star(70, 98, 6, 60),
  ];
  return flag(
    "flag-china",
    "China",
    "🇨🇳",
    [
      frame(),
      { hint: "Draw one big star ⭐", color: OUTLINE, strokes: [big] },
      { hint: "Add four little stars ✨", color: OUTLINE, strokes: smalls },
      colorStep([
        field,
        { d: big, color: "#FFDE00" },
        ...smalls.map((d) => ({ d, color: "#FFDE00" })),
      ]),
    ],
    "China's flag has one big star and four small ones.",
  );
})();

const usa = (() => {
  // 13 stripes, blue canton, a grid of white stars (simplified).
  const NAVY = "#3C3B6E";
  const stripeH = H / 13;
  const cantonR = L + W * 0.42;
  const cantonB = T + stripeH * 7;
  const canton = rectPath(L, T, cantonR, cantonB);
  // Draw the canton first, then the stripes — but the top stripes must NOT cut
  // through the canton, so those dividers start at the canton's right edge (the
  // first 7 stripe-rows are behind the canton; divider i=7 is its bottom edge).
  const stripes: string[] = [];
  for (let i = 1; i < 13; i++) {
    const y = n(T + i * stripeH);
    stripes.push(`M ${i < 7 ? n(cantonR) : L},${y} L ${R},${y}`);
  }
  const stripeFills = [];
  for (let i = 0; i < 13; i++)
    stripeFills.push({ d: rectPath(L, T + i * stripeH, R, T + (i + 1) * stripeH), color: i % 2 === 0 ? "#B22234" : "#ffffff" });
  // 50 stars: 9 rows, alternating 6 and 5 stars (offset), inside the canton.
  const stars: string[] = [];
  const cw = cantonR - L,
    chh = cantonB - T;
  for (let row = 0; row < 9; row++) {
    const even = row % 2 === 0;
    const count = even ? 6 : 5;
    for (let i = 0; i < count; i++) {
      const col = even ? i * 2 : i * 2 + 1; // 0..10 across 11 slots
      stars.push(star(L + (cw * (col + 1)) / 12, T + (chh * (row + 1)) / 10, 2.1));
    }
  }
  return flag(
    "flag-united-states",
    "United States",
    "🇺🇸",
    [
      frame(),
      { hint: "Add a box in the corner for the stars", color: OUTLINE, strokes: [canton] },
      { hint: "Add 13 stripes across", color: OUTLINE, strokes: stripes },
      // The stars are drawn in the canton's own navy: clearly visible as the
      // child draws them on the white box, then they vanish into the blue fill
      // in the finished flag (a dark OUTLINE stroke is too heavy for stars this
      // tiny — it swallows the white and leaves dark blobs). Same trick the UK
      // flag uses for its internal guide lines.
      { hint: "Add 50 little stars ⭐", color: NAVY, strokes: stars },
      colorStep([
        ...stripeFills,
        { d: canton, color: NAVY },
        ...stars.map((d) => ({ d, color: "#ffffff" })),
      ]),
    ],
    "The USA flag has 13 stripes and 50 stars!",
  );
})();

// Clip a convex polygon by another convex polygon (Sutherland–Hodgman).
type Pt = [number, number];
function clipPoly(subject: Pt[], cp: Pt[]): Pt[] {
  let area = 0;
  for (let i = 0; i < cp.length; i++) {
    const [x1, y1] = cp[i];
    const [x2, y2] = cp[(i + 1) % cp.length];
    area += x1 * y2 - x2 * y1;
  }
  let clip = area < 0 ? [...cp].reverse() : cp;
  let out = subject;
  for (let i = 0; i < clip.length; i++) {
    const A = clip[i];
    const B = clip[(i + 1) % clip.length];
    const side = (p: Pt) => (B[0] - A[0]) * (p[1] - A[1]) - (B[1] - A[1]) * (p[0] - A[0]);
    const inter = (p: Pt, q: Pt): Pt => {
      const d1 = side(p);
      const d2 = side(q);
      const t = d1 / (d1 - d2);
      return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
    };
    const inp = out;
    out = [];
    for (let j = 0; j < inp.length; j++) {
      const P = inp[j];
      const Q = inp[(j + 1) % inp.length];
      const Pin = side(P) >= -1e-9;
      const Qin = side(Q) >= -1e-9;
      if (Pin) {
        out.push(P);
        if (!Qin) out.push(inter(P, Q));
      } else if (Qin) {
        out.push(inter(P, Q));
      }
    }
    if (out.length === 0) break;
  }
  return out;
}
// A diagonal band (centre-line p0→p1, half-width hw) as a long rectangle.
function diagBand(p0: Pt, p1: Pt, hw: number): Pt[] {
  const dx = p1[0] - p0[0],
    dy = p1[1] - p0[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len,
    uy = dy / len,
    px = -uy,
    py = ux,
    ext = 14;
  const a: Pt = [p0[0] - ux * ext, p0[1] - uy * ext];
  const b: Pt = [p1[0] + ux * ext, p1[1] + uy * ext];
  return [
    [a[0] + px * hw, a[1] + py * hw],
    [b[0] + px * hw, b[1] + py * hw],
    [b[0] - px * hw, b[1] - py * hw],
    [a[0] - px * hw, a[1] - py * hw],
  ];
}

// A correct Union Jack inside the given box, built from the official flag's
// geometry (a 50×30 design): the St Patrick red saltire is counterchanged via
// the official clip triangles, so the diagonals sit exactly right.
const unionJack = (cL: number, cT: number, cR: number, cB: number) => {
  const cw = cR - cL,
    ch = cB - cT;
  const X = (x: number) => cL + (x / 50) * cw;
  const Y = (y: number) => cT + (y / 30) * ch;
  const mp = (pts: Pt[]) => "M " + pts.map(([x, y]) => `${n(X(x))},${n(Y(y))}`).join(" L ") + " Z";
  const rectP = (x0: number, y0: number, x1: number, y1: number): Pt[] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const navy = "#012169",
    red = "#C8102E",
    white = "#ffffff";
  const FR = rectP(0, 0, 50, 30);
  const D1: [Pt, Pt] = [[0, 0], [50, 30]];
  const D2: [Pt, Pt] = [[50, 0], [0, 30]];
  // Official clip triangles (from clipPath "M25,15h25v15z…") that counterchange
  // the red saltire. Each diagonal shows red in two opposite triangles.
  const T1: Pt[] = [[25, 15], [50, 15], [50, 30]];
  const T2: Pt[] = [[25, 15], [25, 30], [0, 30]];
  const T3: Pt[] = [[25, 15], [0, 15], [0, 0]];
  const T4: Pt[] = [[25, 15], [25, 0], [50, 0]];
  const fills: { d: string; color: string }[] = [{ d: mp(FR), color: navy }];
  // The red shapes (saltire + cross), collected so they can be drawn as RED
  // guide strokes BEFORE colouring — visible on the white box while drawn, then
  // they vanish into the matching red fill in the finished flag (a dark guide
  // line would leave a stray mark; red-on-red disappears). So the child outlines
  // the red strips first and the colour step just fills them in.
  const redStrokes: string[] = [];
  // St Andrew white saltire (width 6).
  fills.push({ d: mp(clipPoly(diagBand(D1[0], D1[1], 3), FR)), color: white });
  fills.push({ d: mp(clipPoly(diagBand(D2[0], D2[1], 3), FR)), color: white });
  // St Patrick red saltire (width 4), counterchanged by the clip triangles.
  for (const [D, T] of [[D1, T3], [D1, T1], [D2, T4], [D2, T2]] as [[Pt, Pt], Pt[]][]) {
    const poly = clipPoly(diagBand(D[0], D[1], 2), T);
    if (poly.length) {
      const d = mp(poly);
      fills.push({ d, color: red });
      redStrokes.push(d);
    }
  }
  // St George cross: white border then red.
  fills.push({ d: mp(clipPoly(rectP(20, 0, 30, 30), FR)), color: white });
  fills.push({ d: mp(clipPoly(rectP(0, 10, 50, 20), FR)), color: white });
  const vRed = mp(rectP(21, 0, 29, 30)),
    hRed = mp(rectP(0, 11, 50, 19));
  fills.push({ d: vRed, color: red });
  fills.push({ d: hRed, color: red });
  redStrokes.push(vRed, hRed);
  return { fills, box: mp(FR), redStrokes };
};

const unitedKingdom = (() => {
  const uj = unionJack(L, T, R, B);
  return flag(
    "flag-united-kingdom",
    "United Kingdom",
    "🇬🇧",
    [
      // Draw the red cross + diagonal X first (in red, so the guide lines vanish
      // into the red fills — see redStrokes), so the colour step fills shapes the
      // child has already outlined rather than conjuring the whole Union Jack.
      // The white saltire/cross still form during colouring (white can't be drawn
      // as a guide line on the white box).
      frame(),
      { hint: "Draw the red cross and a red X ✚", color: "#C8102E", strokes: uj.redStrokes },
      colorStep(uj.fills),
    ],
    "The Union Jack joins three crosses together.",
  );
})();

const cantonFlag = (
  id: string,
  name: string,
  emoji: string,
  fieldColor: string,
  extraStars: { cx: number; cy: number; r: number; points?: number }[],
  fact?: string,
  // Star styling. Default white stars (Australia). New Zealand uses red stars
  // with a white outline — the easiest way to tell the two flags apart — drawn
  // as a larger border star behind a smaller coloured one.
  starColor = "#ffffff",
  starBorder?: string,
) => {
  // Blue/coloured field with a small Union Jack in the top-left + stars.
  const cR = L + W * 0.5,
    cB = T + H * 0.5;
  const uj = unionJack(L, T, cR, cB);
  const pof = (s: { points?: number }) => s.points ?? 5;
  const starFills = extraStars.flatMap((s) =>
    starBorder
      ? [
          { d: star(s.cx, s.cy, s.r, -90, pof(s)), color: starBorder },
          { d: star(s.cx, s.cy, s.r * 0.62, -90, pof(s)), color: starColor },
        ]
      : [{ d: star(s.cx, s.cy, s.r, -90, pof(s)), color: starColor }],
  );
  return flag(
    id,
    name,
    emoji,
    [
      frame(),
      { hint: "Make a little flag box in the corner", color: OUTLINE, strokes: [uj.box] },
      { hint: "Add the stars ⭐", color: OUTLINE, strokes: extraStars.map((s) => star(s.cx, s.cy, s.r, -90, pof(s))) },
      colorStep([{ d: RECT, color: fieldColor }, ...uj.fills, ...starFills]),
    ],
    fact,
  );
};

const australia = cantonFlag(
  "flag-australia",
  "Australia",
  "🇦🇺",
  "#00247D",
  [
    // Positions & sizes mapped from the official flag SVG (a 2:1 flag) by
    // fraction into our box: x = 10 + fracX*180, y = 40 + fracY*120, radius
    // scaled by height (120/5040). Commonwealth + the four big Crux stars are
    // 7-pointed; the small fifth (Epsilon) is 5-pointed — as on the real flag.
    { cx: 55, cy: 130, r: 18, points: 7 }, // Commonwealth Star (under the canton)
    { cx: 145, cy: 140, r: 8.6, points: 7 }, // α Crucis
    { cx: 122.5, cy: 92.5, r: 8.6, points: 7 }, // β Crucis
    { cx: 145, cy: 60, r: 8.6, points: 7 }, // γ Crucis
    { cx: 165, cy: 84.5, r: 8.6, points: 7 }, // δ Crucis
    { cx: 154, cy: 105, r: 5, points: 5 }, // ε Crucis (small)
  ],
  "Australia's flag shows the Southern Cross stars.",
);

const newZealand = cantonFlag(
  "flag-new-zealand",
  "New Zealand",
  "🇳🇿",
  "#00247D",
  [
    { cx: 150, cy: 72, r: 7 },
    { cx: 168, cy: 102, r: 7 },
    { cx: 148, cy: 130, r: 7 },
    { cx: 132, cy: 100, r: 7 },
  ],
  "New Zealand's flag has four red stars.",
  "#CC142B", // red stars...
  "#ffffff", // ...with a white outline
);

const canada = (() => {
  // White centre band, red sides, and the official 11-point maple leaf (taken
  // from the public-domain Flag of Canada SVG, scaled to fit the band).
  const b1 = L + W / 4,
    b2 = R - W / 4;
  const leaf =
    "M 102.1,146 L 101,125.9 A 2.2,2.2 0 0,1 103.6,123.6 L 123.7,127.1 L 121,119.6 A 1.5,1.5 0 0,1 121.4,117.9 L 143.4,100.2 L 138.4,97.9 A 1.5,1.5 0 0,1 137.6,96 L 142,82.7 L 129.3,85.4 A 1.5,1.5 0 0,1 127.6,84.5 L 125.2,78.7 L 115.3,89.3 A 1.5,1.5 0 0,1 112.7,88 L 117.5,63.4 L 109.9,67.8 A 1.5,1.5 0 0,1 107.7,67.2 L 100,52 L 92.3,67.2 A 1.5,1.5 0 0,1 90.1,67.8 L 82.5,63.4 L 87.3,88 A 1.5,1.5 0 0,1 84.7,89.3 L 74.8,78.7 L 72.4,84.5 A 1.5,1.5 0 0,1 70.7,85.4 L 58,82.7 L 62.4,96 A 1.5,1.5 0 0,1 61.6,97.9 L 56.6,100.2 L 78.6,117.9 A 1.5,1.5 0 0,1 79,119.6 L 76.3,127.1 L 96.4,123.6 A 2.2,2.2 0 0,1 99,125.9 L 97.9,146 Z";
  return flag(
    "flag-canada",
    "Canada",
    "🇨🇦",
    [
      frame(),
      { hint: "Add two lines down", color: OUTLINE, strokes: [`M ${n(b1)},${T} L ${n(b1)},${B}`, `M ${n(b2)},${T} L ${n(b2)},${B}`] },
      { hint: "Draw a maple leaf in the middle 🍁", color: OUTLINE, strokes: [leaf] },
      colorStep([
        { d: rectPath(L, T, b1, B), color: "#D80621" },
        { d: rectPath(b2, T, R, B), color: "#D80621" },
        { d: rectPath(b1, T, b2, B), color: "#ffffff" },
        { d: leaf, color: "#D80621" },
      ]),
    ],
    "Canada's flag shows a red maple leaf.",
  );
})();

const singapore = (() => {
  const midY = (T + B) / 2;
  // A real crescent (lune), opening toward the fly (right), as on the real flag.
  const cres = crescent(58, 70, 17, 9, 15);
  // Five stars in a pentagon ring to the right of the crescent's opening,
  // clearly separated from the moon (they must not overlap it).
  // Ring centre sits in the crescent's opening so the two left-hand stars fall
  // inside the moon's bay, as on the real flag.
  const sx = 73,
    sy = 70,
    sR = 11;
  const stars = [0, 1, 2, 3, 4].map((i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return star(sx + sR * Math.cos(a), sy + sR * Math.sin(a), 4);
  });
  return flag(
    "flag-singapore",
    "Singapore",
    "🇸🇬",
    [
      frame(),
      { hint: "Add a line across the middle", color: OUTLINE, strokes: [`M ${L},${n(midY)} L ${R},${n(midY)}`] },
      { hint: "Draw a crescent moon 🌙", color: OUTLINE, strokes: [cres] },
      { hint: "Add five little stars ⭐", color: OUTLINE, strokes: stars },
      colorStep([
        { d: rectPath(L, T, R, midY), color: "#EF3340" },
        { d: rectPath(L, midY, R, B), color: "#ffffff" },
        { d: cres, color: "#ffffff" },
        ...stars.map((d) => ({ d, color: "#ffffff" })),
      ]),
    ],
    "Singapore's flag has a moon and five stars.",
  );
})();

const southKorea = (() => {
  const cx = 100,
    cy = 100,
    r = 30;
  // taegeuk: red top half, blue bottom, split by an S of two half-circles
  const taegeuk = circle(cx, cy, r);
  // Trigrams sit on the diagonals, each tilted 45° so its bars point at the
  // centre (as on the real flag). A trigram is three stacked bars (broken =
  // split with a centre gap) centred on (tcx,tcy), then rotated by `deg`.
  const bw = 27,
    bh = 4.5,
    gap = 7;
  const rot = (px: number, py: number, ox: number, oy: number, deg: number) => {
    const a = (deg * Math.PI) / 180,
      c = Math.cos(a),
      s = Math.sin(a);
    const dx = px - ox,
      dy = py - oy;
    return [ox + dx * c - dy * s, oy + dx * s + dy * c] as const;
  };
  const rrect = (x0: number, y0: number, x1: number, y1: number, ox: number, oy: number, deg: number) =>
    "M " +
    ([[x0, y0], [x1, y0], [x1, y1], [x0, y1]] as const)
      .map(([x, y]) => rot(x, y, ox, oy, deg))
      .map(([x, y]) => `${n(x)},${n(y)}`)
      .join(" L ") +
    " Z";
  const trigram = (tcx: number, tcy: number, deg: number, pattern: boolean[]) =>
    pattern.flatMap((broken, i) => {
      const x0 = tcx - bw / 2;
      const y0 = tcy - gap + i * gap - bh / 2; // middle line centred on tcy
      return broken
        ? [
            rrect(x0, y0, x0 + bw * 0.42, y0 + bh, tcx, tcy, deg),
            rrect(x0 + bw * 0.58, y0, x0 + bw, y0 + bh, tcx, tcy, deg),
          ]
        : [rrect(x0, y0, x0 + bw, y0 + bh, tcx, tcy, deg)];
    });
  // geon ☰ (TL), gam ☵ (TR), ri ☲ (BL), gon ☷ (BR); true = broken line.
  const trigrams = [
    ...trigram(52, 68, -45, [false, false, false]),
    ...trigram(148, 68, 45, [true, false, true]),
    ...trigram(52, 132, 45, [false, true, false]),
    ...trigram(148, 132, -45, [true, true, true]),
  ];
  return flag(
    "flag-south-korea",
    "South Korea",
    "🇰🇷",
    [
      frame(),
      { hint: "Draw a circle in the middle ⭕", color: OUTLINE, strokes: [taegeuk] },
      { hint: "Add little bars in the corners", color: OUTLINE, strokes: trigrams },
      colorStep([
        { d: RECT, color: "#ffffff" },
        // Taegeuk: a blue disc with the red (yang) half painted on top. The
        // dividing S is horizontal — red dips down on the left, blue rises up
        // on the right — as on the real flag.
        { d: taegeuk, color: "#0047A0" },
        { d: `M ${n(cx - r)},${cy} A ${r},${r} 0 0,1 ${n(cx + r)},${cy} A ${r / 2},${r / 2} 0 0,0 ${cx},${cy} A ${r / 2},${r / 2} 0 0,1 ${n(cx - r)},${cy} Z`, color: "#CD2E3A" },
        ...trigrams.map((d) => ({ d, color: "#222222" })),
      ]),
    ],
    "South Korea's flag has a red-and-blue circle.",
  );
})();

const qatar = (() => {
  // Maroon with a white serrated band on the hoist (9 points).
  const bx = L + W * 0.34;
  const pts = 9;
  let zig = `M ${L},${T} L ${n(bx - 10)},${T}`;
  for (let i = 0; i < pts; i++) {
    const y0 = T + (H * i) / pts;
    const y1 = T + (H * (i + 0.5)) / pts;
    const y2 = T + (H * (i + 1)) / pts;
    zig += ` L ${n(bx + 10)},${n(y1)} L ${n(bx - 10)},${n(y2)}`;
    void y0;
  }
  zig += ` L ${L},${B} Z`;
  return flag(
    "flag-qatar",
    "Qatar",
    "🇶🇦",
    [
      frame(),
      { hint: "Add a zig-zag line down ⚡", color: OUTLINE, strokes: [zig] },
      colorStep([
        { d: RECT, color: "#8A1538" },
        { d: zig, color: "#ffffff" },
      ]),
    ],
    "Qatar's flag has nine white points.",
  );
})();

const brazil = (() => {
  // Geometry mapped from the official Flag of Brazil SVG (globe radius 735 in a
  // 4200×2940 flag), scaled by globe radius into our box and centred on (100,100).
  const gx = 100,
    gy = 100,
    gr = 26;
  const s = gr / 735;
  const X = (x: number) => gx + x * s;
  const Y = (y: number) => gy + y * s;
  const diamond = `M ${n(X(-1743))},${gy} L ${gx},${n(Y(1113))} L ${n(X(1743))},${gy} L ${gx},${n(Y(-1113))} Z`;
  const disc = circle(gx, gy, gr);
  // White "ORDEM E PROGRESSO" band: the annulus between r1785 and r1680 about a
  // centre below the globe, clipped to the globe — the real flag's curved band.
  const globePoly: Pt[] = [];
  for (let i = 0; i < 64; i++) {
    const a = (i / 64) * 2 * Math.PI;
    globePoly.push([gx + gr * Math.cos(a), gy + gr * Math.sin(a)]);
  }
  const cx = X(-420),
    cy = Y(1470);
  const ro = 1785 * s,
    ri = 1680 * s;
  const strip: Pt[] = [];
  for (let t = 0; t <= 80; t++) {
    const a = ((-150 + (120 * t) / 80) * Math.PI) / 180;
    strip.push([cx + ro * Math.cos(a), cy + ro * Math.sin(a)]);
  }
  for (let t = 80; t >= 0; t--) {
    const a = ((-150 + (120 * t) / 80) * Math.PI) / 180;
    strip.push([cx + ri * Math.cos(a), cy + ri * Math.sin(a)]);
  }
  const band = "M " + clipPoly(strip, globePoly).map(([x, y]) => `${n(x)},${n(y)}`).join(" L ") + " Z";
  // "ORDEM E PROGRESSO" — the official letter glyphs transformed onto the band
  // arc (centre -420,1470). Precomputed for this globe (centre 100,100, r 26).
  const bandText =
    "M77.825 92.4A1.114 1.238 -7 0 0 77.523 89.942A1.114 1.238 -7 0 0 77.825 92.4M77.769 91.944A0.654 0.778 -7 0 0 77.579 90.399A0.654 0.778 -7 0 0 77.769 91.944 M79.843 92.176L80.301 92.144L80.237 91.227L81.225 91.158A0.778 0.778 -4 0 0 81.117 89.605L79.705 89.704ZM80.205 90.768L81.158 90.701A0.318 0.318 -4 0 0 81.113 90.066L80.161 90.133Z M81.942 92.03C81.918 91.677 81.863 90.9 81.334 90.937L80.663 90.984C81.44 90.93 81.494 91.706 81.519 92.059 M82.981 91.981L84.148 91.961A1.061 1.061 -1 0 0 85.19 90.881L85.184 90.527A1.061 1.061 -1 0 0 84.105 89.485L82.938 89.505ZM83.433 91.513L84.105 91.501A0.672 0.672 -1 0 0 84.765 90.818L84.761 90.605A0.672 0.672 -1 0 0 84.077 89.945L83.405 89.957Z M86.125 91.95L88.352 92.028L88.368 91.568L86.565 91.505L86.587 90.869L88.001 90.918L88.016 90.494L86.602 90.445L86.619 89.95L88.316 90.009L88.332 89.549L86.211 89.475Z M89.266 92.084L89.689 92.121L89.837 90.429L90.183 92.164L90.57 92.198L91.212 90.55L91.064 92.241L91.486 92.278L91.702 89.811L91.086 89.757L90.444 91.406L90.099 89.671L89.482 89.617Z M94.397 92.662L96.227 92.977L96.299 92.559L94.887 92.316L94.983 91.758L96.133 91.956L96.205 91.538L95.055 91.34L95.121 90.956L96.489 91.191L96.561 90.773L94.774 90.466Z M99.099 93.586L99.544 93.701L99.774 92.811L100.733 93.059A0.778 0.778 14.5 0 0 101.123 91.552L99.753 91.198ZM99.889 92.366L100.814 92.605A0.318 0.318 14.5 0 0 100.974 91.988L100.049 91.749Z M102.137 94.396L102.575 94.535L102.852 93.658L103.797 93.955A0.778 0.778 17.5 0 0 104.265 92.471L102.915 92.046ZM102.99 93.219L103.901 93.506A0.318 0.318 17.5 0 0 104.093 92.899L103.182 92.612Z M104.144 95.029C104.251 94.692 104.485 93.95 103.978 93.79L103.337 93.588C104.08 93.822 103.846 94.564 103.739 94.902 M106.172 95.755A1.114 1.238 20.5 0 0 107.039 93.436A1.114 1.238 20.5 0 0 106.172 95.755M106.333 95.324A0.654 0.778 20.5 0 0 106.878 93.866A0.654 0.778 20.5 0 0 106.333 95.324 M109.087 96.933A1.114 1.238 23.5 0 0 110.074 94.662A1.114 1.238 23.5 0 0 109.087 96.933M109.27 96.511A0.654 0.778 23.5 0 0 109.891 95.084A0.654 0.778 23.5 0 0 109.27 96.511 M109.743 95.868L110.602 96.242L110.461 96.566L109.602 96.192Z M110.278 96.101L110.602 96.242L110.109 97.377L109.784 97.236Z M110.939 97.764L111.35 97.969L111.761 97.146L112.647 97.588A0.778 0.778 26.5 0 0 113.342 96.195L112.075 95.564ZM111.966 96.735L112.821 97.161A0.318 0.318 26.5 0 0 113.105 96.591L112.25 96.165Z M112.822 98.703C112.98 98.387 113.327 97.69 112.853 97.453L112.251 97.154C112.948 97.501 112.6 98.197 112.442 98.514 M113.742 99.189L115.682 100.286L115.908 99.886L114.338 98.997L114.651 98.443L115.883 99.14L116.092 98.77L114.86 98.074L115.104 97.643L116.582 98.479L116.809 98.078L114.961 97.033Z M117.355 100.401C117.222 100.609 117.356 100.842 117.655 101.032C117.953 101.222 118.156 101.215 118.242 101.081C118.513 100.656 116.947 100.036 117.43 99.295C117.846 98.658 118.558 99.154 118.826 99.325C119.095 99.496 119.526 99.938 119.191 100.448L118.736 100.159C118.878 99.935 118.722 99.72 118.483 99.568C118.252 99.42 118.064 99.353 117.926 99.569C117.695 99.915 119.23 100.568 118.76 101.306C118.413 101.851 117.809 101.613 117.406 101.356C117.063 101.138 116.551 100.622 116.885 100.101Z M120.011 102.157C119.867 102.359 119.99 102.598 120.278 102.804C120.566 103.009 120.769 103.013 120.862 102.883C121.154 102.473 119.623 101.772 120.144 101.057C120.593 100.443 121.278 100.975 121.537 101.16C121.796 101.345 122.204 101.809 121.842 102.301L121.403 101.988C121.557 101.772 121.412 101.549 121.181 101.384C120.958 101.225 120.774 101.148 120.625 101.357C120.377 101.69 121.875 102.422 121.367 103.135C120.992 103.661 120.401 103.392 120.013 103.114C119.682 102.878 119.197 102.337 119.557 101.834Z M122.523 105.006A1.114 1.238 38.5 0 0 124.065 103.068A1.114 1.238 38.5 0 0 122.523 105.006M122.81 104.646A0.654 0.778 38.5 0 0 123.779 103.428A0.654 0.778 38.5 0 0 122.81 104.646";
  // A spread of the brightest stars at their official positions (x,y in flag
  // units) — the six big stars from each cluster, the Southern Cross, and the
  // lone Sigma Octantis — dropping the tiny ones that just clutter at our size.
  const SZ: Record<string, number> = { a: 31.5, b: 26.25, f: 21, h: 15, i: 10.5 };
  const V = 1.7; // scaled up so the little stars read at our size
  const starData: [number, number, string][] = [
    [-600, -132, "a"], [-535, 177, "a"], [228, -228, "a"], [515, 258, "a"], [0, 330, "a"], [-295, 390, "a"],
    [0, 118, "b"], [85, 184, "b"], [-74, 184, "f"], [-37, 235, "h"], // Southern Cross
    [545, 323, "b"], [368, 477, "b"], [200, -37, "f"], [0, 575, "i"],
  ];
  const stars = starData.map(([x, y, sz]) => star(X(x), Y(y), SZ[sz] * s * V));
  return flag(
    "flag-brazil",
    "Brazil",
    "🇧🇷",
    [
      frame(),
      { hint: "Draw a big diamond 💎", color: OUTLINE, strokes: [diamond] },
      { hint: "Draw a circle inside ⭕", color: OUTLINE, strokes: [disc] },
      { hint: "Add a curvy band and stars ⭐", color: OUTLINE, strokes: [band] },
      colorStep([
        { d: RECT, color: "#009C3B" },
        { d: diamond, color: "#FFDF00" },
        { d: disc, color: "#002776" },
        ...stars.map((d) => ({ d, color: "#ffffff" })),
        { d: band, color: "#ffffff" },
        // A distinct dark green (not the field green) so the colour-step splitter
        // gives the text its OWN, last step — painted on TOP of the white band
        // instead of being hidden/flashed when the band (paper) fills after it.
        { d: bandText, color: "#064d1f" },
      ]),
    ],
    "Brazil's flag has a starry blue globe.",
  );
})();

const portugal = (() => {
  const bx = L + W * 0.4;
  const cy = 100;
  // Armillary sphere: a golden globe drawn as line-art — two concentric rings
  // with four short connectors (the equator/meridian peeking out around the
  // shield). It's ALL drawn in the badge step so colouring just fills the disc;
  // the rings deliberately sit AROUND the central shield (which is drawn on top)
  // so no guide line ever crosses it. (The old version only outlined the outer
  // circle, so the inner gold rings popped in as new shapes at colour time —
  // confusing to "colour".)
  const rOut = 22,
    rIn = 14;
  const sphere = circle(bx, cy, rOut);
  const innerRing = circle(bx, cy, rIn);
  const connectors = [
    `M ${n(bx + rIn)},${cy} L ${n(bx + rOut)},${cy}`, // equator, right of shield
    `M ${n(bx - rIn)},${cy} L ${n(bx - rOut)},${cy}`, // equator, left of shield
    `M ${bx},${n(cy - rOut)} L ${bx},${n(cy - rIn)}`, // meridian, above shield
    `M ${bx},${n(cy + rIn)} L ${bx},${n(cy + rOut)}`, // meridian, below shield
  ];
  // Shield: red with a white centre, pointed at the bottom.
  const shield = (w: number, top: number, bot: number) =>
    `M ${n(bx - w)},${n(top)} L ${n(bx + w)},${n(top)} L ${n(bx + w)},${n(bot - 6)} Q ${n(bx + w)},${n(bot)} ${bx},${n(bot)} Q ${n(bx - w)},${n(bot)} ${n(bx - w)},${n(bot - 6)} Z`;
  const shieldRed = shield(9, 86, 116);
  const shieldWhite = shield(5, 90, 110);
  return flag(
    "flag-portugal",
    "Portugal",
    "🇵🇹",
    [
      frame(),
      { hint: "Add a line down", color: OUTLINE, strokes: [`M ${n(bx)},${T} L ${n(bx)},${B}`] },
      {
        hint: "Draw a round badge on the line",
        color: OUTLINE,
        strokes: [sphere, innerRing, ...connectors, shieldRed, shieldWhite],
      },
      colorStep([
        { d: rectPath(L, T, bx, B), color: "#006600" },
        { d: rectPath(bx, T, R, B), color: "#FF0000" },
        { d: sphere, color: "#FFCC00" },
        { d: shieldRed, color: "#DA251D" },
        { d: shieldWhite, color: "#ffffff" },
      ]),
    ],
    "Portugal's flag has a golden sphere and a shield.",
  );
})();

const spain = (() => {
  // Red-yellow-red (1:2:1) with a simplified coat of arms toward the hoist.
  const t25 = T + H * 0.25,
    t75 = T + H * 0.75;
  const ex = 68,
    ey = 100;
  const pL = rectPath(ex - 18, ey - 9, ex - 13, ey + 16);
  const pR = rectPath(ex + 13, ey - 9, ex + 18, ey + 16);
  const capL = rectPath(ex - 19, ey - 13, ex - 12, ey - 9);
  const capR = rectPath(ex + 12, ey - 13, ex + 19, ey - 9);
  const shield = `M ${ex - 10},${ey - 9} L ${ex + 10},${ey - 9} L ${ex + 10},${ey + 6} Q ${ex + 10},${ey + 16} ${ex},${ey + 20} Q ${ex - 10},${ey + 16} ${ex - 10},${ey + 6} Z`;
  const crown = `M ${ex - 8},${ey - 11} L ${ex - 8},${ey - 16} L ${ex - 4},${ey - 13} L ${ex},${ey - 18} L ${ex + 4},${ey - 13} L ${ex + 8},${ey - 16} L ${ex + 8},${ey - 11} Z`;
  return flag(
    "flag-spain",
    "Spain",
    "🇪🇸",
    [
      frame(),
      { hint: "Add two lines across", color: OUTLINE, strokes: [`M ${L},${n(t25)} L ${R},${n(t25)}`, `M ${L},${n(t75)} L ${R},${n(t75)}`] },
      { hint: "Draw a shield and a crown 👑", color: OUTLINE, strokes: [pL, pR, shield, crown] },
      colorStep([
        { d: rectPath(L, T, R, t25), color: "#AA151B" },
        { d: rectPath(L, t25, R, t75), color: "#F1BF00" },
        { d: rectPath(L, t75, R, B), color: "#AA151B" },
        { d: pL, color: "#ffffff" },
        { d: pR, color: "#ffffff" },
        { d: capL, color: "#FABD00" },
        { d: capR, color: "#FABD00" },
        { d: shield, color: "#C60B1E" },
        { d: crown, color: "#FABD00" },
      ]),
    ],
    "Spain's flag has a crown and a shield.",
  );
})();

const india = (() => {
  const wheel = circle(100, 100, 13);
  const spokes: string[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    spokes.push(`M 100,100 L ${n(100 + 13 * Math.cos(a))},${n(100 + 13 * Math.sin(a))}`);
  }
  return flag(
    "flag-india",
    "India",
    "🇮🇳",
    [
      frame(),
      { hint: "Add 3 stripes across", color: OUTLINE, strokes: [`M ${L},${n(T + H / 3)} L ${R},${n(T + H / 3)}`, `M ${L},${n(T + (2 * H) / 3)} L ${R},${n(T + (2 * H) / 3)}`] },
      { hint: "Draw a wheel in the middle ☸️", color: OUTLINE, strokes: [wheel, ...spokes] },
      colorStep([
        { d: rectPath(L, T, R, T + H / 3), color: "#FF9933" },
        { d: rectPath(L, T + H / 3, R, T + (2 * H) / 3), color: "#ffffff" },
        { d: rectPath(L, T + (2 * H) / 3, R, B), color: "#138808" },
        { d: wheel, color: "#ffffff" },
      ]),
    ],
    "India's flag has a blue wheel in the middle.",
  );
})();

const greece = (() => {
  const stripes: { d: string; color: string }[] = [];
  const sh = H / 9;
  for (let i = 0; i < 9; i++)
    stripes.push({ d: rectPath(L, T + i * sh, R, T + (i + 1) * sh), color: i % 2 === 0 ? "#0D5EAF" : "#ffffff" });
  // Canton is a 5×5 square (5 stripe-widths each way), like the real flag.
  const cantonR = L + 5 * sh;
  const cantonB = T + 5 * sh;
  const canton = rectPath(L, T, cantonR, cantonB);
  const ccx = (L + cantonR) / 2,
    ccy = (T + cantonB) / 2;
  // A bold cross one stripe-width thick, reaching all the way to the canton edges.
  const arm = sh / 2;
  const cross = [
    rectPath(ccx - arm, T, ccx + arm, cantonB),
    rectPath(L, ccy - arm, cantonR, ccy + arm),
  ];
  // Single plus outline for the canton cross — no boxed-in square at the centre.
  const crossOutline = plusOutline(ccx - arm, ccx + arm, T, cantonB, L, cantonR, ccy - arm, ccy + arm);
  // Stripe dividers. The top five stripes are hidden behind the canton, so only
  // draw those from the canton's right edge — otherwise they'd cross the white
  // cross as stray black lines. Lower stripes span the full width.
  const lines: string[] = [];
  for (let i = 1; i < 9; i++) {
    const y = n(T + i * sh);
    lines.push(`M ${i < 5 ? n(cantonR) : L},${y} L ${R},${y}`);
  }
  return flag(
    "flag-greece",
    "Greece",
    "🇬🇷",
    [
      frame(),
      { hint: "Add 9 stripes across", color: OUTLINE, strokes: lines },
      { hint: "Add a cross in the corner ➕", color: OUTLINE, strokes: [canton, crossOutline] },
      colorStep([
        ...stripes,
        { d: canton, color: "#0D5EAF" },
        ...cross.map((d) => ({ d, color: "#ffffff" })),
      ]),
    ],
    "Greece's flag has nine blue and white stripes.",
  );
})();

const uae = (() => {
  const barR = L + W * 0.25;
  return flag(
    "flag-united-arab-emirates",
    "United Arab Emirates",
    "🇦🇪",
    [
      frame(),
      { hint: "Add a line down for the red bar", color: OUTLINE, strokes: [`M ${n(barR)},${T} L ${n(barR)},${B}`] },
      { hint: "Add 3 stripes across the rest", color: OUTLINE, strokes: [`M ${n(barR)},${n(T + H / 3)} L ${R},${n(T + H / 3)}`, `M ${n(barR)},${n(T + (2 * H) / 3)} L ${R},${n(T + (2 * H) / 3)}`] },
      colorStep([
        { d: rectPath(L, T, barR, B), color: "#FF0000" },
        { d: rectPath(barR, T, R, T + H / 3), color: "#009639" },
        { d: rectPath(barR, T + H / 3, R, T + (2 * H) / 3), color: "#ffffff" },
        { d: rectPath(barR, T + (2 * H) / 3, R, B), color: "#000000" },
      ]),
    ],
    "The UAE flag has four colours.",
  );
})();

// The adjective form of each country, so the player heading reads
// "How to draw a French flag" rather than "How to draw a France". Anything not
// listed falls back to "<Country> flag" (e.g. "New Zealand flag").
const DEMONYMS: Record<string, string> = {
  Switzerland: "Swiss",
  Denmark: "Danish",
  Sweden: "Swedish",
  Germany: "German",
  Netherlands: "Dutch",
  Norway: "Norwegian",
  "United Kingdom": "British",
  "United States": "American",
  Australia: "Australian",
  Canada: "Canadian",
  Singapore: "Singaporean",
  France: "French",
  Japan: "Japanese",
  China: "Chinese",
  Italy: "Italian",
  "United Arab Emirates": "Emirati",
  Spain: "Spanish",
  Finland: "Finnish",
  Austria: "Austrian",
  Belgium: "Belgian",
  Qatar: "Qatari",
  "South Korea": "South Korean",
  India: "Indian",
  Portugal: "Portuguese",
  Brazil: "Brazilian",
  Greece: "Greek",
  Ireland: "Irish",
};

/** Heading subject for a flag, e.g. "French flag" or "New Zealand flag". */
function flagTitle(name: string): string {
  return `${DEMONYMS[name] ?? name} flag`;
}

// Like the hard-mode drawings, every flag finishes with a "write the name"
// step — the country's name drawn one pen-stroke at a time, below the flag
// (which sits in the 40→160 band, leaving room beneath for the lettering).
// We also give each flag a `title` so the player heading reads "How to draw a
// French flag"; the card and the name-writing step still use the country name.
function withName(a: Animal): Animal {
  return {
    ...a,
    title: flagTitle(a.name),
    steps: [...a.steps, nameStep(a.name, { baseline: 195, height: 18 })],
  };
}

// ---------------------------------------------------------------------------
// The collection — in the order requested (the FIDI top-30, Denmark once).
// ---------------------------------------------------------------------------
export const flags: Animal[] = [
  switzerland,
  nordic("flag-denmark", "Denmark", "🇩🇰", "#C8102E", "#ffffff", undefined, "Denmark's flag is the oldest in the world!"),
  nordic("flag-sweden", "Sweden", "🇸🇪", "#006AA7", "#FECC00", undefined, "Sweden's flag has a yellow cross."),
  striped("flag-germany", "Germany", "🇩🇪", "h", [{ color: "#000000" }, { color: "#DD0000" }, { color: "#FFCE00" }], "Germany's flag is black, red and gold."),
  striped("flag-netherlands", "Netherlands", "🇳🇱", "h", [{ color: "#AE1C28" }, { color: "#ffffff" }, { color: "#21468B" }], "The Netherlands flag is red, white and blue."),
  nordic("flag-norway", "Norway", "🇳🇴", "#BA0C2F", "#ffffff", "#00205B", "Norway's flag has a cross inside a cross.", 30, 15),
  unitedKingdom,
  usa,
  australia,
  newZealand,
  canada,
  singapore,
  striped("flag-france", "France", "🇫🇷", "v", [{ color: "#0055A4" }, { color: "#ffffff" }, { color: "#EF4135" }], "France's flag is called the Tricolore."),
  japan,
  china,
  striped("flag-italy", "Italy", "🇮🇹", "v", [{ color: "#009246" }, { color: "#ffffff" }, { color: "#CE2B37" }], "Italy's flag is green, white and red."),
  uae,
  spain,
  nordic("flag-finland", "Finland", "🇫🇮", "#ffffff", "#003580", undefined, "Finland's flag has a blue cross."),
  striped("flag-austria", "Austria", "🇦🇹", "h", [{ color: "#ED2939" }, { color: "#ffffff" }, { color: "#ED2939" }], "Austria's flag is red, white, red."),
  striped("flag-belgium", "Belgium", "🇧🇪", "v", [{ color: "#000000" }, { color: "#FAE042" }, { color: "#ED2939" }], "Belgium's flag is black, yellow and red."),
  qatar,
  southKorea,
  india,
  portugal,
  brazil,
  greece,
  striped("flag-ireland", "Ireland", "🇮🇪", "v", [{ color: "#169B62" }, { color: "#ffffff" }, { color: "#FF883E" }], "Ireland's flag is green, white and orange."),
].map(withName);

export function isFlag(id: string): boolean {
  return flags.some((f) => f.id === id);
}
