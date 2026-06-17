import type { Animal } from "../animals";

// A friendly kawaii hedgehog (side view): dark outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const hedgehog: Animal = {
  id: "hedgehog",
  name: "Hedgehog",
  emoji: "🦔",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw the round body and pointy nose 🟤",
      color: OUTLINE,
      strokes: [
        "M 28,124 Q 60,95 110,74 Q 162,58 174,128 L 166,150 L 50,150 Q 35,140 28,124 Z",
      ],
    },
    {
      hint: "Add spikes on its back! ⚡",
      color: OUTLINE,
      strokes: [
        "M 62,96 L 58,74 L 80,90 M 94,82 L 94,56 L 112,76 M 124,76 L 132,52 L 148,74 M 154,82 L 170,64 L 174,92",
      ],
    },
    {
      hint: "Give it an eye and a nose 👁️",
      color: OUTLINE,
      strokes: [
        "M 44,118 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 22,124 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Add four little feet 🦶",
      color: OUTLINE,
      strokes: [
        "M 72,150 L 72,160 M 90,150 L 90,160 M 128,150 L 128,160 M 146,150 L 146,160",
      ],
    },
    {
      hint: "Finish with a happy smile! 🦔",
      color: OUTLINE,
      strokes: ["M 34,131 Q 43,137 51,132"],
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
        { d: "M 45,116 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0", color: "#ffffff" },
        { d: "M 22,124 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#3a2a20" },
      ],
    },
  ],
};
