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

// A five-pointed star.
function star(cx: number, cy: number, r: number, rotDeg = -90): string {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const ao = ((rotDeg + i * 72) * Math.PI) / 180;
    pts.push(`${n(cx + r * Math.cos(ao))},${n(cy + r * Math.sin(ao))}`);
    const ai = ((rotDeg + i * 72 + 36) * Math.PI) / 180;
    pts.push(`${n(cx + r * 0.5 * Math.cos(ai))},${n(cy + r * 0.5 * Math.sin(ai))}`);
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
        hint: dir === "v" ? "Add stripes up and down" : "Add stripes across",
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
  const stripeH = H / 13;
  const stripes: string[] = [];
  for (let i = 1; i < 13; i++) stripes.push(`M ${L},${n(T + i * stripeH)} L ${R},${n(T + i * stripeH)}`);
  const cantonR = L + W * 0.42;
  const cantonB = T + stripeH * 7;
  const canton = rectPath(L, T, cantonR, cantonB);
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
      { hint: "Add the stripes across", color: OUTLINE, strokes: stripes },
      { hint: "Add a box in the corner for the stars", color: OUTLINE, strokes: [canton] },
      colorStep([
        ...stripeFills,
        { d: canton, color: "#3C3B6E" },
        ...stars.map((d) => ({ d, color: "#ffffff" })),
      ]),
    ],
    "The USA flag has 13 stripes and 50 stars!",
  );
})();

const unionJack = (cL: number, cT: number, cR: number, cB: number) => {
  // A simplified Union Jack inside the given box. Returns { strokes, fills }.
  const cw = (cR - cL),
    ch = (cB - cT);
  const cx = (cL + cR) / 2,
    cy = (cT + cB) / 2;
  const navy = "#012169",
    red = "#C8102E",
    white = "#ffffff";
  const tW = Math.min(cw, ch) * 0.18; // cross thickness
  const fills = [
    { d: rectPath(cL, cT, cR, cB), color: navy },
    // white diagonals (two thick bands corner-to-corner, approximated as filled quads)
    {
      d: `M ${n(cL)},${n(cT)} L ${n(cL + tW)},${n(cT)} L ${n(cR)},${n(cB - tW)} L ${n(cR)},${n(cB)} L ${n(cR - tW)},${n(cB)} L ${n(cL)},${n(cT + tW)} Z`,
      color: white,
    },
    {
      d: `M ${n(cR)},${n(cT)} L ${n(cR)},${n(cT + tW)} L ${n(cL + tW)},${n(cB)} L ${n(cL)},${n(cB)} L ${n(cL)},${n(cB - tW)} L ${n(cR - tW)},${n(cT)} Z`,
      color: white,
    },
    // red diagonals (thinner, along the same lines)
    {
      d: `M ${n(cL)},${n(cT)} L ${n(cL + tW * 0.6)},${n(cT)} L ${n(cR)},${n(cB - tW * 0.6)} L ${n(cR)},${n(cB)} Z`,
      color: red,
    },
    {
      d: `M ${n(cR)},${n(cT)} L ${n(cR)},${n(cT + tW * 0.6)} L ${n(cL + tW * 0.6)},${n(cB)} L ${n(cL)},${n(cB)} Z`,
      color: red,
    },
    // white upright cross
    { d: rectPath(cx - tW * 0.9, cT, cx + tW * 0.9, cB), color: white },
    { d: rectPath(cL, cy - tW * 0.9, cR, cy + tW * 0.9), color: white },
    // red upright cross
    { d: rectPath(cx - tW * 0.5, cT, cx + tW * 0.5, cB), color: red },
    { d: rectPath(cL, cy - tW * 0.5, cR, cy + tW * 0.5), color: red },
  ];
  return { fills, box: rectPath(cL, cT, cR, cB) };
};

