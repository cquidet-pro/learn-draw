import type { Animal } from "../animals";

// A classic kawaii house: square walls, triangle roof, door and windows.
// Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const house: Animal = {
  id: "house",
  name: "House",
  emoji: "🏠",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw the walls (a big square) 🟫",
      color: OUTLINE,
      strokes: ["M 50,92 L 50,162 L 150,162 L 150,92 Z"],
    },
    {
      hint: "Add a triangle roof 🔺",
      color: OUTLINE,
      strokes: ["M 42,92 L 100,50 L 158,92 Z"],
    },
    {
      hint: "Draw the door 🚪",
      color: OUTLINE,
      strokes: ["M 88,162 L 88,122 L 112,122 L 112,162"],
    },
    {
      hint: "Add two windows 🪟",
      color: OUTLINE,
      strokes: [
        "M 62,106 L 80,106 L 80,124 L 62,124 Z",
        "M 120,106 L 138,106 L 138,124 L 120,124 Z",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 50,92 L 50,162 L 150,162 L 150,92 Z", color: "#ffe0a3" },
        { d: "M 42,92 L 100,50 L 158,92 Z", color: "#e8604c" },
        { d: "M 88,162 L 88,122 L 112,122 L 112,162 Z", color: "#8a5a2b" },
        { d: "M 62,106 L 80,106 L 80,124 L 62,124 Z", color: "#9bd8e6" },
        { d: "M 120,106 L 138,106 L 138,124 L 120,124 Z", color: "#9bd8e6" },
      ],
    },
  ],
};
