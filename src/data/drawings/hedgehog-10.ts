import type { Animal } from "../animals";

// A very detailed kawaii hedgehog with three spike rows, an apple and a flower
// (level 10). Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const hedgehog10: Animal = {
  id: "hedgehog-10",
  name: "Hedgehog",
  emoji: "🦔",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the round body and pointy nose 🟤",
      color: OUTLINE,
      strokes: ["M 28,124 Q 60,95 110,74 Q 162,58 174,128 L 166,150 L 50,150 Q 35,140 28,124 Z"],
    },
    {
      hint: "Add the first row of spikes ⚡",
      color: OUTLINE,
      strokes: ["M 62,96 L 58,74 L 80,90 M 94,82 L 94,56 L 112,76 M 124,76 L 132,52 L 148,74 M 154,82 L 170,64 L 174,92"],
    },
    {
      hint: "Add a second row of spikes",
      color: OUTLINE,
      strokes: ["M 76,92 L 76,72 L 92,86 M 108,80 L 113,58 L 126,76 M 140,80 L 150,60 L 160,86"],
    },
    {
      hint: "Add a third row of tiny spikes!",
      color: OUTLINE,
      strokes: ["M 86,90 L 88,76 L 100,86 M 118,86 L 122,72 L 134,84 M 148,90 L 154,78 L 164,92"],
    },
    {
      hint: "Add the eye, nose and a smile 👁️",
      color: OUTLINE,
      strokes: [
        "M 44,118 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 22,124 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 34,131 Q 43,137 51,132",
      ],
    },
    {
      hint: "Add four little feet 🦶",
      color: OUTLINE,
      strokes: ["M 72,150 L 72,162 M 90,150 L 90,162 M 128,150 L 128,162 M 146,150 L 146,162"],
    },
    {
      hint: "Add an apple on its back! 🍎",
      color: OUTLINE,
      strokes: ["M 112,46 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", "M 120,40 L 122,32"],
    },
    {
      hint: "Finish with a flower and grass 🌸",
      color: OUTLINE,
      strokes: [
        "M 184,150 L 184,134",
        "M 184,128 a 6,6 0 1,0 0,12 a 6,6 0 1,0 0,-12 M 178,134 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 28,124 Q 60,95 110,74 Q 162,58 174,128 L 166,150 L 50,150 Q 35,140 28,124 Z",
          color: "#b07b43",
        },
        { d: "M 36,128 Q 46,120 56,128 Q 52,140 42,140 Q 35,136 36,128 Z", color: "#e8c9a0" },
        { d: "M 52,131 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#ffb3c1" },
        { d: "M 44,118 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 22,124 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#3a2a20" },
        { d: "M 112,46 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#e63946" },
        { d: "M 178,134 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#ff7eb6" },
      ],
    },
  ],
};
