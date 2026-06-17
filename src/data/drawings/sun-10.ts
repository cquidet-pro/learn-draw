import type { Animal } from "../animals";

// A detailed sun in a little sky scene with clouds and birds (10-year-old level).
export const sun10: Animal = {
  id: "sun-10",
  name: "Sun",
  emoji: "☀️",
  level: 10,
  color: "#f4a300",
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw a big round sun ☀️", strokes: ["M 64,96 a 38,38 0 1,0 76,0 a 38,38 0 1,0 -76,0"] },
    {
      hint: "Add straight sunny rays",
      strokes: ["M 102,52 L 102,30 M 102,140 L 102,162 M 60,96 L 38,96 M 144,96 L 166,96"],
    },
    {
      hint: "Add diagonal rays in the corners",
      strokes: ["M 72,66 L 56,50 M 132,66 L 148,50 M 72,126 L 56,142 M 132,126 L 148,142"],
    },
    {
      hint: "Give the sun a happy face 😊",
      strokes: [
        "M 88,88 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 108,88 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 86,108 Q 102,124 118,108",
      ],
    },
    {
      hint: "Add a fluffy cloud ☁️",
      color: "#9aa5b1",
      strokes: ["M 30,168 Q 18,168 20,156 Q 16,146 32,148 Q 38,138 52,146 Q 62,144 60,158 Q 66,168 52,168 Z"],
    },
    {
      hint: "Finish with birds flying by! 🐦",
      color: "#3a3a55",
      strokes: ["M 150,40 q 6,-6 12,0 q 6,-6 12,0", "M 158,60 q 5,-5 10,0 q 5,-5 10,0"],
    },
  ],
};
