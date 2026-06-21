import type { Animal } from "../animals";

// A simple kawaii elephant face — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const elephant: Animal = {
  id: "elephant",
  name: "Elephant",
  emoji: "🐘",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head! 🐘",
      color: OUTLINE,
      strokes: ["M 58,98 a 42,42 0 1,0 84,0 a 42,42 0 1,0 -84,0"],
    },
    {
      hint: "Add two big floppy ears 👂",
      color: OUTLINE,
      strokes: [
        "M 16,102 a 34,36 0 1,0 68,0 a 34,36 0 1,0 -68,0",
        "M 116,102 a 34,36 0 1,0 68,0 a 34,36 0 1,0 -68,0",
      ],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 78,92 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
        "M 108,92 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
      ],
    },
    {
      hint: "Add a long trunk 🐘",
      color: OUTLINE,
      strokes: ["M 90,116 Q 84,150 92,172 Q 102,182 110,170 Q 104,150 110,118"],
    },
    {
      hint: "Add two little tusks",
      color: OUTLINE,
      strokes: ["M 84,140 L 80,158", "M 116,140 L 120,158"],
    },
    {
      hint: "Now color the elephant in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 16,102 a 34,36 0 1,0 68,0 a 34,36 0 1,0 -68,0", color: "#a7adb8" },
        { d: "M 116,102 a 34,36 0 1,0 68,0 a 34,36 0 1,0 -68,0", color: "#a7adb8" },
        { d: "M 26,102 a 22,24 0 1,0 44,0 a 22,24 0 1,0 -44,0", color: "#c3a0a8" },
        { d: "M 126,102 a 22,24 0 1,0 44,0 a 22,24 0 1,0 -44,0", color: "#c3a0a8" },
        { d: "M 58,98 a 42,42 0 1,0 84,0 a 42,42 0 1,0 -84,0", color: "#b6bcc6" },
        { d: "M 90,116 Q 84,150 92,172 Q 102,182 110,170 Q 104,150 110,118 Z", color: "#b6bcc6" },
        { d: "M 84,140 L 80,158 L 86,158 L 88,142 Z", color: "#fbf7ee" },
        { d: "M 116,140 L 120,158 L 114,158 L 112,142 Z", color: "#fbf7ee" },
        { d: "M 78,92 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
        { d: "M 108,92 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
      ],
    },
  ],
};
