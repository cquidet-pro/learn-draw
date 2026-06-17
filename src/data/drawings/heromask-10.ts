import type { Animal } from "../animals";

// An original superhero mask of our own design. Harder version.
export const heromask10: Animal = {
  id: "heromask-10",
  name: "Hero Mask",
  emoji: "🦸",
  level: 10,
  color: "#e63946",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the mask shape 🦸",
      strokes: [
        "M 100,26 C 140,26 160,58 158,100 C 156,138 130,170 100,170 C 70,170 44,138 42,100 C 40,58 60,26 100,26 Z",
      ],
    },
    {
      hint: "Add two big hero eyes 👀",
      color: "#1a1a2e",
      strokes: [
        "M 60,84 Q 76,72 94,84 Q 91,102 76,104 Q 62,101 60,84 Z",
        "M 140,84 Q 124,72 106,84 Q 109,102 124,104 Q 138,101 140,84 Z",
      ],
    },
    {
      hint: "Add a brow line, nose and mouth",
      strokes: ["M 54,74 Q 100,62 146,74", "M 100,108 L 100,116", "M 88,122 Q 100,128 112,122"],
    },
    {
      hint: "Add a star-burst pattern from the middle ⚡",
      color: "#1a1a2e",
      strokes: [
        "M 100,114 L 66,140 M 100,114 L 100,152 M 100,114 L 134,140 M 100,114 L 58,120 M 100,114 L 142,120",
      ],
    },
    {
      hint: "Add curved panel lines on the cheeks",
      color: "#1a1a2e",
      strokes: ["M 56,108 Q 66,132 60,156", "M 144,108 Q 134,132 140,156"],
    },
    {
      hint: "Finish with a star emblem and little stars! ⭐",
      color: "#ffd166",
      strokes: [
        "M 100,40 l 3,9 l 9,1 l -7,6 l 2,9 l -7,-5 l -7,5 l 2,-9 l -7,-6 l 9,-1 z",
        "M 76,150 l 2,5 l 6,1 l -4,4 l 1,5 l -5,-3 l -5,3 l 1,-5 l -4,-4 l 6,-1 z",
        "M 124,150 l 2,5 l 6,1 l -4,4 l 1,5 l -5,-3 l -5,3 l 1,-5 l -4,-4 l 6,-1 z",
      ],
    },
  ],
};
