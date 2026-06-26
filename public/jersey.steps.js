// MBAPPE #10 jersey — 20-step "draws itself" data (back view).
// viewBox 0 0 200 240 (taller than wide). Each step lists ONLY the strokes
// introduced at that step; past strokes stay on screen. The last three steps
// add no strokes — they reveal colour fills in waves (red, then blue x2).
// Shared by the clickable preview page and the dev grid renderer.
(function (root) {
  const OUTLINE = "#15173a";
  const BLUE = "#1f47c2";
  const RED = "#d2232a";
  const WHITE = "#ffffff";

  const steps = [
    // 1 — body outline (sides + bottom, top open)
    { hint: "Draw the body — two sides and the bottom.", strokes: [
      "M 62,56 C 59,110 63,172 67,206 Q 100,220 133,206 C 137,172 141,110 138,56"
    ] },
    // 2 — sleeve tops
    { hint: "Add the top of each sleeve.", strokes: [
      "M 62,56 Q 40,60 16,80",
      "M 138,56 Q 160,60 184,80"
    ] },
    // 3 — sleeve undersides (close the sleeves)
    { hint: "Close the sleeves underneath.", strokes: [
      "M 16,80 Q 22,99 33,106 Q 48,109 60,105",
      "M 184,80 Q 178,99 167,106 Q 152,109 140,105"
    ] },
    // 4 — back collar
    { hint: "Draw the collar at the neck.", strokes: [
      "M 62,56 Q 74,53 80,52 Q 100,46 120,52 Q 126,53 138,56",
      "M 80,53 Q 100,59 120,53"
    ] },
    // 5 — side panel seam lines
    { hint: "Add a line down each side.", strokes: [
      "M 74,108 C 72,150 74,182 76,204",
      "M 126,108 C 128,150 126,182 124,204"
    ] },
    // 6 — bottom hem line
    { hint: "Draw the hem line near the bottom.", strokes: [
      "M 70,201 Q 100,213 130,201"
    ] },
    // 7 — sleeve cuff bands
    { hint: "Add the cuff on each sleeve.", strokes: [
      "M 25,86 Q 31,98 41,105",
      "M 175,86 Q 169,98 159,105"
    ] },
    // 8 — number "1" front face
    { hint: 'Write a big "1".', strokes: [
      "M 78,137 L 93,122 L 93,182 L 100,182 L 100,189 L 75,189 L 75,182 L 86,182 L 86,135 L 80,139 Z"
    ] },
    // 9 — "1" 3-D side
    { hint: 'Give the "1" a 3-D side.', strokes: [
      "M 93,122 L 97,127 L 97,184 L 93,182 Z",
      "M 100,189 L 104,193 L 79,193 L 75,189 Z"
    ] },
    // 10 — number "0" front (outer ring)
    { hint: 'Now write the "0".', strokes: [
      "M 106,151 a 22,33 0 1,0 44,0 a 22,33 0 1,0 -44,0"
    ] },
    // 11 — "0" 3-D side
    { hint: 'Give the "0" a 3-D side.', strokes: [
      "M 149,158 a 22,33 0 0,1 -14,28 l 5,4 a 24,35 0 0,0 15,-32 Z"
    ] },
    // 12 — "0" inner hole
    { hint: 'Open the middle of the "0".', strokes: [
      "M 117,151 a 11,20 0 1,0 22,0 a 11,20 0 1,0 -22,0"
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
      "M 83,56 Q 100,63 117,56"
    ] },
    // 17 — shoulder seams + neck tag
    { hint: "Add the shoulder seams.", strokes: [
      "M 80,53 L 66,57",
      "M 120,53 L 134,57",
      "M 96,60 L 104,60 L 104,64 L 96,64 Z"
    ] },
    // 18 — colour: red trim
    { hint: "Colour the red parts! 🔴", strokes: [], fills: "red" },
    // 19 — colour: blue sleeves
    { hint: "Colour the sleeves blue! 🔵", strokes: [], fills: "blue-sleeves" },
    // 20 — colour: blue body
    { hint: "Colour it all blue — Allez les Bleus! 🎉", strokes: [], fills: "blue-body" }
  ];

  // Fill regions, revealed during the colour steps.
  const fills = {
    red: [
      // side panels — stripe between the outer edge and the seam line
      { d: "M 61,108 C 60,150 64,182 67,205 L 76,204 C 74,182 72,150 74,108 Z", color: RED },
      { d: "M 139,108 C 140,150 136,182 133,205 L 124,204 C 126,182 128,150 126,108 Z", color: RED },
      // cuffs
      { d: "M 16,80 Q 22,99 33,106 L 41,105 Q 31,98 25,86 Z", color: RED },
      { d: "M 184,80 Q 178,99 167,106 L 159,105 Q 169,98 175,86 Z", color: RED }
    ],
    "blue-sleeves": [
      { d: "M 62,56 Q 40,60 16,80 Q 24,99 33,106 Q 48,109 60,105 Z", color: BLUE },
      { d: "M 138,56 Q 160,60 184,80 Q 176,99 167,106 Q 152,109 140,105 Z", color: BLUE }
    ],
    "blue-body": [
      { d: "M 62,56 Q 74,53 80,52 Q 100,46 120,52 Q 126,53 138,56 C 137,110 137,172 133,206 Q 100,220 67,206 C 63,172 63,110 62,56 Z", color: BLUE }
    ],
    white: [
      // number faces, painted before colour so blue fills around them
      { d: "M 78,137 L 93,122 L 93,182 L 100,182 L 100,189 L 75,189 L 75,182 L 86,182 L 86,135 L 80,139 Z", color: WHITE },
      { d: "M 106,151 a 22,33 0 1,0 44,0 a 22,33 0 1,0 -44,0 M 117,151 a 11,20 0 1,1 22,0 a 11,20 0 1,1 -22,0", color: WHITE, evenodd: true }
    ]
  };

  root.JERSEY = { viewBox: "0 0 200 240", outline: OUTLINE, steps, fills };
})(typeof window !== "undefined" ? window : globalThis);
