import type { Animal, DrawStep } from "./animals";

// "Flags of the World" — each flag is drawn in our style: dark outline strokes
// (the frame + the divisions/shapes) animate first, then a final step colours
// every region in. Flags live in a 3:2 box centred in the 200×200 canvas; a few
// (Switzerland, Qatar) use their own proportions. Complex national emblems are
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
  return { id, name, emoji, viewBox: "0 0 200 200", color: OUTLINE, fact, steps };
}

const rectPath = (x0: number, y0: number, x1: number, y1: number) =>
  `M ${n(x0)},${n(y0)} L ${n(x1)},${n(y0)} L ${n(x1)},${n(y1)} L ${n(x0)},${n(y1)} Z`;

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
): Animal {
  const cw = 16;
  const vx0 = L + 0.3 * W,
    vx1 = vx0 + cw;
  const cy = (T + B) / 2;
  const hy0 = cy - cw / 2,
    hy1 = cy + cw / 2;
  const vbar = rectPath(vx0, T, vx1, B);
  const hbar = rectPath(L, hy0, R, hy1);
  const fills = [
    { d: RECT, color: field },
    { d: vbar, color: cross },
    { d: hbar, color: cross },
  ];
  if (inner) {
    const iw = 6;
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
        strokes: [vbar, hbar],
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
  const sL = 34,
    sR = 166,
    sT = 34,
    sB = 166;
  const sq = rectPath(sL, sT, sR, sB);
  const cx = 100,
    cy = 100,
    t = 16,
    len = 44;
  const vbar = rectPath(cx - t, cy - len, cx + t, cy + len);
  const hbar = rectPath(cx - len, cy - t, cx + len, cy + t);
  return flag(
    "flag-switzerland",
    "Switzerland",
    "🇨🇭",
    [
      frame(sq),
      { hint: "Add a fat white cross in the middle ➕", color: OUTLINE, strokes: [vbar, hbar] },
      colorStep([
        { d: sq, color: "#D52B1E" },
        { d: vbar, color: "#ffffff" },
        { d: hbar, color: "#ffffff" },
      ]),
    ],
    "Switzerland's flag is a perfect square!",
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
  const stars: string[] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 5; c++) stars.push(star(L + 9 + c * 13, T + 8 + r * 13, 3.4));
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
      frame(),
      { hint: "Add crosses from corner to corner ✖️", color: OUTLINE, strokes: [`M ${L},${T} L ${R},${B}`, `M ${R},${T} L ${L},${B}`] },
      { hint: "Add a straight cross too ➕", color: OUTLINE, strokes: [`M 100,${T} L 100,${B}`, `M ${L},100 L ${R},100`] },
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
) => {
  // Blue/coloured field with a small Union Jack in the top-left + white stars.
  const cR = L + W * 0.5,
    cB = T + H * 0.5;
  const uj = unionJack(L, T, cR, cB);
  return flag(
    id,
    name,
    emoji,
    [
      frame(),
      { hint: "Make a little flag box in the corner", color: OUTLINE, strokes: [uj.box] },
      { hint: "Add the stars ⭐", color: OUTLINE, strokes: extraStars.map((s) => star(s.cx, s.cy, s.r)) },
      colorStep([
        { d: RECT, color: fieldColor },
        ...uj.fills,
        ...extraStars.map((s) => ({ d: star(s.cx, s.cy, s.r), color: "#ffffff" })),
      ]),
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
    { cx: 150, cy: 72, r: 6 },
    { cx: 166, cy: 100, r: 6 },
    { cx: 148, cy: 128, r: 6 },
    { cx: 134, cy: 100, r: 6 },
  ],
  "New Zealand's flag has four red stars.",
);

const canada = (() => {
  // White centre band, red sides, simplified red maple leaf.
  const b1 = L + W / 4,
    b2 = R - W / 4;
  const leaf =
    "M 100,66 L 103,80 L 114,75 L 110,86 L 124,86 L 116,96 L 128,104 L 112,106 L 116,118 L 104,112 L 100,128 L 96,112 L 84,118 L 88,106 L 72,104 L 84,96 L 76,86 L 90,86 L 86,75 L 97,80 Z";
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
  // crescent (two circles, the field colour cuts a bite)
  const cres = circle(58, 78, 17);
  const stars = [
    star(78, 64, 5),
    star(92, 74, 5),
    star(92, 90, 5),
    star(78, 100, 5),
    star(70, 82, 5),
  ];
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
        { d: circle(66, 78, 14), color: "#EF3340" },
        ...stars.map((d) => ({ d, color: "#ffffff" })),
      ]),
    ],
    "Singapore's flag has a moon and five stars.",
  );
})();

