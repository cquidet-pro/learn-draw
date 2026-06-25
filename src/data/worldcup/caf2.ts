import type { Animal } from "../animals";
import {
  RECT,
  L,
  R,
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
  clipPoly,
  n,
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

// 4. South Africa — the famous Y / pall flag. Geometry mapped 1:1 from the
// official Flag of South Africa SVG (a 90×60 design) into our 180×120 box: every
// ref unit → 2 of ours, so the skeleton is topleft (10,40), botleft (10,160),
// fork (100,100) and fly-centre (190,100). The Y is drawn the way the real flag
// is — as CONSTANT-WIDTH bands swept along that skeleton — so the green arms are
// the same thickness everywhere (the previous hand-traced hexagons pinched). The
// stacking (document order = paint order) matches the SVG: red top + blue bottom,
// then the white pall (sw 40), then the black triangle, the gold rim over its
// edge, and finally the green pall (sw 24) on top. The 8-unit white border on the
// fly side and the gold border on the hoist side are the leftover rims of the
// wider white band peeking out past the narrower green Y.
const southAfrica = (() => {
  type Pt = [number, number];
  const cy = (T + B) / 2; // 100
  const K: Pt = [L + W * 0.5, cy]; // fork (100,100)
  const FC: Pt = [R, cy]; // fly centre (190,100)
  const TL: Pt = [L, T]; // top-hoist corner (10,40)
  const BL: Pt = [L, B]; // bottom-hoist corner (10,160)

  const unit = (a: Pt, b: Pt): Pt => {
    const dx = b[0] - a[0],
      dy = b[1] - a[1],
      l = Math.hypot(dx, dy);
    return [dx / l, dy / l];
  };
  const perp = (u: Pt): Pt => [-u[1], u[0]];
  const uH = unit(K, FC); // horizontal arm → fly
  const uU = unit(K, TL); // upper diagonal arm → top-hoist corner
  const uLo = unit(K, BL); // lower diagonal arm → bottom-hoist corner

  const box: Pt[] = [
    [L, T],
    [R, T],
    [R, B],
    [L, B],
  ];
  const toPath = (pts: Pt[]) =>
    "M " + pts.map(([x, y]) => `${n(x)},${n(y)}`).join(" L ") + " Z";
  // An edge line of a band: the centre line (through K along u) shifted s·hw
  // along the perpendicular. Returned as a point + direction.
  const edge = (u: Pt, s: number, hw: number) => {
    const q = perp(u);
    return { p: [K[0] + q[0] * s * hw, K[1] + q[1] * s * hw] as Pt, d: u };
  };
  // Intersection of two infinite lines (point + direction each).
  const meet = (a: { p: Pt; d: Pt }, b: { p: Pt; d: Pt }): Pt => {
    const den = a.d[0] * -b.d[1] - a.d[1] * -b.d[0];
    const t = ((b.p[0] - a.p[0]) * -b.d[1] - (b.p[1] - a.p[1]) * -b.d[0]) / den;
    return [a.p[0] + t * a.d[0], a.p[1] + t * a.d[1]];
  };
  const atX = (e: { p: Pt; d: Pt }, x: number): Pt => {
    const t = (x - e.p[0]) / e.d[0];
    return [x, e.p[1] + t * e.d[1]];
  };

  // The pall (half-width hw) as ONE clean Y polygon, traced around its boundary.
  // Every fork corner is the exact MITER intersection of the two adjacent OUTER
  // band edges — so the width is constant and the borders meet in sharp points
  // (no stepped notches). The hoist side dips in through the wedge apex (where the
  // two diagonal arms' INNER edges cross), keeping the hoist wedge OPEN for the
  // black triangle instead of filling it solid. Ends are taken past the frame at
  // x = L (and clipped to the box afterwards) so the arms meet the hoist cleanly.
  const pall = (hw: number): Pt[] => {
    const hTop = edge(uH, -1, hw); // horizontal arm, top edge (y = cy − hw)
    const hBot = edge(uH, +1, hw); // horizontal arm, bottom edge
    // For each diagonal arm, "outer" = the side further from the centre line
    // (toward the flag's top/bottom corner), "inner" = the side facing the
    // horizontal arm / the wedge.
    const upSide = perp(uU)[1] < 0 ? +1 : -1;
    const upOut = edge(uU, upSide, hw),
      upIn = edge(uU, -upSide, hw);
    const loSide = perp(uLo)[1] > 0 ? +1 : -1;
    const loOut = edge(uLo, loSide, hw),
      loIn = edge(uLo, -loSide, hw);
    return [
      atX(upOut, L), // up-arm OUTER edge at the hoist (top-left)
      meet(upOut, hTop), // top fork miter (outer)
      atX(hTop, R), // horizontal top edge at the fly
      atX(hBot, R), // horizontal bottom edge at the fly
      meet(loOut, hBot), // bottom fork miter (outer)
      atX(loOut, L), // lo-arm OUTER edge at the hoist (bottom-left)
      atX(loIn, L), // lo-arm INNER edge at the hoist
      meet(loIn, upIn), // inner wedge apex (between the diagonals)
      atX(upIn, L), // up-arm INNER edge at the hoist
    ];
  };
  const clipBox = (pts: Pt[]) => toPath(clipPoly(pts, box));

  // Green Y: ref sw 12 → half-width 12. White pall: ref sw 20 → half-width 20, so
  // it pokes 8 units past the green on every side (that rim is the fimbriation).
  const greenPall = clipBox(pall(12));
  const whitePall = clipBox(pall(20));

  // Black hoist triangle (sitting in the wedge), plus the gold rim = the SAME
  // white-width pall clipped to the triangle. That keeps only the white band's
  // hoist-side rims (the parts inside the triangle), so gold shows ONLY on the
  // hoist side; the band's fly-side rims stay white. Black fills the wedge under
  // it, and the narrower green Y (12) painted on top covers all but the 8-unit
  // gold rim — exactly as thin as the white fimbriation.
  const tri: Pt[] = [TL, K, BL];
  const blackTri = toPath(tri);
  const goldRim = toPath(clipPoly(pall(20), tri));

  const redRegion = rectPath(L, T, R, cy);
  const blueRegion = rectPath(L, cy, R, B);

  return flag(
    "flag-south-africa",
    "South Africa",
    "🇿🇦",
    [
      frame(),
      // The Y-shaped band (outline its outer white edge) and the gold-rimmed
      // black triangle at the hoist.
      { hint: "Draw a sideways Y across the flag", color: "#3a3a55", strokes: [whitePall] },
      { hint: "Draw a triangle at the left edge 🔺", color: "#3a3a55", strokes: [blackTri] },
      colorStep([
        { d: redRegion, color: "#E03C31" }, // top band (above the Y)
        { d: blueRegion, color: "#001489" }, // bottom band (below the Y)
        { d: whitePall, color: "#ffffff" }, // white pall (border under the green)
        { d: blackTri, color: "#000000" }, // black hoist triangle
        { d: goldRim, color: "#FFB81C" }, // gold rim over the triangle edge
        { d: greenPall, color: "#007749" }, // green Y on top — constant width
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
