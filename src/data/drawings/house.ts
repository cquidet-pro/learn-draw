import type { Animal } from "../animals";

// A classic house: square walls, triangle roof, door and windows.
export const house: Animal = {
  id: "house",
  name: "House",
  emoji: "🏠",
  viewBox: "0 0 200 200",
  color: "#6b4f3a",
  steps: [
    {
      hint: "Draw the walls (a big square) 🟫",
      strokes: ["M 50,92 L 50,162 L 150,162 L 150,92 Z"],
    },
    {
      hint: "Add a triangle roof 🔺",
      color: "#e63946",
      strokes: ["M 42,92 L 100,50 L 158,92 Z"],
    },
    {
      hint: "Draw the door 🚪",
      color: "#8a5a2b",
      strokes: ["M 88,162 L 88,122 L 112,122 L 112,162"],
    },
    {
      hint: "Add two windows 🪟",
      color: "#118ab2",
      strokes: [
        "M 62,106 L 80,106 L 80,124 L 62,124 Z",
        "M 120,106 L 138,106 L 138,124 L 120,124 Z",
      ],
    },
  ],
};
