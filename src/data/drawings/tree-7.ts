import type { Animal } from "../animals";

// A more detailed tree with roots, bark, apples and grass (7-year-old level).
export const tree7: Animal = {
  id: "tree-7",
  name: "Tree",
  emoji: "🌳",
  level: 7,
  color: "#2a9d4a",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the trunk with roots 🟫",
      color: "#8a5a2b",
      strokes: [
        "M 86,176 L 86,118 L 114,118 L 114,176",
        "M 86,176 Q 76,180 68,182 M 114,176 Q 124,180 132,182",
      ],
    },
    {
      hint: "Add a big cloud of leaves 🌳",
      color: "#2a9d4a",
      strokes: [
        "M 70,118 Q 44,116 46,90 Q 44,62 74,62 Q 84,40 110,52 Q 140,46 142,76 Q 162,84 150,108 Q 150,124 124,120 Q 110,132 90,122 Q 76,128 70,118 Z",
      ],
    },
    {
      hint: "Add some yummy apples! 🍎",
      color: "#e63946",
      strokes: [
        "M 76,86 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 112,78 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 100,104 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Add bark lines on the trunk",
      color: "#8a5a2b",
      strokes: ["M 95,124 L 95,170 M 105,124 L 105,170"],
    },
    {
      hint: "Finish with grass at the bottom! 🌱",
      color: "#06d6a0",
      strokes: [
        "M 8,182 L 192,182",
        "M 32,182 L 28,170 M 46,182 L 50,171 M 154,182 L 150,170 M 170,182 L 174,171",
      ],
    },
  ],
};