const southKorea = (() => {
  const cx = 100,
    cy = 100,
    r = 26;
  // taegeuk: red top half, blue bottom, split by an S of two half-circles
  const taegeuk = circle(cx, cy, r);
  // trigrams as little bar groups in the corners
  const bar = (x: number, y: number, w: number, broken: boolean) =>
    broken
      ? [rectPath(x, y, x + w * 0.42, y + 4), rectPath(x + w * 0.58, y, x + w, y + 4)]
      : [rectPath(x, y, x + w, y + 4)];
  const tg = (x: number, y: number, pattern: boolean[]) =>
    pattern.flatMap((b, i) => bar(x, y + i * 7, 26, b));
  const trigrams = [
    ...tg(28, 56, [false, false, false]),
    ...tg(146, 56, [false, true, false]),
    ...tg(28, 122, [false, true, true]),
    ...tg(146, 122, [true, true, true]),
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
        { d: `M ${n(cx - r)},${cy} a ${r},${r} 0 1,1 ${2 * r},0 a ${r / 2},${r / 2} 0 1,1 ${-r},0 a ${r / 2},${r / 2} 0 1,0 ${-r},0`, color: "#CD2E3A" },
        { d: `M ${n(cx + r)},${cy} a ${r},${r} 0 1,1 ${-2 * r},0 a ${r / 2},${r / 2} 0 1,1 ${r},0 a ${r / 2},${r / 2} 0 1,0 ${r},0`, color: "#0047A0" },
        ...trigrams.map((d) => ({ d, color: "#222222" })),
      ]),
    ],
    "South Korea's flag has a red-and-blue circle.",
  );
})();

