import type { Animal } from "../animals";

// A simple flower with petals and a leaf.
export const flower: Animal = {
  id: "flower",
  name: "Flower",
  emoji: "🌸",
  viewBox: "0 0 200 200",
  color: "#06d6a0",
  steps: [
    {
      hint: "Draw the stem and a leaf 🌿",
      color: "#06d6a0",
      strokes: [
        "M 100,172 L 100,118",
        "M 100,150 Q 78,138 74,156 Q 92,162 100,150 Z",
      ],
    },
    {
      hint: "Add the middle of the flower 🟡",
      color: "#ffd166",
      strokes: ["M 86,100 a 14,14 0 1,0 28,0 a 14,14 0 1,0 -28,0"],
    },
    {
      hint: "Add colorful petals all around! 🌸",
      color: "#ef476f",
      strokes: [
        "M 114,100 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 101,77 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 75,77 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 62,100 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 75,123 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 101,123 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
      ],
    },
  ],
};
