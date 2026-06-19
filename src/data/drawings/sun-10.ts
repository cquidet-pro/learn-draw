import type { Animal } from "../animals";

// A detailed kawaii sun in a little sky scene with a cloud and birds (level 10).
const OUTLINE = "#4f3a2c";

export const sun10: Animal = {
  id: "sun-10",
  name: "Sun",
  emoji: "☀️",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw a big round sun ☀️", color: OUTLINE, strokes: ["M 64,96 a 38,38 0 1,0 76,0 a 38,38 0 1,0 -76,0"] },
    {
      hint: "Add straight sunny rays",
      color: OUTLINE,
      strokes: ["M 102,52 L 102,30 M 102,140 L 102,162 M 60,96 L 38,96 M 144,96 L 166,96"],
    },
    {
      hint: "Add diagonal rays in the corners",
      color: OUTLINE,
      strokes: ["M 72,66 L 56,50 M 132,66 L 148,50 M 72,126 L 56,142 M 132,126 L 148,142"],
    },
    {
      hint: "Give the sun a happy face 😊",
      color: OUTLINE,
      strokes: [
        "M 88,88 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 108,88 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 86,108 Q 102,124 118,108",
      ],
    },
    {
      hint: "Add a fluffy cloud ☁️",
      color: OUTLINE,
      strokes: ["M 22,135 Q 10,135 12,123 Q 8,113 24,115 Q 30,105 44,113 Q 54,111 52,125 Q 58,135 44,135 Z"],
    },
    {
      hint: "Finish with birds flying by! 🐦",
      color: OUTLINE,
      strokes: ["M 150,40 q 6,-6 12,0 q 6,-6 12,0", "M 158,60 q 5,-5 10,0 q 5,-5 10,0"],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 64,96 a 38,38 0 1,0 76,0 a 38,38 0 1,0 -76,0", color: "#ffd23f" },
        { d: "M 78,102 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#ffb3c1" },
        { d: "M 116,102 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#ffb3c1" },
        { d: "M 88,88 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 108,88 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 22,135 Q 10,135 12,123 Q 8,113 24,115 Q 30,105 44,113 Q 54,111 52,125 Q 58,135 44,135 Z", color: "#dbe4ec" },
      ],
    },
  ],
};
