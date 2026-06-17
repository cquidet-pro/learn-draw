import type { Animal } from "../animals";

// A more refined, full-body sitting dog for the 7-year-old level.
export const dog7: Animal = {
  id: "dog-7",
  name: "Dog",
  emoji: "🐶",
  level: 7,
  color: "#7a5230",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Start with the round head",
      strokes: ["M 70,54 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0"],
    },
    {
      hint: "Add two floppy ears 👂",
      strokes: [
        "M 74,33 Q 50,33 54,74 Q 72,78 82,52 Z",
        "M 126,33 Q 150,33 146,74 Q 128,78 118,52 Z",
      ],
    },
    {
      hint: "Add the eyes and eyebrows 👀",
      strokes: [
        "M 84,52 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 108,52 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 82,42 Q 88,38 94,42",
        "M 106,42 Q 112,38 118,42",
      ],
    },
    {
      hint: "Draw the nose and a smiley mouth 👃",
      strokes: [
        "M 95,63 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 100,68 L 100,73 M 100,73 Q 92,80 86,74 M 100,73 Q 108,80 114,74",
      ],
    },
    {
      hint: "Add the sitting body",
      strokes: ["M 80,80 C 66,100 64,150 76,166 L 124,166 C 136,150 134,100 120,80"],
    },
    {
      hint: "Add the front legs and paws 🐾",
      strokes: [
        "M 90,166 L 90,180 M 110,166 L 110,180",
        "M 83,180 q 7,6 14,0 M 103,180 q 7,6 14,0",
      ],
    },
    {
      hint: "Finish with a wagging tail!",
      strokes: ["M 124,138 Q 150,132 146,108"],
    },
  ],
};
