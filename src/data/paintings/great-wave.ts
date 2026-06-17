import type { Animal } from "../animals";

// A simple, original kid-sketch inspired by Hokusai's "The Great Wave off Kanagawa".
export const greatWave: Animal = {
  id: "great-wave",
  name: "The Great Wave",
  emoji: "🌊",
  artist: "Hokusai",
  fact: "Hokusai made this in Japan almost 200 years ago — it's printed from carved wood!",
  viewBox: "0 0 200 200",
  color: "#1d4e89",
  steps: [
    {
      hint: "Draw the big curling wave 🌊",
      color: "#1d4e89",
      strokes: [
        "M 8,150 C 6,80 55,42 105,58 C 145,71 150,108 116,112 C 96,114 92,90 110,84",
      ],
    },
    {
      hint: "Add foamy claws on top ☁️",
      color: "#5fa8d3",
      strokes: [
        "M 58,58 q 6,-12 15,-4 M 80,50 q 6,-12 15,-3 M 100,54 q 6,-11 14,-1",
      ],
    },
    {
      hint: "Add little Mount Fuji behind 🗻",
      color: "#3a3a55",
      strokes: [
        "M 128,128 L 156,88 L 184,128 Z",
        "M 147,100 L 156,88 L 165,100",
      ],
    },
    {
      hint: "Finish with little boats riding the sea ⛵",
      color: "#6b4f3a",
      strokes: [
        "M 40,138 Q 62,150 86,138",
        "M 96,150 Q 116,160 138,150",
      ],
    },
  ],
};
