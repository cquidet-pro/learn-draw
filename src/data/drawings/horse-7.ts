import type { Animal } from "../animals";

// A full-body kawaii pony (7-year-old level). The body has a flat underside so
// the four legs join it cleanly. Outline first, colored in last.
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
      hint: "Start with a big rounded body",
      color: OUTLINE,
      strokes: [
        "M 70,92 C 62,110 64,128 80,130 L 140,130 C 156,128 158,110 150,92 C 140,80 80,80 70,92",
      ],
    },
    {
      hint: "Add the head up front",
      color: OUTLINE,
      strokes: ["M 32,80 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 42,60 L 36,42 L 52,56 Z", "M 62,60 L 68,42 L 52,56 Z"],
    },
    {
      hint: "Draw the flowing mane",
      color: OUTLINE,
      strokes: ["M 56,46 Q 78,56 76,90 Q 88,98 84,116"],
    },
    {
      hint: "Add an eye and a nostril 👀",
      color: OUTLINE,
      strokes: [
        "M 47,78 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 33,88 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0",
      ],
    },
    {
      hint: "Add four legs that join the body 🦵",
      color: OUTLINE,
      strokes: [
        "M 88,126 L 88,176 M 104,126 L 104,176",
        "M 120,126 L 120,176 M 136,126 L 136,176",
      ],
    },
    {
      hint: "Finish with little hooves and a swishy tail!",
      color: OUTLINE,
      strokes: [
        "M 81,176 q 7,5 14,0 M 97,176 q 7,5 14,0",
        "M 113,176 q 7,5 14,0 M 129,176 q 7,5 14,0",
        "M 150,98 Q 172,110 164,150 Q 160,168 150,164",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 70,92 C 62,110 64,128 80,130 L 140,130 C 156,128 158,110 150,92 C 140,80 80,80 70,92 Z",
          color: "#c89b6c",
        },
        { d: "M 32,80 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0", color: "#c89b6c" },
        { d: "M 42,60 L 36,42 L 52,56 Z", color: "#c89b6c" },
        { d: "M 62,60 L 68,42 L 52,56 Z", color: "#c89b6c" },
        { d: "M 44,55 L 40,44 L 51,53 Z", color: "#e7a6b0" },
        { d: "M 60,55 L 64,44 L 53,53 Z", color: "#e7a6b0" },
        { d: "M 56,46 Q 78,56 76,90 Q 88,98 84,116 Q 76,94 72,84 Q 64,58 56,46 Z", color: "#8a5a34" },
        { d: "M 150,98 Q 172,110 164,150 Q 160,168 150,164 Q 162,140 158,118 Q 156,106 150,98 Z", color: "#8a5a34" },
        { d: "M 47,78 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#3a2a20" },
        { d: "M 33,88 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0", color: "#5a3a28" },
      ],
    },
  ],
};
