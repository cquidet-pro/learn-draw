import type { Animal } from "../animals";

// A simple kawaii bear face — a drawable reward "friend".
const OUTLINE = "#5b3d22";

export const bear: Animal = {
  id: "bear",
  name: "Bear",
  emoji: "🐻",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a big round head! 🐻",
      color: OUTLINE,
      strokes: ["M 48,108 a 52,52 0 1,0 104,0 a 52,52 0 1,0 -104,0"],
    },
    {
      hint: "Add two round ears on top 👂",
      color: OUTLINE,
      strokes: [
        "M 40,58 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0",
        "M 116,58 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0",
      ],
    },
    {
      hint: "Add a soft snout 🤎",
      color: OUTLINE,
      strokes: ["M 72,128 a 28,22 0 1,0 56,0 a 28,22 0 1,0 -56,0"],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 74,98 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
        "M 112,98 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
      ],
    },
    {
      hint: "Add a nose and a smile 😄",
      color: OUTLINE,
      strokes: [
        "M 92,120 a 8,6 0 1,0 16,0 a 8,6 0 1,0 -16,0",
        "M 100,126 L 100,134 M 100,134 Q 91,141 84,135 M 100,134 Q 109,141 116,135",
      ],
    },
    {
      hint: "Now color the bear in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 48,108 a 52,52 0 1,0 104,0 a 52,52 0 1,0 -104,0", color: "#a9763f" },
        { d: "M 40,58 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0", color: "#a9763f" },
        { d: "M 116,58 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0", color: "#a9763f" },
        { d: "M 50,58 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#d9b382" },
        { d: "M 126,58 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#d9b382" },
        { d: "M 72,128 a 28,22 0 1,0 56,0 a 28,22 0 1,0 -56,0", color: "#d9b382" },
        { d: "M 60,128 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#f0b0a0" },
        { d: "M 116,128 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#f0b0a0" },
        { d: "M 74,98 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#2b2620" },
        { d: "M 112,98 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#2b2620" },
        { d: "M 92,120 a 8,6 0 1,0 16,0 a 8,6 0 1,0 -16,0", color: "#3a2a20" },
      ],
    },
  ],
};
