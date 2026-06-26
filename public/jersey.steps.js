// MBAPPE #10 jersey — 20-step "draws itself" data (back view).
// viewBox 0 0 200 240 (taller than wide). Each step lists ONLY the strokes
// introduced at that step; past strokes stay on screen. The last three steps
// add no strokes — they reveal colour fills in waves (red, then blue x2).
// Shared by the clickable preview page and the dev grid renderer.
//
// Geometry (matches the hand-drawn reference: wide body + full cap sleeves):
//   shoulders L(55,58) R(145,58) · hem corners L(64,208) R(136,208)
//   underarms L(56,108) R(144,108) · sleeve tips L(12,86) R(188,86)
//   number "10" centred ~x100, fits between the red side stripes (x75..125)
(function (root) {
  const OUTLINE = "#15173a";
  const BLUE = "#1f47c2";
  const RED = "#d2232a";
  const WHITE = "#ffffff";

  const steps = [
    // 1 — body outline (sides + bottom, top open)
    { hint: "Draw the body — two sides and the bottom.", strokes: [
      "M 55,58 C 52,112 57,175 64,208 Q 100,221 136,208 C 143,175 148,112 145,58"
    ] },
    // 2 — sleeve tops
    { hint: "Add the top of each sleeve.", strokes: [
      "M 55,58 Q 34,62 12,86",
      "M 145,58 Q 166,62 188,86"
    ] },
    // 3 — sleeve undersides (close the sleeves)
    { hint: "Close the sleeves underneath.", strokes: [
      "M 12,86 Q 20,104 32,110 Q 45,113 56,108",
      "M 188,86 Q 180,104 168,110 Q 155,113 144,108"
    ] },
    // 4 — back collar
    { hint: "Draw the collar at the neck.", strokes: [
      "M 55,58 Q 70,54 78,53 Q 100,47 122,53 Q 130,54 145,58",
      "M 78,54 Q 100,60 122,54"
    ] },
    // 5 — side panel seam lines (inner edge of the red side stripes)
    { hint: "Add a line down each side.", strokes: [
      "M 76,110 C 74,150 76,182 78,205",
      "M 124,110 C 126,150 124,182 122,205"
    ] },
    // 6 — bottom hem line
    { hint: "Draw the hem line near the bottom.", strokes: [
      "M 70,202 Q 100,214 130,202"
    ] },
    // 7 — sleeve cuff bands
    { hint: "Add the cuff on each sleeve.", strokes: [
      "M 22,90 Q 28,102 38,109",
      "M 178,90 Q 172,102 162,109"
    ] },
    // 8 — number "1" front face
    { hint: 'Write a big "1".', strokes: [
      "M 79,128 L 92,114 L 92,172 L 98,172 L 98,179 L 77,179 L 77,172 L 86,172 L 86,126 L 81,129 Z"
    ] },
    // 9 — "1" 3-D side
    { hint: 'Give the "1" a 3-D side.', strokes: [
      "M 92,114 L 96,118 L 96,174 L 92,172 Z",
      "M 98,179 L 102,183 L 81,183 L 77,179 Z"
    ] },
    // 10 — number "0" front (outer ring)
    { hint: 'Now write the "0".', strokes: [
      "M 97,142 a 13,30 0 1,0 26,0 a 13,30 0 1,0 -26,0"
    ] },
    // 11 — "0" 3-D side (thin shadow hugging the lower-right of the ring)
    { hint: 'Give the "0" a 3-D side.', strokes: [
      "M 122,149 a 13,30 0 0,1 -8,23 l 4,4 a 15,32 0 0,0 8,-25 Z"
    ] },
    // 12 — "0" inner hole
    { hint: 'Open the middle of the "0".', strokes: [
      "M 103.5,142 a 6.5,16 0 1,0 13,0 a 6.5,16 0 1,0 -13,0"
    ] },
    // 13 — name letters M, B
    { hint: 'Start the name: "M" "B".', strokes: [
      "M 55,102 L 55,88 L 60,95 L 66,88 L 66,102",
      "M 70,102 L 70,88 L 78,88 Q 82,91 78,94 L 70,94 M 70,94 L 79,94 Q 83,98 78,102 L 70,102"
    ] },
    // 14 — name letters A, P
    { hint: 'Keep going: "A" "P".', strokes: [
      "M 85,102 L 90,88 L 96,102 M 87,97 L 94,97",
      "M 100,102 L 100,88 L 108,88 Q 112,91 108,95 L 100,95"
    ] },
    // 15 — name letters P, E
    { hint: 'Finish the name: "P" "E".', strokes: [
      "M 115,102 L 115,88 L 123,88 Q 127,91 123,95 L 115,95",
      "M 141,88 L 130,88 L 130,102 L 141,102 M 130,95 L 139,95"
    ] },
    // 16 — inner collar trim
    { hint: "Add the inside of the collar.", strokes: [
      "M 80,58 Q 100,64 120,58"
    ] },
    // 17 — shoulder seams + neck tag
    { hint: "Add the shoulder seams.", strokes: [
      "M 78,54 L 64,59",
      "M 122,54 L 136,59",
      "M 96,61 L 104,61 L 104,65 L 96,65 Z"
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
      // side panels — bold stripe between the outer edge and the seam line
      { d: "M 55,108 C 54,150 60,182 64,205 L 78,205 C 76,182 74,150 76,110 Z", color: RED },
      { d: "M 145,108 C 146,150 140,182 136,205 L 122,205 C 124,182 126,150 124,110 Z", color: RED },
      // cuffs
      { d: "M 12,86 Q 20,104 32,110 L 38,109 Q 28,102 22,90 Z", color: RED },
      { d: "M 188,86 Q 180,104 168,110 L 162,109 Q 172,102 178,90 Z", color: RED }
    ],
    "blue-sleeves": [
      { d: "M 55,58 Q 34,62 12,86 Q 20,104 32,110 Q 45,113 56,108 Z", color: BLUE },
      { d: "M 145,58 Q 166,62 188,86 Q 180,104 168,110 Q 155,113 144,108 Z", color: BLUE }
    ],
    "blue-body": [
      { d: "M 55,58 Q 70,54 78,53 Q 100,47 122,53 Q 130,54 145,58 C 148,112 143,175 136,208 Q 100,221 64,208 C 57,175 52,112 55,58 Z", color: BLUE }
    ],
    white: [
      // number faces, painted before colour so blue fills around them
      { d: "M 79,128 L 92,114 L 92,172 L 98,172 L 98,179 L 77,179 L 77,172 L 86,172 L 86,126 L 81,129 Z", color: WHITE },
      { d: "M 97,142 a 13,30 0 1,0 26,0 a 13,30 0 1,0 -26,0 M 103.5,142 a 6.5,16 0 1,1 13,0 a 6.5,16 0 1,1 -13,0", color: WHITE, evenodd: true }
    ],
    // White name on top of the navy letter outlines -> white letters, thin dark edge.
    "name-white": [
      { d: "M 55,102 L 55,88 L 60,95 L 66,88 L 66,102", stroke: WHITE, width: 1.9 },
      { d: "M 70,102 L 70,88 L 78,88 Q 82,91 78,94 L 70,94 M 70,94 L 79,94 Q 83,98 78,102 L 70,102", stroke: WHITE, width: 1.9 },
      { d: "M 85,102 L 90,88 L 96,102 M 87,97 L 94,97", stroke: WHITE, width: 1.9 },
      { d: "M 100,102 L 100,88 L 108,88 Q 112,91 108,95 L 100,95", stroke: WHITE, width: 1.9 },
      { d: "M 115,102 L 115,88 L 123,88 Q 127,91 123,95 L 115,95", stroke: WHITE, width: 1.9 },
      { d: "M 141,88 L 130,88 L 130,102 L 141,102 M 130,95 L 139,95", stroke: WHITE, width: 1.9 }
    ]
  };

  root.JERSEY = { viewBox: "0 0 200 240", outline: OUTLINE, steps, fills };
})(typeof window !== "undefined" ? window : globalThis);
