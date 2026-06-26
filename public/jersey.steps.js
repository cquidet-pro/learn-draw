// MBAPPE #10 jersey — 20-step "draws itself" data (back view).
// viewBox 0 0 200 240 (taller than wide). Each step lists ONLY the strokes
// introduced at that step; past strokes stay on screen. The last three steps
// add no strokes — they reveal colour fills in waves (red, then blue x2).
// Shared by the clickable preview page and the dev grid renderer.
//
// Geometry traced from the hand-drawn reference (measured on a coordinate grid):
// the jersey is SLENDER — ~139 units wide, centred on x100. Sleeve tips reach
// x31 / x169; shoulders x68 / x132; body tapers to a 52-wide hem. The "10" sits
// high (y82..138) and fits inside the body with margin to the red side stripes;
// the name sits just under the collar (y60..74).
(function (root) {
  const OUTLINE = "#15173a";
  const BLUE = "#1f47c2";
  const RED = "#d2232a";
  const WHITE = "#ffffff";

  const steps = [
    // 1 — body outline (sides + bottom, top open)
    { hint: "Draw the body — two sides and the bottom.", strokes: [
      "M 68,52 C 63,90 64,150 74,212 Q 100,221 126,212 C 136,150 137,90 132,52"
    ] },
    // 2 — sleeve tops
    { hint: "Add the top of each sleeve.", strokes: [
      "M 68,52 Q 48,56 31,74",
      "M 132,52 Q 152,56 169,74"
    ] },
    // 3 — sleeve undersides (close the sleeves)
    { hint: "Close the sleeves underneath.", strokes: [
      "M 31,74 Q 40,96 52,108 Q 60,110 64,104",
      "M 169,74 Q 160,96 148,108 Q 140,110 136,104"
    ] },
    // 4 — back collar
    { hint: "Draw the collar at the neck.", strokes: [
      "M 68,52 Q 82,48 88,47 Q 100,43 112,47 Q 118,48 132,52",
      "M 88,48 Q 100,53 112,48"
    ] },
    // 5 — side panel seam lines (inner edge of the red side stripes)
    { hint: "Add a line down each side.", strokes: [
      "M 74,110 C 72,150 74,185 78,210",
      "M 126,110 C 128,150 126,185 122,210"
    ] },
    // 6 — bottom hem line
    { hint: "Draw the hem line near the bottom.", strokes: [
      "M 78,206 Q 100,215 122,206"
    ] },
    // 7 — sleeve cuff bands
    { hint: "Add the cuff on each sleeve.", strokes: [
      "M 38,80 Q 44,94 54,106",
      "M 162,80 Q 156,94 146,106"
    ] },
    // 8 — number "1" front face
    { hint: 'Write a big "1".', strokes: [
      "M 79,93 L 90,81 L 90,132 L 96,132 L 96,138 L 76,138 L 76,132 L 84,132 L 84,91 L 80,94 Z"
    ] },
    // 9 — "1" 3-D side
    { hint: 'Give the "1" a 3-D side.', strokes: [
      "M 90,81 L 94,85 L 94,134 L 90,132 Z",
      "M 96,138 L 100,142 L 80,142 L 76,138 Z"
    ] },
    // 10 — number "0" front (outer ring)
    { hint: 'Now write the "0".', strokes: [
      "M 98,110 a 12,28 0 1,0 24,0 a 12,28 0 1,0 -24,0"
    ] },
    // 11 — "0" 3-D side (thin shadow hugging the lower-right of the ring)
    { hint: 'Give the "0" a 3-D side.', strokes: [
      "M 121,116 a 12,28 0 0,1 -7,21 l 4,4 a 14,30 0 0,0 7,-23 Z"
    ] },
    // 12 — "0" inner hole
    { hint: 'Open the middle of the "0".', strokes: [
      "M 104,110 a 6,15 0 1,0 12,0 a 6,15 0 1,0 -12,0"
    ] },
    // 13 — name letters M, B
    { hint: 'Start the name: "M" "B".', strokes: [
      "M 70,76 L 70,58 L 75,66 L 80,58 L 80,76",
      "M 81,76 L 81,58 L 88,58 Q 92,62 88,66 L 81,66 M 81,66 L 89,66 Q 93,71 88,76 L 81,76"
    ] },
    // 14 — name letters A, P
    { hint: 'Keep going: "A" "P".', strokes: [
      "M 92,76 L 96.5,58 L 101,76 M 93.5,70 L 99.5,70",
      "M 103,76 L 103,58 L 110,58 Q 114,62 110,66 L 103,66"
    ] },
    // 15 — name letters P, E
    { hint: 'Finish the name: "P" "E".', strokes: [
      "M 114,76 L 114,58 L 121,58 Q 125,62 121,66 L 114,66",
      "M 132,58 L 125,58 L 125,76 L 132,76 M 125,67 L 131,67"
    ] },
    // 16 — inner collar trim
    { hint: "Add the inside of the collar.", strokes: [
      "M 80,52 Q 100,57 120,52"
    ] },
    // 17 — shoulder seams + neck tag
    { hint: "Add the shoulder seams.", strokes: [
      "M 88,48 L 74,53",
      "M 112,48 L 126,53",
      "M 96,55 L 104,55 L 104,59 L 96,59 Z"
    ] },
    // 18 — colour: red trim
    { hint: "Colour the red parts! 🔴", strokes: [], fills: "red" },
    // 19 — colour: blue sleeves
    { hint: "Colour the sleeves blue! 🔵", strokes: [], fills: "blue-sleeves" },
    // 20 — colour: blue body
    { hint: "Colour it all blue — Allez les Bleus! 🎉", strokes: [], fills: "blue-body" }
  ];

  // Fill regions, revealed during the colour steps. Painted bottom->top in the
  // renderer's z-order: blue-body, blue-sleeves, red, white (number), name-white.
  const fills = {
    red: [
      // side panels — stripe between the outer body edge and the seam line
      { d: "M 64,104 C 63,150 70,185 74,210 L 78,210 C 74,185 72,150 74,110 Z", color: RED },
      { d: "M 136,104 C 137,150 130,185 126,210 L 122,210 C 126,185 128,150 126,110 Z", color: RED },
      // cuffs
      { d: "M 31,74 Q 40,96 52,108 L 54,106 Q 44,94 38,80 Z", color: RED },
      { d: "M 169,74 Q 160,96 148,108 L 146,106 Q 156,94 162,80 Z", color: RED }
    ],
    "blue-sleeves": [
      { d: "M 68,52 Q 48,56 31,74 Q 40,96 52,108 Q 60,110 64,104 Z", color: BLUE },
      { d: "M 132,52 Q 152,56 169,74 Q 160,96 148,108 Q 140,110 136,104 Z", color: BLUE }
    ],
    "blue-body": [
      { d: "M 68,52 Q 82,48 88,47 Q 100,43 112,47 Q 118,48 132,52 C 137,90 136,150 126,212 Q 100,221 74,212 C 64,150 63,90 68,52 Z", color: BLUE }
    ],
    white: [
      // number faces, painted before colour so blue fills around them
      { d: "M 79,93 L 90,81 L 90,132 L 96,132 L 96,138 L 76,138 L 76,132 L 84,132 L 84,91 L 80,94 Z", color: WHITE },
      { d: "M 98,110 a 12,28 0 1,0 24,0 a 12,28 0 1,0 -24,0 M 104,110 a 6,15 0 1,1 12,0 a 6,15 0 1,1 -12,0", color: WHITE, evenodd: true }
    ],
    // White name on top of the navy letter outlines -> white letters, thin dark edge.
    "name-white": [
      { d: "M 70,76 L 70,58 L 75,66 L 80,58 L 80,76", stroke: WHITE, width: 2.4 },
      { d: "M 81,76 L 81,58 L 88,58 Q 92,62 88,66 L 81,66 M 81,66 L 89,66 Q 93,71 88,76 L 81,76", stroke: WHITE, width: 2.4 },
      { d: "M 92,76 L 96.5,58 L 101,76 M 93.5,70 L 99.5,70", stroke: WHITE, width: 2.4 },
      { d: "M 103,76 L 103,58 L 110,58 Q 114,62 110,66 L 103,66", stroke: WHITE, width: 2.4 },
      { d: "M 114,76 L 114,58 L 121,58 Q 125,62 121,66 L 114,66", stroke: WHITE, width: 2.4 },
      { d: "M 132,58 L 125,58 L 125,76 L 132,76 M 125,67 L 131,67", stroke: WHITE, width: 2.4 }
    ]
  };

  root.JERSEY = { viewBox: "0 0 200 240", outline: OUTLINE, steps, fills };
})(typeof window !== "undefined" ? window : globalThis);
