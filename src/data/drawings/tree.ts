import type { Animal } from "../animals";

// A tree: brown trunk with a cloud of green leaves and a few apples.
export const tree: Animal = {
  id: "tree",
  name: "Tree",
  emoji: "🌳",
  viewBox: "0 0 200 200",
  color: "#2a9d4a",
  steps: [
    {
      hint: "Draw the trunk 🟫",
      color: "#8a5a2b",
      strokes: ["M 88,172 L 88,118 L 112,118 L 112,172"],
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
  ],
};
