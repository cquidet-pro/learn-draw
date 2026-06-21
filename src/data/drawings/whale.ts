import type { Animal } from "../animals";

// A simple kawaii whale — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const whale: Animal = {
  id: "whale",
  name: "Whale",
  emoji: "🐳",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a big round body! 🐳",
      color: OUTLINE,
      strokes: ["M 32,112 a 56,38 0 1,0 112,0 a 56,38 0 1,0 -112,0"],
    },
    {
      hint: "Add a splashy tail",
      color: OUTLINE,
      strokes: ["M 142,108 Q 168,86 184,92 Q 170,112 184,134 Q 166,138 142,118 Z"],
    },
    {
      hint: "Add a happy eye 👀",
      color: OUTLINE,
      strokes: ["M 60,104 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0"],
    },
    {
      hint: "Add a big smile 😄",
      color: OUTLINE,
      strokes: ["M 46,122 Q 70,138 100,130"],
    },
    {
      hint: "Add a water spout! 💦",
      color: OUTLINE,
      strokes: [
        "M 86,76 Q 80,56 86,46",
        "M 86,76 Q 86,52 86,42",
        "M 86,76 Q 92,56 98,48",
      ],
    },
    {
      hint: "Now color the whale in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 32,112 a 56,38 0 1,0 112,0 a 56,38 0 1,0 -112,0", color: "#3aa0d8" },
        { d: "M 142,108 Q 168,86 184,92 Q 170,112 184,134 Q 166,138 142,118 Z", color: "#3aa0d8" },
        { d: "M 40,124 Q 64,150 120,138 Q 132,128 120,120 Q 80,132 44,116 Z", color: "#bfe3f4" },
        { d: "M 60,104 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#22384a" },
      ],
    },
  ],
};
