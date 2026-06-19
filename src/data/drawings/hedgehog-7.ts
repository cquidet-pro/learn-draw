import type { Animal } from "../animals";

// A more detailed kawaii hedgehog with two rows of spikes and an apple (level 7).
const OUTLINE = "#4f3a2c";

export const hedgehog7: Animal = {
  id: "hedgehog-7",
  name: "Hedgehog",
  emoji: "🦔",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the round body and pointy nose 🟤",
      color: OUTLINE,
      strokes: [
        "M 28,124 Q 60,95 110,74 Q 162,58 174,128 L 166,150 L 50,150 Q 35,140 28,124 Z",
      ],
    },
    {
      hint: "Add the first row of spikes ⚡",
      color: OUTLINE,
      strokes: [
        "M 60,102 L 73,61 L 78,91 M 90,85 L 103,47 L 108,77 M 116,74 L 129,45 L 134,73 M 140,75 L 155,49 L 162,94",
      ],
    },
    {
      hint: "Add a second row of spikes!",
      color: OUTLINE,
      strokes: [
        "M 74,93 L 87,62 L 92,84 M 104,79 L 118,51 L 124,73 M 134,73 L 150,53 L 158,88",
      ],
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
      strokes: [
        "M 72,150 L 72,162 M 90,150 L 90,162 M 128,150 L 128,162 M 146,150 L 146,162",
      ],
    },
    {
      hint: "Finish with an apple on its back! 🍎",
      color: OUTLINE,
      strokes: [
        "M 112,46 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 120,40 L 122,32",
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
      ],
    },
  ],
};
