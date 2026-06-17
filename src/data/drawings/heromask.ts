import type { Animal } from "../animals";

// An original superhero mask of our own design (not based on any character). Easy version.
export const heromask: Animal = {
  id: "heromask",
  name: "Hero Mask",
  emoji: "🦸",
  level: 5,
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
      hint: "Finish with a star on the forehead! ⭐",
      color: "#ffd166",
      strokes: ["M 100,40 l 3,9 l 9,1 l -7,6 l 2,9 l -7,-5 l -7,5 l 2,-9 l -7,-6 l 9,-1 z"],
    },
  ],
};
