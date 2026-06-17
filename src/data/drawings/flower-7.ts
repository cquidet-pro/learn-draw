import type { Animal } from "../animals";

// A more detailed flower with eight petals, leaves and grass (7-year-old level).
export const flower7: Animal = {
  id: "flower-7",
  name: "Flower",
  emoji: "🌸",
  level: 7,
  color: "#06d6a0",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the stem and two leaves 🌿",
      color: "#06d6a0",
      strokes: [
        "M 100,176 L 100,112",
        "M 100,150 Q 76,138 72,158 Q 92,164 100,150 Z",
        "M 100,134 Q 124,124 128,142 Q 108,148 100,134 Z",
      ],
    },
    {
      hint: "Add the round middle 🟡",
      color: "#ffd166",
      strokes: ["M 84,98 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0"],
    },
    {
      hint: "Add eight petals all around! 🌸",
      color: "#ef476f",
      strokes: [
        "M 117,98 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 109,78 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 89,70 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 69,78 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 61,98 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 69,118 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 89,126 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 109,118 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
      ],
    },
    {
      hint: "Add little seeds in the middle",
      color: "#f4a300",
      strokes: [
        "M 95,93 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 104,96 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 97,103 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
      ],
    },
    {
      hint: "Finish with grass at the bottom! 🌱",
      color: "#06d6a0",
      strokes: [
        "M 8,178 L 192,178",
        "M 30,178 L 26,166 M 42,178 L 46,167 M 158,178 L 154,166 M 172,178 L 176,167",
      ],
    },
  ],
};
