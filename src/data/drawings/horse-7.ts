import type { Animal } from "../animals";

// A full-body kawaii pony (7-year-old level). Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const horse7: Animal = {
  id: "horse-7",
  name: "Horse",
  emoji: "🐴",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Start with a big round body",
      color: OUTLINE,
      strokes: ["M 64,110 a 44,30 0 1,0 88,0 a 44,30 0 1,0 -88,0"],
    },
    {
      hint: "Add the head up front",
      color: OUTLINE,
      strokes: ["M 36,78 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 46,58 L 40,40 L 56,54 Z", "M 66,58 L 72,40 L 56,54 Z"],
    },
    {
      hint: "Draw the flowing mane",
      color: OUTLINE,
      strokes: ["M 60,46 Q 84,56 80,88 Q 94,98 90,118"],
    },
    {
      hint: "Add an eye and a nostril 👀",
      color: OUTLINE,
      strokes: [
        "M 49,76 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 36,86 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0",
      ],
    },
    {
      hint: "Add four legs 🦵",
      color: OUTLINE,
      strokes: [
        "M 82,136 L 80,176 M 100,138 L 100,176",
        "M 126,138 L 128,176 M 144,136 L 146,176",
      ],
    },
    {
      hint: "Finish with little hooves and a swishy tail!",
      color: OUTLINE,
      strokes: [
        "M 73,176 q 7,5 14,0 M 93,176 q 7,5 14,0",
        "M 121,176 q 7,5 14,0 M 139,176 q 7,5 14,0",
        "M 150,98 Q 174,110 166,150 Q 162,168 150,166",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 64,110 a 44,30 0 1,0 88,0 a 44,30 0 1,0 -88,0", color: "#c89b6c" },
        { d: "M 36,78 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0", color: "#c89b6c" },
        { d: "M 46,58 L 40,40 L 56,54 Z", color: "#c89b6c" },
        { d: "M 66,58 L 72,40 L 56,54 Z", color: "#c89b6c" },
        { d: "M 48,54 L 44,42 L 55,52 Z", color: "#e7a6b0" },
        { d: "M 64,54 L 68,42 L 57,52 Z", color: "#e7a6b0" },
        { d: "M 60,46 Q 84,56 80,88 Q 94,98 90,118 Q 78,96 76,84 Q 70,58 60,46 Z", color: "#8a5a34" },
        { d: "M 150,98 Q 174,110 166,150 Q 162,168 150,166 Q 162,140 158,118 Q 156,106 150,98 Z", color: "#8a5a34" },
        { d: "M 49,76 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#3a2a20" },
        { d: "M 36,86 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0", color: "#5a3a28" },
      ],
    },
  ],
};
