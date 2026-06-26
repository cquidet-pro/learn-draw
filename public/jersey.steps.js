// MBAPPE #10 jersey — 20-step "draws itself" data (back view).
// viewBox is zoomed onto the jersey (still ~5:6 portrait) so it fills the frame.
// Each step lists ONLY the strokes introduced at that step; past strokes stay on
// screen. The last three steps add no strokes — they reveal colour fills in waves
// (red, then blue x2). Shared by the clickable page and the dev grid renderer.
//
// Geometry traced from the hand-drawn reference (measured on a coordinate grid):
//   - CONVEX A-line body: sides bow outward and the hem is the widest part
//     (NOT pinched/concave). shoulders x66/134, belly bulge ~x57/143, hem x60/140.
//   - Full cap sleeves, tips x22/178.
//   - "10" sits high (y77..142) and INSIDE the body with margin to the red stripes.
//   - Name just under the collar (y54..72), rendered WHITE on top of its outline.
(function (root) {
  const OUTLINE = "#15173a";
  const BLUE = "#1f47c2";
  const RED = "#d2232a";
  const WHITE = "#ffffff";

  const steps = [
    // 1 — body outline (fitted: widest at the chest, TIGHT waist, slim hem)
    { hint: "Draw the body — two sides and the bottom.", strokes: [
      "M 66,50 C 60,100 72,142 72,170 C 72,198 71,216 71,226 Q 100,231 129,226 C 129,216 128,198 128,170 C 128,142 140,100 134,50"
    ] },
    // 2 — sleeve tops
    { hint: "Add the top of each sleeve.", strokes: [
      "M 66,50 Q 47,54 30,74",
      "M 134,50 Q 153,54 170,74"
    ] },
    // 3 — sleeve undersides (close the sleeves)
    { hint: "Close the sleeves underneath.", strokes: [
      "M 30,74 Q 38,98 50,112 Q 56,114 63,108",
      "M 170,74 Q 162,98 150,112 Q 144,114 137,108"
    ] },
    // 4 — back collar
    { hint: "Draw the collar at the neck.", strokes: [
      "M 66,50 Q 82,45 88,44 Q 100,39 112,44 Q 118,45 134,50",
      "M 88,45 Q 100,51 112,45"
    ] },
    // 5 — side panel seam lines (inner edge of the red side stripes)
    { hint: "Add a line down each side.", strokes: [
      "M 77,120 C 80,150 80,185 79,224",
      "M 123,120 C 120,150 120,185 121,224"
    ] },
    // 6 — bottom hem line
    { hint: "Draw the hem line near the bottom.", strokes: [
      "M 78,218 Q 100,227 122,218"
    ] },
    // 7 — sleeve cuff bands
    { hint: "Add the cuff on each sleeve.", strokes: [
      "M 36,82 Q 42,98 52,110",
      "M 164,82 Q 158,98 148,110"
    ] },
    // 8 — number "1" front face
    { hint: 'Write a big "1".', strokes: [
      "M 76,92 L 88,77 L 88,135 L 95,135 L 95,142 L 72,142 L 72,135 L 81,135 L 81,89 L 76,92 Z"
    ] },
    // 9 — "1" 3-D side
    { hint: 'Give the "1" a 3-D side.', strokes: [
      "M 88,77 L 92,81 L 92,137 L 88,135 Z",
      "M 95,142 L 99,146 L 76,146 L 72,142 Z"
    ] },
    // 10 — number "0" front (outer ring)
    { hint: 'Now write the "0".', strokes: [
      "M 97,110 a 14,31 0 1,0 28,0 a 14,31 0 1,0 -28,0"
    ] },
    // 11 — "0" 3-D side (thin shadow hugging the lower-right of the ring)
    { hint: 'Give the "0" a 3-D side.', strokes: [
      "M 124,117 a 14,31 0 0,1 -8,24 l 4,4 a 16,33 0 0,0 8,-26 Z"
    ] },
    // 12 — "0" inner hole
    { hint: 'Open the middle of the "0".', strokes: [
      "M 104,110 a 7,16 0 1,0 14,0 a 7,16 0 1,0 -14,0"
    ] },
    // 13 — name letters M, B
    { hint: 'Start the name: "M" "B".', strokes: [
      "M 68,72 L 68,54 L 73,62 L 78,54 L 78,72",
      "M 79,72 L 79,54 L 86,54 Q 90,58 86,62 L 79,62 M 79,62 L 87,62 Q 91,67 86,72 L 79,72"
    ] },
    // 14 — name letters A, P
    { hint: 'Keep going: "A" "P".', strokes: [
      "M 90,72 L 94.5,54 L 99,72 M 91.5,66 L 97.5,66",
      "M 101,72 L 101,54 L 108,54 Q 112,58 108,62 L 101,62"
    ] },
    // 15 — name letters P, E
    { hint: 'Finish the name: "P" "E".', strokes: [
      "M 112,72 L 112,54 L 119,54 Q 123,58 119,62 L 112,62",
      "M 130,54 L 123,54 L 123,72 L 130,72 M 123,63 L 129,63"
    ] },
    // 16 — inner collar trim
    { hint: "Add the inside of the collar.", strokes: [
      "M 80,50 Q 100,55 120,50"
    ] },
    // 17 — shoulder seams + neck tag
    { hint: "Add the shoulder seams.", strokes: [
      "M 88,45 L 74,51",
      "M 112,45 L 126,51",
      "M 96,52 L 104,52 L 104,56 L 96,56 Z"
    ] },
    // 18 — colour: red trim
    { hint: "Colour the red parts! 🔴", strokes: [], fills: "red" },
    // 19 — colour: blue sleeves
    { hint: "Colour the sleeves blue! 🔵", strokes: [], fills: "blue-sleeves" },
    // 20 — colour: blue body
    { hint: "Colour it all blue — Allez les Bleus! 🎉", strokes: [], fills: "blue-body" }
  ];

  // Fill regions, revealed during the colour steps. Painted bottom->top in the
  // renderer's z-order: blue-body, blue-sleeves, red, white (number). The
  // "name-white" group is special — the renderer paints it LAST, on top of the
  // navy letter outlines, so the name reads as white letters with a thin edge.
  const fills = {
    red: [
      // side panels — stripe between the outer body edge and the seam line
      { d: "M 65,116 C 70,145 72,170 71,224 L 79,224 C 80,185 80,150 77,120 Z", color: RED },
      { d: "M 135,116 C 130,145 128,170 129,224 L 121,224 C 120,185 120,150 123,120 Z", color: RED },
      // cuffs
      { d: "M 30,74 Q 38,98 50,112 L 52,110 Q 42,98 36,82 Z", color: RED },
      { d: "M 170,74 Q 162,98 150,112 L 148,110 Q 158,98 164,82 Z", color: RED }
    ],
    "blue-sleeves": [
      { d: "M 66,50 Q 47,54 30,74 Q 38,98 50,112 Q 56,114 63,108 Z", color: BLUE },
      { d: "M 134,50 Q 153,54 170,74 Q 162,98 150,112 Q 144,114 137,108 Z", color: BLUE }
    ],
    "blue-body": [
      { d: "M 66,50 Q 82,45 88,44 Q 100,39 112,44 Q 118,45 134,50 C 140,100 128,142 128,170 C 128,198 129,216 129,226 Q 100,231 71,226 C 71,216 72,198 72,170 C 72,142 60,100 66,50 Z", color: BLUE }
    ],
    white: [
      // number faces, painted before colour so blue fills around them
      { d: "M 76,92 L 88,77 L 88,135 L 95,135 L 95,142 L 72,142 L 72,135 L 81,135 L 81,89 L 76,92 Z", color: WHITE },
      { d: "M 97,110 a 14,31 0 1,0 28,0 a 14,31 0 1,0 -28,0 M 104,110 a 7,16 0 1,1 14,0 a 7,16 0 1,1 -14,0", color: WHITE, evenodd: true }
    ],
    // Painted LAST (on top of the navy outlines) -> white letters, thin dark edge.
    "name-white": [
      { d: "M 68,72 L 68,54 L 73,62 L 78,54 L 78,72", stroke: WHITE, width: 2.4 },
      { d: "M 79,72 L 79,54 L 86,54 Q 90,58 86,62 L 79,62 M 79,62 L 87,62 Q 91,67 86,72 L 79,72", stroke: WHITE, width: 2.4 },
      { d: "M 90,72 L 94.5,54 L 99,72 M 91.5,66 L 97.5,66", stroke: WHITE, width: 2.4 },
      { d: "M 101,72 L 101,54 L 108,54 Q 112,58 108,62 L 101,62", stroke: WHITE, width: 2.4 },
      { d: "M 112,72 L 112,54 L 119,54 Q 123,58 119,62 L 112,62", stroke: WHITE, width: 2.4 },
      { d: "M 130,54 L 123,54 L 123,72 L 130,72 M 123,63 L 129,63", stroke: WHITE, width: 2.4 }
    ]
  };

  root.JERSEY = { viewBox: "14 28 172 212", outline: OUTLINE, steps, fills };
})(typeof window !== "undefined" ? window : globalThis);
