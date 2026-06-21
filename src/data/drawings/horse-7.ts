import type { Animal } from "../animals";

// A full-body kawaii pony (7-year-old level). The head is a side profile with a
// long muzzle (matching the easy horse), and the body has a flat underside so
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
      hint: "Add a long horse head from the side",
      color: OUTLINE,
      strokes: [
        "M 66,56 Q 48,62 32,84 Q 24,98 26,108 Q 30,117 40,116 Q 56,114 66,96 Q 72,84 72,80 Q 76,66 66,56 Z",
      ],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 62,56 L 56,36 L 70,52 Z", "M 72,54 L 82,38 L 73,52 Z"],
    },
    {
      hint: "Draw the flowing mane",
      color: OUTLINE,
      strokes: ["M 68,54 Q 86,62 82,92 Q 92,100 86,118"],
    },
    {
      hint: "Add an eye, a nostril and a smile 👀",
      color: OUTLINE,
      strokes: [
        "M 47,80 a 4.5,4.5 0 1,0 9,0 a 4.5,4.5 0 1,0 -9,0",
        "M 29,99 a 3,3.5 0 1,0 6,0 a 3,3.5 0 1,0 -6,0",
        "M 27,109 Q 34,115 42,111",
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
        {
          d: "M 66,56 Q 48,62 32,84 Q 24,98 26,108 Q 30,117 40,116 Q 56,114 66,96 Q 72,84 72,80 Q 76,66 66,56 Z",
          color: "#c89b6c",
        },
        { d: "M 62,56 L 56,36 L 70,52 Z", color: "#c89b6c" },
        { d: "M 72,54 L 82,38 L 73,52 Z", color: "#c89b6c" },
        { d: "M 63,53 L 59,40 L 68,51 Z", color: "#e7a6b0" },
        { d: "M 73,51 L 79,41 L 74,51 Z", color: "#e7a6b0" },
        { d: "M 68,54 Q 86,62 82,92 Q 92,100 86,118 Q 80,98 76,86 Q 72,64 68,54 Z", color: "#8a5a34" },
        { d: "M 150,98 Q 172,110 164,150 Q 160,168 150,164 Q 162,140 158,118 Q 156,106 150,98 Z", color: "#8a5a34" },
        { d: "M 47,80 a 4.5,4.5 0 1,0 9,0 a 4.5,4.5 0 1,0 -9,0", color: "#3a2a20" },
        { d: "M 29,99 a 3,3.5 0 1,0 6,0 a 3,3.5 0 1,0 -6,0", color: "#5a3a28" },
      ],
    },
  ],
};
