import type { Animal } from "../animals";

// A friendly dog face, built up step by step in a 200x200 box.
export const dog: Animal = {
  id: "dog",
  name: "Dog",
  emoji: "🐶",
  viewBox: "0 0 200 200",
  color: "#7a5230",
  steps: [
    {
      hint: "Start with a big round head! 🟤",
      strokes: ["M 40,100 a 60,60 0 1,0 120,0 a 60,60 0 1,0 -120,0"],
    },
    {
      hint: "Add two floppy ears 👂",
      strokes: [
        "M 55,58 Q 18,62 24,118 Q 48,132 62,96 Z",
        "M 145,58 Q 182,62 176,118 Q 152,132 138,96 Z",
      ],
    },
    {
      hint: "Now draw two big eyes 👀",
      strokes: [
        "M 72,92 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 110,92 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
      ],
    },
    {
      hint: "Give it a cute nose 👃",
      strokes: ["M 88,118 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0"],
    },
    {
      hint: "Finish with a happy smile! 😄",
      strokes: [
        "M 100,130 L 100,140",
        "M 100,140 Q 86,150 74,140",
        "M 100,140 Q 114,150 126,140",
      ],
    },
  ],
};
