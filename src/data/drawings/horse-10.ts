import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A detailed kawaii pony in a little meadow scene (level 10). Outline first,
// colored in, then its name written one pen-stroke at a time.
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
      strokes: ["M 68,104 a 42,28 0 1,0 84,0 a 42,28 0 1,0 -84,0"],
    },
    {
      hint: "Add the head up front",
      color: OUTLINE,
      strokes: ["M 34,74 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 44,54 L 38,36 L 54,50 Z", "M 64,54 L 70,36 L 54,50 Z"],
    },
    {
      hint: "Draw the flowing mane",
      color: OUTLINE,
      strokes: [
        "M 58,42 Q 82,52 78,86 Q 92,96 88,114",
        "M 64,46 Q 84,60 80,90",
      ],
    },
    {
      hint: "Add an eye, a nostril and a smile 👀",
      color: OUTLINE,
      strokes: [
        "M 47,72 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 34,80 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0",
        "M 34,90 Q 44,96 52,92",
      ],
    },
    {
      hint: "Add four legs 🦵",
      color: OUTLINE,
      strokes: [
        "M 82,130 L 80,166 M 100,132 L 100,166",
        "M 126,132 L 128,166 M 144,130 L 146,166",
      ],
    },
    {
      hint: "Add the hooves and a swishy tail!",
      color: OUTLINE,
      strokes: [
        "M 74,166 q 7,5 14,0 M 94,166 q 7,5 14,0",
        "M 122,166 q 7,5 14,0 M 140,166 q 7,5 14,0",
        "M 150,92 Q 178,106 170,150 Q 166,170 150,166",
      ],
    },
    {
      hint: "Give the pony a saddle 🏇",
      color: OUTLINE,
      strokes: [
        "M 96,80 L 128,80 L 124,98 L 100,98 Z",
        "M 104,76 Q 112,70 120,76 L 119,84 L 105,84 Z",
      ],
    },
    {
      hint: "Make a sunny meadow with grass ☀️",
      color: OUTLINE,
      strokes: [
        "M 8,168 L 192,168",
        "M 174,30 a 12,12 0 1,0 0.01,0",
        "M 174,12 L 174,4 M 174,56 L 174,48 M 152,30 L 144,30 M 196,30 L 204,30",
        "M 20,168 l 4,-10 l 4,10 M 40,168 l 4,-12 l 4,12 M 168,168 l 4,-10 l 4,10",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 8,168 L 192,168 L 192,200 L 8,200 Z", color: "#a7d98a" },
        { d: "M 68,104 a 42,28 0 1,0 84,0 a 42,28 0 1,0 -84,0", color: "#c89b6c" },
        { d: "M 34,74 a 20,22 0 1,0 40,0 a 20,22 0 1,0 -40,0", color: "#c89b6c" },
        { d: "M 44,54 L 38,36 L 54,50 Z", color: "#c89b6c" },
        { d: "M 64,54 L 70,36 L 54,50 Z", color: "#c89b6c" },
        { d: "M 46,50 L 42,38 L 53,48 Z", color: "#e7a6b0" },
        { d: "M 62,50 L 66,38 L 55,48 Z", color: "#e7a6b0" },
        { d: "M 82,130 L 80,166 L 76,166 L 78,130 Z", color: "#b07f4f" },
        { d: "M 100,132 L 100,166 L 96,166 L 96,132 Z", color: "#b07f4f" },
        { d: "M 126,132 L 128,166 L 124,166 L 122,132 Z", color: "#b07f4f" },
        { d: "M 144,130 L 146,166 L 142,166 L 140,130 Z", color: "#b07f4f" },
        { d: "M 58,42 Q 82,52 78,86 Q 92,96 88,114 Q 76,94 74,82 Q 68,56 58,42 Z", color: "#8a5a34" },
        { d: "M 150,92 Q 178,106 170,150 Q 166,170 150,166 Q 164,138 160,114 Q 158,100 150,92 Z", color: "#8a5a34" },
        { d: "M 96,80 L 128,80 L 124,98 L 100,98 Z", color: "#7a3f2a" },
        { d: "M 104,76 Q 112,70 120,76 L 119,84 L 105,84 Z", color: "#9a5836" },
        { d: "M 174,30 a 12,12 0 1,0 0.01,0", color: "#ffd23f" },
        { d: "M 47,72 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#3a2a20" },
        { d: "M 34,80 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0", color: "#5a3a28" },
      ],
    },
    nameStep("HORSE", { baseline: 196, height: 12 }),
  ],
};
