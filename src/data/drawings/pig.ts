import type { Animal } from "../animals";

// A simple kawaii pig face — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const pig: Animal = {
  id: "pig",
  name: "Pig",
  emoji: "🐷",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head! 🐷",
      color: OUTLINE,
      strokes: ["M 52,104 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 60,68 L 50,38 L 86,60 Z", "M 140,68 L 150,38 L 114,60 Z"],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 74,96 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
        "M 112,96 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
      ],
    },
    {
      hint: "Add a big snout 🐽",
      color: OUTLINE,
      strokes: [
        "M 78,122 a 22,15 0 1,0 44,0 a 22,15 0 1,0 -44,0",
        "M 90,122 a 3,5 0 1,0 6,0 a 3,5 0 1,0 -6,0",
        "M 104,122 a 3,5 0 1,0 6,0 a 3,5 0 1,0 -6,0",
      ],
    },
    {
      hint: "Add a smile 😄",
      color: OUTLINE,
      strokes: ["M 82,144 Q 100,152 118,144"],
    },
    {
      hint: "Now color the pig in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 52,104 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0", color: "#f6a5b8" },
        { d: "M 60,68 L 50,38 L 86,60 Z", color: "#f6a5b8" },
        { d: "M 140,68 L 150,38 L 114,60 Z", color: "#f6a5b8" },
        { d: "M 64,62 L 57,44 L 80,58 Z", color: "#ef8fa6" },
        { d: "M 136,62 L 143,44 L 120,58 Z", color: "#ef8fa6" },
        { d: "M 78,122 a 22,15 0 1,0 44,0 a 22,15 0 1,0 -44,0", color: "#ef8fa6" },
        { d: "M 74,96 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
        { d: "M 112,96 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
        { d: "M 90,122 a 3,5 0 1,0 6,0 a 3,5 0 1,0 -6,0", color: "#5a3a3a" },
        { d: "M 104,122 a 3,5 0 1,0 6,0 a 3,5 0 1,0 -6,0", color: "#5a3a3a" },
      ],
    },
  ],
};
