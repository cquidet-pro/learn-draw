import type { Animal } from "../animals";

// A simple kawaii fox face — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const fox: Animal = {
  id: "fox",
  name: "Fox",
  emoji: "🦊",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head! 🦊",
      color: OUTLINE,
      strokes: ["M 56,104 a 44,44 0 1,0 88,0 a 44,44 0 1,0 -88,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 64,72 L 46,28 L 92,58 Z", "M 136,72 L 154,28 L 108,58 Z"],
    },
    {
      hint: "Add a white snout in the middle",
      color: OUTLINE,
      strokes: ["M 100,106 Q 68,114 80,146 Q 100,158 120,146 Q 132,114 100,106 Z"],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 74,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
        "M 112,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
      ],
    },
    {
      hint: "Add a nose and a smile 👃",
      color: OUTLINE,
      strokes: [
        "M 92,132 a 8,7 0 1,0 16,0 a 8,7 0 1,0 -16,0",
        "M 100,139 L 100,145 M 100,145 Q 93,150 88,146 M 100,145 Q 107,150 112,146",
      ],
    },
    {
      hint: "Now color the fox in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 56,104 a 44,44 0 1,0 88,0 a 44,44 0 1,0 -88,0", color: "#ef8c43" },
        { d: "M 64,72 L 46,28 L 92,58 Z", color: "#ef8c43" },
        { d: "M 136,72 L 154,28 L 108,58 Z", color: "#ef8c43" },
        { d: "M 66,64 L 56,40 L 82,56 Z", color: "#3a2a20" },
        { d: "M 134,64 L 144,40 L 118,56 Z", color: "#3a2a20" },
        { d: "M 100,106 Q 68,114 80,146 Q 100,158 120,146 Q 132,114 100,106 Z", color: "#fbece0" },
        { d: "M 74,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
        { d: "M 112,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
        { d: "M 92,132 a 8,7 0 1,0 16,0 a 8,7 0 1,0 -16,0", color: "#3a2a20" },
      ],
    },
  ],
};
