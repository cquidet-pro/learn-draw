import type { Animal } from "../animals";

// A kawaii tree: brown trunk, a rounded cloud of green leaves and apples.
// Outline first, colored in last. The trunk has no top edge and is painted
// behind the leaves, so it tucks cleanly under the canopy.
const OUTLINE = "#4f3a2c";

const CANOPY =
  "M 88,124 Q 60,128 54,104 Q 44,86 64,76 Q 66,52 90,56 Q 100,46 110,56 Q 134,52 136,76 Q 156,86 146,104 Q 140,128 112,124 Q 100,130 88,124 Z";

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
      strokes: ["M 88,124 L 88,172 L 112,172 L 112,124"],
    },
    {
      hint: "Add a big cloud of leaves 🌳",
      color: OUTLINE,
      strokes: [CANOPY],
    },
    {
      hint: "Add some yummy apples! 🍎",
      color: OUTLINE,
      strokes: [
        "M 73,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 117,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 95,108 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 88,124 L 88,172 L 112,172 L 112,124 Z", color: "#8a5a2b" },
        { d: CANOPY, color: "#46b56a" },
        { d: "M 73,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
        { d: "M 117,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
        { d: "M 95,108 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
      ],
    },
  ],
};
