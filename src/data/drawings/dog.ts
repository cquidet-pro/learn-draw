import type { Animal } from "../animals";

// A friendly kawaii dog face: drawn as a dark outline step by step, then
// colored in at the end (flat fills sit behind the outlines).
const OUTLINE = "#4f3a2c";

export const dog: Animal = {
  id: "dog",
  name: "Dog",
  emoji: "🐶",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Start with a big round head! 🟤",
      color: OUTLINE,
      strokes: ["M 40,100 a 60,60 0 1,0 120,0 a 60,60 0 1,0 -120,0"],
    },
    {
      hint: "Add two floppy ears 👂",
      color: OUTLINE,
      strokes: [
        "M 55,58 Q 18,62 24,118 Q 48,132 62,96 Z",
        "M 145,58 Q 182,62 176,118 Q 152,132 138,96 Z",
      ],
    },
    {
      hint: "Now draw two big eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 72,92 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 110,92 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
      ],
    },
    {
      hint: "Give it a cute nose 👃",
      color: OUTLINE,
      strokes: ["M 88,118 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0"],
    },
    {
      hint: "Finish with a happy smile! 😄",
      color: OUTLINE,
      strokes: [
        "M 100,130 L 100,140",
        "M 100,140 Q 86,150 74,140",
        "M 100,140 Q 114,150 126,140",
      ],
    },
    {
      hint: "Now color him all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 40,100 a 60,60 0 1,0 120,0 a 60,60 0 1,0 -120,0", color: "#edb583" },
        { d: "M 55,58 Q 18,62 24,118 Q 48,132 62,96 Z", color: "#b87a44" },
        { d: "M 145,58 Q 182,62 176,118 Q 152,132 138,96 Z", color: "#b87a44" },
        { d: "M 60,124 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffb3c1" },
        { d: "M 124,124 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffb3c1" },
        { d: "M 72,92 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#3a2a20" },
        { d: "M 110,92 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#3a2a20" },
        { d: "M 75,88 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#ffffff" },
        { d: "M 113,88 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#ffffff" },
        { d: "M 88,118 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#42301f" },
      ],
    },
  ],
};