const saudiArabia = (() => {
  // Green field with a white sword (no script — kept respectful and simple).
  const sword =
    "M 40,118 L 150,118 L 150,113 L 160,116 L 150,119 L 150,114 L 40,114 Z";
  const handle = "M 36,109 L 44,109 L 44,123 L 36,123 Z";
  const band = `M 44,86 L 156,86`;
  return flag(
    "flag-saudi-arabia",
    "Saudi Arabia",
    "🇸🇦",
    [
      frame(),
      { hint: "Draw a sword across 🗡️", color: OUTLINE, strokes: [sword, handle] },
      { hint: "Add a line above it", color: OUTLINE, strokes: [band] },
      colorStep([
        { d: RECT, color: "#006C35" },
        { d: sword, color: "#ffffff" },
        { d: handle, color: "#ffffff" },
      ]),
    ],
    "Saudi Arabia's flag is green with a sword.",
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
  const band = `M 78,96 Q 100,110 122,96`;
  return flag(
    "flag-brazil",
    "Brazil",
    "🇧🇷",
    [
      frame(),
      { hint: "Draw a big diamond 💎", color: OUTLINE, strokes: [diamond] },
      { hint: "Draw a circle inside ⭕", color: OUTLINE, strokes: [disc] },
      { hint: "Add a curvy band", color: OUTLINE, strokes: [band] },
      colorStep([
        { d: RECT, color: "#009C3B" },
        { d: diamond, color: "#FFDF00" },
        { d: disc, color: "#002776" },
        { d: `M 78,96 Q 100,110 122,96 L 122,90 Q 100,104 78,90 Z`, color: "#ffffff" },
      ]),
    ],
    "Brazil's flag has a green field and a blue globe.",
  );
})();

const portugal = (() => {
  const bx = L + W * 0.4;
  const ring = circle(bx, 100, 16);
  return flag(
    "flag-portugal",
    "Portugal",
    "🇵🇹",
    [
      frame(),
      { hint: "Add a line down", color: OUTLINE, strokes: [`M ${n(bx)},${T} L ${n(bx)},${B}`] },
      { hint: "Draw a round badge on the line", color: OUTLINE, strokes: [ring, rectPath(bx - 7, 92, bx + 7, 108)] },
      colorStep([
        { d: rectPath(L, T, bx, B), color: "#006600" },
        { d: rectPath(bx, T, R, B), color: "#FF0000" },
        { d: ring, color: "#FFCC00" },
        { d: rectPath(bx - 7, 92, bx + 7, 108), color: "#ffffff" },
      ]),
    ],
    "Portugal's flag is green and red with a badge.",
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
  const cantonR = L + 5 * (W / 13);
  const cantonB = T + 5 * sh;
  const canton = rectPath(L, T, cantonR, cantonB);
  const ccx = (L + cantonR) / 2,
    ccy = (T + cantonB) / 2;
  const cross = [
    rectPath(ccx - 5, T + 4, ccx + 5, cantonB - 4),
    rectPath(L + 4, ccy - 5, cantonR - 4, ccy + 5),
  ];
  const lines: string[] = [];
  for (let i = 1; i < 9; i++) lines.push(`M ${L},${n(T + i * sh)} L ${R},${n(T + i * sh)}`);
  return flag(
    "flag-greece",
    "Greece",
    "🇬🇷",
    [
      frame(),
      { hint: "Add lots of stripes across", color: OUTLINE, strokes: lines },
      { hint: "Add a cross in the corner ➕", color: OUTLINE, strokes: [canton, ...cross] },
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

// ---------------------------------------------------------------------------
// The collection — in the order requested (the FIDI top-30, Denmark once).
// ---------------------------------------------------------------------------
export const flags: Animal[] = [
  switzerland,
  nordic("flag-denmark", "Denmark", "🇩🇰", "#C8102E", "#ffffff", undefined, "Denmark's flag is the oldest in the world!"),
  nordic("flag-sweden", "Sweden", "🇸🇪", "#006AA7", "#FECC00", undefined, "Sweden's flag has a yellow cross."),
  striped("flag-germany", "Germany", "🇩🇪", "h", [{ color: "#000000" }, { color: "#DD0000" }, { color: "#FFCE00" }], "Germany's flag is black, red and gold."),
  striped("flag-netherlands", "Netherlands", "🇳🇱", "h", [{ color: "#AE1C28" }, { color: "#ffffff" }, { color: "#21468B" }], "The Netherlands flag is red, white and blue."),
  nordic("flag-norway", "Norway", "🇳🇴", "#BA0C2F", "#ffffff", "#00205B", "Norway's flag has a cross inside a cross."),
  unitedKingdom,
  usa,
  australia,
  canada,
  singapore,
  newZealand,
  striped("flag-france", "France", "🇫🇷", "v", [{ color: "#0055A4" }, { color: "#ffffff" }, { color: "#EF4135" }], "France's flag is called the Tricolore."),
  japan,
  china,
  striped("flag-italy", "Italy", "🇮🇹", "v", [{ color: "#009246" }, { color: "#ffffff" }, { color: "#CE2B37" }], "Italy's flag is green, white and red."),
  uae,
  striped("flag-spain", "Spain", "🇪🇸", "h", [{ color: "#AA151B", w: 1 }, { color: "#F1BF00", w: 2 }, { color: "#AA151B", w: 1 }], "Spain's flag has a wide yellow stripe."),
  nordic("flag-finland", "Finland", "🇫🇮", "#ffffff", "#003580", undefined, "Finland's flag has a blue cross."),
  striped("flag-austria", "Austria", "🇦🇹", "h", [{ color: "#ED2939" }, { color: "#ffffff" }, { color: "#ED2939" }], "Austria's flag is red, white, red."),
  striped("flag-belgium", "Belgium", "🇧🇪", "v", [{ color: "#000000" }, { color: "#FAE042" }, { color: "#ED2939" }], "Belgium's flag is black, yellow and red."),
  qatar,
  southKorea,
  saudiArabia,
  india,
  portugal,
  brazil,
  greece,
  striped("flag-ireland", "Ireland", "🇮🇪", "v", [{ color: "#169B62" }, { color: "#ffffff" }, { color: "#FF883E" }], "Ireland's flag is green, white and orange."),
];

export function isFlag(id: string): boolean {
  return flags.some((f) => f.id === id);
}
