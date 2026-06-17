import type { Animal } from "../animals";

// An original superhero mask of our own design. Medium version.
export const heromask7: Animal = {
  id: "heromask-7",
  name: "Hero Mask",
  emoji: "🦸",
  level: 7,
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
      hint: "Add an eye mask across the eyes 🦸",
      color: "#1a1a2e",
      strokes: [
        "M 48,82 Q 56,68 76,70 Q 90,72 100,82 Q 110,72 124,70 Q 144,68 152,82 Q 152,106 128,108 Q 108,108 100,96 Q 92,108 72,108 Q 48,106 48,82 Z",
      ],
    },
    {
      hint: "Add two big eyes 👀",
      color: "#1a1a2e",
      strokes: [
        "M 62,84 Q 76,74 92,84 Q 89,100 76,102 Q 64,99 62,84 Z",
        "M 138,84 Q 124,74 108,84 Q 111,100 124,102 Q 136,99 138,84 Z",
      ],
    },
    {
      hint: "Add a nose and a mouth",
      strokes: ["M 100,112 L 100,122", "M 86,128 Q 100,134 114,128"],
    },
    {
      hint: "Finish with bold pattern lines ⚡",
      color: "#1a1a2e",
      strokes: ["M 100,118 L 70,146 M 100,118 L 100,156 M 100,118 L 130,146"],
    },
  ],
};
