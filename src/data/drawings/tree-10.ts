import type { Animal } from "../animals";

// A detailed tree with a swing, a bird and the sun (10-year-old level).
export const tree10: Animal = {
  id: "tree-10",
  name: "Tree",
  emoji: "🌳",
  level: 10,
  color: "#2a9d4a",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the trunk with roots 🟫",
      color: "#8a5a2b",
      strokes: ["M 86,176 L 86,118 L 114,118 L 114,176", "M 86,176 Q 76,180 68,182 M 114,176 Q 124,180 132,182"],
    },
    {
      hint: "Add a big cloud of leaves 🌳",
      color: "#2a9d4a",
      strokes: [
        "M 70,118 Q 44,116 46,90 Q 44,62 74,62 Q 84,40 110,52 Q 140,46 142,76 Q 162,84 150,108 Q 150,124 124,120 Q 110,132 90,122 Q 76,128 70,118 Z",
      ],
    },
    {
      hint: "Add yummy apples! 🍎",
      color: "#e63946",
      strokes: [
        "M 76,86 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 112,78 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 100,104 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    { hint: "Add bark lines on the trunk", color: "#8a5a2b", strokes: ["M 95,124 L 95,170 M 105,124 L 105,170"] },
    {
      hint: "Hang a little swing from a branch 🪢",
      color: "#6b4f3a",
      strokes: ["M 60,116 L 56,150 M 78,116 L 82,150", "M 52,150 L 86,150"],
    },
    {
      hint: "Add a little bird 🐦",
      color: "#118ab2",
      strokes: ["M 150,52 q 7,-7 14,0 q 7,-7 14,0"],
    },
    {
      hint: "Finish with grass and the sun! ☀️",
      color: "#06d6a0",
      strokes: [
        "M 8,182 L 192,182",
        "M 32,182 L 28,170 M 168,182 L 172,170",
      ],
    },
  ],
};
