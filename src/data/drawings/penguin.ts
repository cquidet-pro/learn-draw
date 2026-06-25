import type { Animal } from "../animals";

// A simple kawaii penguin — a drawable reward "friend".
const OUTLINE = "#1a1a1d";

export const penguin: Animal = {
  id: "penguin",
  name: "Penguin",
  emoji: "🐧",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a big round penguin body! 🐧",
      color: OUTLINE,
      strokes: ["M 50,108 a 50,58 0 1,0 100,0 a 50,58 0 1,0 -100,0"],
    },
    {
      hint: "Add a soft white tummy 🤍",
      color: OUTLINE,
      strokes: ["M 64,112 a 36,44 0 1,0 72,0 a 36,44 0 1,0 -72,0"],
    },
    {
      hint: "Add two round eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 80,90 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 104,90 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add a little orange beak 🔶",
      color: OUTLINE,
      strokes: ["M 100,100 L 110,109 L 100,118 L 90,109 Z"],
    },
    {
      hint: "Add two little feet 🧡",
      color: OUTLINE,
      strokes: [
        "M 76,160 Q 66,176 84,176 Q 92,176 90,162 Z",
        "M 124,160 Q 134,176 116,176 Q 108,176 110,162 Z",
      ],
    },
    {
      hint: "Now color the penguin in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 76,160 Q 66,176 84,176 Q 92,176 90,162 Z", color: "#f4a300" },
        { d: "M 124,160 Q 134,176 116,176 Q 108,176 110,162 Z", color: "#f4a300" },
        { d: "M 50,108 a 50,58 0 1,0 100,0 a 50,58 0 1,0 -100,0", color: "#2f2f33" },
        { d: "M 64,112 a 36,44 0 1,0 72,0 a 36,44 0 1,0 -72,0", color: "#ffffff" },
        { d: "M 80,90 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#2b2620" },
        { d: "M 104,90 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#2b2620" },
        { d: "M 100,100 L 110,109 L 100,118 L 90,109 Z", color: "#f4a300" },
      ],
    },
  ],
};
