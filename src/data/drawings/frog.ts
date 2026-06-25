import type { Animal } from "../animals";

// A simple kawaii frog face — a drawable reward "friend".
const OUTLINE = "#2f5d3a";

export const frog: Animal = {
  id: "frog",
  name: "Frog",
  emoji: "🐸",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a wide round head! 🐸",
      color: OUTLINE,
      strokes: ["M 44,118 a 56,48 0 1,0 112,0 a 56,48 0 1,0 -112,0"],
    },
    {
      hint: "Add two big eye bumps on top 👀",
      color: OUTLINE,
      strokes: [
        "M 46,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0",
        "M 98,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0",
      ],
    },
    {
      hint: "Add the white parts of the eyes ⚪",
      color: OUTLINE,
      strokes: [
        "M 54,64 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0",
        "M 106,64 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0",
      ],
    },
    {
      hint: "Add two big round eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 64,66 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
        "M 116,66 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
      ],
    },
    {
      hint: "Add two tiny nostrils 👃",
      color: OUTLINE,
      strokes: [
        "M 90,108 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 104,108 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
      ],
    },
    {
      hint: "Add a big friendly smile 😄",
      color: OUTLINE,
      strokes: ["M 64,128 Q 100,162 136,128"],
    },
    {
      hint: "Now color the frog in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 44,118 a 56,48 0 1,0 112,0 a 56,48 0 1,0 -112,0", color: "#6abf4b" },
        { d: "M 46,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0", color: "#6abf4b" },
        { d: "M 98,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0", color: "#6abf4b" },
        { d: "M 50,142 a 12,9 0 1,0 24,0 a 12,9 0 1,0 -24,0", color: "#f7a6b8" },
        { d: "M 126,142 a 12,9 0 1,0 24,0 a 12,9 0 1,0 -24,0", color: "#f7a6b8" },
        { d: "M 54,64 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0", color: "#ffffff" },
        { d: "M 106,64 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0", color: "#ffffff" },
        { d: "M 64,66 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0", color: "#2b2620" },
        { d: "M 116,66 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0", color: "#2b2620" },
      ],
    },
  ],
};
