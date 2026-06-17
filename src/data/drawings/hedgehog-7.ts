import type { Animal } from "../animals";

// A more detailed hedgehog with two rows of spikes and an apple (7-year-old level).
export const hedgehog7: Animal = {
  id: "hedgehog-7",
  name: "Hedgehog",
  emoji: "🦔",
  level: 7,
  color: "#8a5a2b",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the round body and pointy nose 🟤",
      strokes: [
        "M 28,124 Q 60,95 110,74 Q 162,58 174,128 L 166,150 L 50,150 Q 35,140 28,124 Z",
      ],
    },
    {
      hint: "Add the first row of spikes ⚡",
      strokes: [
        "M 62,96 L 58,74 L 80,90 M 94,82 L 94,56 L 112,76 M 124,76 L 132,52 L 148,74 M 154,82 L 170,64 L 174,92",
      ],
    },
    {
      hint: "Add a second row of spikes!",
      strokes: [
        "M 76,92 L 76,72 L 92,86 M 108,80 L 113,58 L 126,76 M 140,80 L 150,60 L 160,86",
      ],
    },
    {
      hint: "Add the eye, nose and a smile 👁️",
      strokes: [
        "M 44,118 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 22,124 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 34,131 Q 43,137 51,132",
      ],
    },
    {
      hint: "Add four little feet 🦶",
      strokes: [
        "M 72,150 L 72,162 M 90,150 L 90,162 M 128,150 L 128,162 M 146,150 L 146,162",
      ],
    },
    {
      hint: "Finish with an apple on its back! 🍎",
      color: "#e63946",
      strokes: [
        "M 112,46 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 120,40 L 122,32",
      ],
    },
  ],
};