const unitedKingdom = (() => {
  const uj = unionJack(L, T, R, B);
  return flag(
    "flag-united-kingdom",
    "United Kingdom",
    "🇬🇧",
    [
      // No internal guide strokes: any line we draw would stay visible on top of
      // the finished flag (the diagonals/cross can't be traced without leaving
      // stray lines). The Union Jack forms during the colour step instead.
      frame(),
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
  extraStars: { cx: number; cy: number; r: number }[],
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
  const starFills = extraStars.flatMap((s) =>
    starBorder
      ? [
          { d: star(s.cx, s.cy, s.r), color: starBorder },
          { d: star(s.cx, s.cy, s.r * 0.62), color: starColor },
        ]
      : [{ d: star(s.cx, s.cy, s.r), color: starColor }],
  );
  return flag(
    id,
    name,
    emoji,
    [
      frame(),
      { hint: "Make a little flag box in the corner", color: OUTLINE, strokes: [uj.box] },
      { hint: "Add the stars ⭐", color: OUTLINE, strokes: extraStars.map((s) => star(s.cx, s.cy, s.r)) },
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
    { cx: 50, cy: 132, r: 9 }, // Commonwealth star
    { cx: 150, cy: 70, r: 6 },
    { cx: 168, cy: 92, r: 6 },
    { cx: 150, cy: 116, r: 6 },
    { cx: 132, cy: 96, r: 5 },
    { cx: 158, cy: 134, r: 4 },
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
  const sx = 96,
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
  const diamond = `M 100,${T + 8} L ${R - 14},100 L 100,${B - 8} L ${L + 14},100 Z`;
  const disc = circle(100, 100, 26);
  // White band sweeping across the globe, low-left to upper-right, curving down
  // in the middle (concave up) — like the real flag.
  const band = `M 77,100 Q 100,116 123,90 L 123,84 Q 100,110 77,94 Z`;
  // Stars scattered across the blue globe (a starry sky), avoiding the band.
  const starPts: [number, number, number][] = [
    [88, 84, 2.4], [100, 80, 2], [111, 86, 2.2],
    [82, 106, 2.4], [92, 112, 2.8], [102, 106, 2], [112, 110, 2.4], [120, 102, 1.8],
    [88, 122, 2.2], [100, 119, 2.6], [110, 123, 2.2], [95, 128, 1.8], [106, 130, 1.8], [118, 116, 2],
  ];
  const stars = starPts.map(([x, y, r]) => star(x, y, r));
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
      ]),
    ],
    "Brazil's flag has a starry blue globe.",
  );
})();

const portugal = (() => {
  const bx = L + W * 0.4;
  const cy = 100;
  // Armillary sphere: a golden disc with darker ring lines (equator + meridian)
  // suggesting the open sphere of the real badge.
  const sphere = circle(bx, cy, 22);
  const ringH = rectPath(bx - 22, cy - 2.5, bx + 22, cy + 2.5); // equator
  const ringV = rectPath(bx - 2.5, cy - 22, bx + 2.5, cy + 22); // meridian
  const ringMid = circle(bx, cy, 14);
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
      { hint: "Draw a round badge on the line", color: OUTLINE, strokes: [sphere, shieldRed] },
      colorStep([
        { d: rectPath(L, T, bx, B), color: "#006600" },
        { d: rectPath(bx, T, R, B), color: "#FF0000" },
        { d: sphere, color: "#FFCC00" },
        { d: ringMid, color: "#E0A000" },
        { d: ringH, color: "#E0A000" },
        { d: ringV, color: "#E0A000" },
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
      { hint: "Add stripes across", color: OUTLINE, strokes: [`M ${L},${n(T + H / 3)} L ${R},${n(T + H / 3)}`, `M ${L},${n(T + (2 * H) / 3)} L ${R},${n(T + (2 * H) / 3)}`] },
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
      { hint: "Add lots of stripes across", color: OUTLINE, strokes: lines },
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
      { hint: "Add stripes across the rest", color: OUTLINE, strokes: [`M ${n(barR)},${n(T + H / 3)} L ${R},${n(T + H / 3)}`, `M ${n(barR)},${n(T + (2 * H) / 3)} L ${R},${n(T + (2 * H) / 3)}`] },
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
