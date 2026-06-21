import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A detailed kawaii pony in a little meadow scene (level 10). The body has a
// flat underside so the legs join it cleanly. Outline first, colored in, then
// its name written one pen-stroke at a time.
const OUTLINE = "#4f3a2c";

export const horse10: Animal = {
  id: "horse-10",
  name: "Horse",
  emoji: "🐴",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Start with the pony's body",
      color: OUTLINE,
      strokes: [
        "M 72,90 C 64,108 66,126 82,128 L 142,128 C 158,126 160,108 152,90 C 142,78 82,78 72,90",
      ],
    },
    {
      hint: "Add the head up front",
      color: OUTLINE,
      strokes: ["M 32,74 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 42,54 L 36,36 L 52,50 Z", "M 62,54 L 68,36 L 52,50 Z"],
    },
    {
      hint: "Draw the flowing mane",
      color: OUTLINE,
      strokes: [
        "M 56,40 Q 80,52 78,86 Q 92,96 88,114",
        "M 62,44 Q 82,58 80,90",
      ],
    },
    {
      hint: "Add an eye, a nostril and a smile 👀",
      color: OUTLINE,
      strokes: [
        "M 47,72 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 33,80 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0",
        "M 33,90 Q 44,96 52,92",
      ],
    },
    {
      hint: "Add four legs that join the body 🦵",
      color: OUTLINE,
      strokes: [
        "M 88,124 L 88,166 M 104,124 L 104,166",
        "M 120,124 L 120,166 M 136,124 L 136,166",
      ],
    },
    {
      hint: "Add the hooves and a swishy tail!",
      color: OUTLINE,
      strokes: [
        "M 81,166 q 7,5 14,0 M 97,166 q 7,5 14,0",
        "M 113,166 q 7,5 14,0 M 129,166 q 7,5 14,0",
        "M 152,96 Q 178,108 170,150 Q 166,168 152,164",
      ],
    },
    {
      hint: "Give the pony a saddle 🏇",
      color: OUTLINE,
      strokes: [
        "M 96,84 L 128,84 L 124,100 L 100,100 Z",
        "M 104,80 Q 112,74 120,80 L 119,88 L 105,88 Z",
      ],
    },
    {
      hint: "Make a sunny meadow with grass ☀️",
      color: OUTLINE,
      strokes: [
        "M 8,168 L 192,168",
        "M 158,34 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 170,19 L 170,12 M 170,49 L 170,56 M 185,34 L 192,34 M 155,34 L 148,34 M 181,23 L 186,18 M 159,23 L 154,18 M 181,45 L 186,50 M 159,45 L 154,50",
        "M 20,168 l 4,-10 l 4,10 M 40,168 l 4,-12 l 4,12 M 178,168 l 4,-10 l 4,10",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 8,168 L 192,168 L 192,200 L 8,200 Z", color: "#a7d98a" },
        {
          d: "M 72,90 C 64,108 66,126 82,128 L 142,128 C 158,126 160,108 152,90 C 142,78 82,78 72,90 Z",
          color: "#c89b6c",
        },
        { d: "M 32,74 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0", color: "#c89b6c" },
        { d: "M 42,54 L 36,36 L 52,50 Z", color: "#c89b6c" },
        { d: "M 62,54 L 68,36 L 52,50 Z", color: "#c89b6c" },
        { d: "M 44,49 L 40,38 L 51,47 Z", color: "#e7a6b0" },
        { d: "M 60,49 L 64,38 L 53,47 Z", color: "#e7a6b0" },
        { d: "M 56,40 Q 80,52 78,86 Q 92,96 88,114 Q 78,94 74,82 Q 64,54 56,40 Z", color: "#8a5a34" },
        { d: "M 152,96 Q 178,108 170,150 Q 166,168 152,164 Q 166,138 162,114 Q 160,102 152,96 Z", color: "#8a5a34" },
        { d: "M 96,84 L 128,84 L 124,100 L 100,100 Z", color: "#7a3f2a" },
        { d: "M 104,80 Q 112,74 120,80 L 119,88 L 105,88 Z", color: "#9a5836" },
        { d: "M 158,34 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ffd23f" },
        { d: "M 47,72 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#3a2a20" },
        { d: "M 33,80 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0", color: "#5a3a28" },
      ],
    },
    nameStep("HORSE", { baseline: 196, height: 12 }),
  ],
};
