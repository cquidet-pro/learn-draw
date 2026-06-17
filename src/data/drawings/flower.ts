import type { Animal } from "../animals";

// A simple kawaii flower: dark outline drawn step by step, colored in last.
const OUTLINE = "#4f3a2c";

export const flower: Animal = {
  id: "flower",
  name: "Flower",
  emoji: "🌸",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw the stem and a leaf 🌿",
      color: OUTLINE,
      strokes: [
        "M 100,172 L 100,118",
        "M 100,150 Q 78,138 74,156 Q 92,162 100,150 Z",
      ],
    },
    {
      hint: "Add the middle of the flower 🟡",
      color: OUTLINE,
      strokes: ["M 86,100 a 14,14 0 1,0 28,0 a 14,14 0 1,0 -28,0"],
    },
    {
      hint: "Add petals all around! 🌸",
      color: OUTLINE,
      strokes: [
        "M 114,100 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 101,77 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 75,77 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 62,100 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 75,123 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 101,123 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 114,100 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ff7eb6" },
        { d: "M 101,77 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ff7eb6" },
        { d: "M 75,77 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ff7eb6" },
        { d: "M 62,100 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ff7eb6" },
        { d: "M 75,123 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ff7eb6" },
        { d: "M 101,123 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ff7eb6" },
        { d: "M 100,150 Q 78,138 74,156 Q 92,162 100,150 Z", color: "#06d6a0" },
        { d: "M 86,100 a 14,14 0 1,0 28,0 a 14,14 0 1,0 -28,0", color: "#ffd23f" },
      ],
    },
  ],
};
