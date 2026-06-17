import type { Animal } from "../animals";

// A kawaii tree: brown trunk, a cloud of green leaves and apples. Outline first,
// colored in last.
const OUTLINE = "#4f3a2c";

export const tree: Animal = {
  id: "tree",
  name: "Tree",
  emoji: "🌳",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw the trunk 🟫",
      color: OUTLINE,
      strokes: ["M 88,172 L 88,118 L 112,118 L 112,172"],
    },
    {
      hint: "Add a big cloud of leaves 🌳",
      color: OUTLINE,
      strokes: [
        "M 70,118 Q 44,116 46,90 Q 44,62 74,62 Q 84,40 110,52 Q 140,46 142,76 Q 162,84 150,108 Q 150,124 124,120 Q 110,132 90,122 Q 76,128 70,118 Z",
      ],
    },
    {
      hint: "Add some yummy apples! 🍎",
      color: OUTLINE,
      strokes: [
        "M 76,86 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 112,78 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 100,104 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 70,118 Q 44,116 46,90 Q 44,62 74,62 Q 84,40 110,52 Q 140,46 142,76 Q 162,84 150,108 Q 150,124 124,120 Q 110,132 90,122 Q 76,128 70,118 Z",
          color: "#46b56a",
        },
        { d: "M 88,172 L 88,118 L 112,118 L 112,172 Z", color: "#8a5a2b" },
        { d: "M 76,86 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
        { d: "M 112,78 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
        { d: "M 100,104 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
      ],
    },
  ],
};
