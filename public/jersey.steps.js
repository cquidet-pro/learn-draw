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
    // 1 — body outline: widest at the chest, narrow WAIST in the middle, then
    // flares back OUT so the hem (bottom) is wider than the waist.
    { hint: "Draw the body — two sides and the bottom.", strokes: [
      "M 66,50 C 59,100 71,135 71,162 C 71,188 66,212 66,224 Q 100,230 134,224 C 134,212 129,188 129,162 C 129,135 141,100 134,50"
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
    // 5 — side accent lines (inner edge of the red flashes, upper sides only)
    { hint: "Add a short line on each upper side.", strokes: [
      "M 74,112 C 75,128 72,146 68,160",
      "M 126,112 C 125,128 128,146 132,160"
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
    // 13 — name letters M, B (outlined block letters; thin navy edge)
    { hint: 'Start the name: "M" "B".', strokes: [
      { d: "M 66,73 L 66,55 L 69.5,55 L 72.5,63 L 75.5,55 L 79,55 L 79,73 L 75.5,73 L 75.5,61 L 73.2,66 L 71.8,66 L 69.5,61 L 69.5,73 Z", w: 1 },
      { d: "M 79.6,55 L 86,55 Q 89.6,55 89.6,59.5 Q 89.6,62.5 87,63.5 Q 89.6,64.5 89.6,68.5 Q 89.6,73 86,73 L 79.6,73 Z M 83.1,58 L 85.5,58 Q 86.6,58 86.6,60 Q 86.6,62 85.5,62 L 83.1,62 Z M 83.1,66 L 85.5,66 Q 86.6,66 86.6,68.5 Q 86.6,70.5 85.5,70.5 L 83.1,70.5 Z", w: 1 }
    ] },
    // 14 — name letters A, P
    { hint: 'Keep going: "A" "P".', strokes: [
      { d: "M 90.2,73 L 95,55 L 96.4,55 L 101.2,73 L 97.7,73 L 96.9,70 L 94.5,70 L 93.7,73 Z M 95.7,61 L 96.9,66.5 L 94.5,66.5 Z", w: 1 },
      { d: "M 101.8,73 L 101.8,55 L 108.5,55 Q 111.8,55 111.8,60 Q 111.8,64.8 108.5,64.8 L 105.3,64.8 L 105.3,73 Z M 105.3,58 L 107.8,58 Q 108.8,58 108.8,60 Q 108.8,61.8 107.8,61.8 L 105.3,61.8 Z", w: 1 }
    ] },
    // 15 — name letters P, E
    { hint: 'Finish the name: "P" "E".', strokes: [
      { d: "M 112.4,73 L 112.4,55 L 119.1,55 Q 122.4,55 122.4,60 Q 122.4,64.8 119.1,64.8 L 115.9,64.8 L 115.9,73 Z M 115.9,58 L 118.4,58 Q 119.4,58 119.4,60 Q 119.4,61.8 118.4,61.8 L 115.9,61.8 Z", w: 1 },
      { d: "M 123,55 L 132,55 L 132,58 L 126.5,58 L 126.5,62.5 L 131,62.5 L 131,65.5 L 126.5,65.5 L 126.5,70 L 132,70 L 132,73 L 123,73 Z", w: 1 }
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
      // side flashes — tapered accents on the upper sides; they do NOT reach the hem
      { d: "M 59,109 C 60,128 64,148 68,160 C 72,144 75,126 74,112 C 68,107 64,107 59,109 Z", color: RED },
      { d: "M 141,109 C 140,128 136,148 132,160 C 128,144 125,126 126,112 C 132,107 136,107 141,109 Z", color: RED },
      // cuffs
      { d: "M 30,74 Q 38,98 50,112 L 52,110 Q 42,98 36,82 Z", color: RED },
      { d: "M 170,74 Q 162,98 150,112 L 148,110 Q 158,98 164,82 Z", color: RED }
    ],
    "blue-sleeves": [
      { d: "M 66,50 Q 47,54 30,74 Q 38,98 50,112 Q 56,114 63,108 Z", color: BLUE },
      { d: "M 134,50 Q 153,54 170,74 Q 162,98 150,112 Q 144,114 137,108 Z", color: BLUE }
    ],
    "blue-body": [
      { d: "M 66,50 Q 82,45 88,44 Q 100,39 112,44 Q 118,45 134,50 C 141,100 129,135 129,162 C 129,188 134,212 134,224 Q 100,230 66,224 C 66,212 71,188 71,162 C 71,135 59,100 66,50 Z", color: BLUE }
    ],
    white: [
      // number faces, painted before colour so blue fills around them
      { d: "M 76,92 L 88,77 L 88,135 L 95,135 L 95,142 L 72,142 L 72,135 L 81,135 L 81,89 L 76,92 Z", color: WHITE },
      { d: "M 97,110 a 14,31 0 1,0 28,0 a 14,31 0 1,0 -28,0 M 104,110 a 7,16 0 1,1 14,0 a 7,16 0 1,1 -14,0", color: WHITE, evenodd: true }
    ],
    // White fills of the block letters; the navy letter outlines (steps 13-15,
    // thin strokes) are drawn on top -> clean white letters with a thin edge.
    "name-white": [
      { d: "M 66,73 L 66,55 L 69.5,55 L 72.5,63 L 75.5,55 L 79,55 L 79,73 L 75.5,73 L 75.5,61 L 73.2,66 L 71.8,66 L 69.5,61 L 69.5,73 Z", color: WHITE },
      { d: "M 79.6,55 L 86,55 Q 89.6,55 89.6,59.5 Q 89.6,62.5 87,63.5 Q 89.6,64.5 89.6,68.5 Q 89.6,73 86,73 L 79.6,73 Z M 83.1,58 L 85.5,58 Q 86.6,58 86.6,60 Q 86.6,62 85.5,62 L 83.1,62 Z M 83.1,66 L 85.5,66 Q 86.6,66 86.6,68.5 Q 86.6,70.5 85.5,70.5 L 83.1,70.5 Z", color: WHITE, evenodd: true },
      { d: "M 90.2,73 L 95,55 L 96.4,55 L 101.2,73 L 97.7,73 L 96.9,70 L 94.5,70 L 93.7,73 Z M 95.7,61 L 96.9,66.5 L 94.5,66.5 Z", color: WHITE, evenodd: true },
      { d: "M 101.8,73 L 101.8,55 L 108.5,55 Q 111.8,55 111.8,60 Q 111.8,64.8 108.5,64.8 L 105.3,64.8 L 105.3,73 Z M 105.3,58 L 107.8,58 Q 108.8,58 108.8,60 Q 108.8,61.8 107.8,61.8 L 105.3,61.8 Z", color: WHITE, evenodd: true },
      { d: "M 112.4,73 L 112.4,55 L 119.1,55 Q 122.4,55 122.4,60 Q 122.4,64.8 119.1,64.8 L 115.9,64.8 L 115.9,73 Z M 115.9,58 L 118.4,58 Q 119.4,58 119.4,60 Q 119.4,61.8 118.4,61.8 L 115.9,61.8 Z", color: WHITE, evenodd: true },
      { d: "M 123,55 L 132,55 L 132,58 L 126.5,58 L 126.5,62.5 L 131,62.5 L 131,65.5 L 126.5,65.5 L 126.5,70 L 132,70 L 132,73 L 123,73 Z", color: WHITE }
    ]
  };

  root.JERSEY = { viewBox: "14 28 172 212", outline: OUTLINE, steps, fills };
})(typeof window !== "undefined" ? window : globalThis);
