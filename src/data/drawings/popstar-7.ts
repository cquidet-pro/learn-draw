import type { Animal } from "../animals";

// An original cartoon pop star (our own design). Medium version.
export const popstar7: Animal = {
  id: "popstar-7",
  name: "Pop Star",
  emoji: "🎤",
  level: 7,
  color: "#9b5de5",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the face and cool hair",
      strokes: [
        "M 78,54 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0",
        "M 78,50 Q 74,26 100,26 Q 126,26 122,50 Q 119,38 108,36 Q 100,32 92,36 Q 81,38 78,50 Z",
      ],
    },
    {
      hint: "Add eyes and a big smile 🎶",
      strokes: [
        "M 89,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 105,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 88,60 Q 100,70 112,60",
      ],
    },
    {
      hint: "Add the body and outfit",
      strokes: ["M 86,76 Q 100,84 114,76 L 120,120 L 80,120 Z"],
    },
    {
      hint: "Add arms and legs",
      strokes: [
        "M 114,86 L 134,70 M 86,88 L 70,104",
        "M 90,120 L 86,152 M 110,120 L 114,152",
        "M 86,152 L 77,154 M 114,152 L 123,154",
      ],
    },
    {
      hint: "Add a microphone with a cord 🎤",
      color: "#3a3a55",
      strokes: [
        "M 132,60 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
        "M 137,66 L 134,70",
        "M 142,66 Q 152,92 138,114",
      ],
    },
    {
      hint: "Add a shiny star on the shirt ⭐",
      color: "#ffd166",
      strokes: ["M 100,92 l 2,5 l 6,0 l -5,4 l 2,6 l -5,-3 l -5,3 l 2,-6 l -5,-4 l 6,0 z"],
    },
    {
      hint: "Finish with musical notes! 🎵",
      color: "#ef476f",
      strokes: [
        "M 150,44 L 150,60 M 146,60 a 4,3 0 1,0 8,0 a 4,3 0 1,0 -8,0",
        "M 42,92 L 42,106 M 38,106 a 3,2.5 0 1,0 7,0 a 3,2.5 0 1,0 -7,0",
      ],
    },
  ],
};
