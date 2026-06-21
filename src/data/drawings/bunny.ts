import type { Animal } from "../animals";

// A simple kawaii bunny face — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const bunny: Animal = {
  id: "bunny",
  name: "Bunny",
  emoji: "🐰",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head! 🐰",
      color: OUTLINE,
      strokes: ["M 56,120 a 44,44 0 1,0 88,0 a 44,44 0 1,0 -88,0"],
    },
    {
      hint: "Add two tall ears 👂",
      color: OUTLINE,
      strokes: [
        "M 70,50 a 14,40 0 1,0 28,0 a 14,40 0 1,0 -28,0",
        "M 102,50 a 14,40 0 1,0 28,0 a 14,40 0 1,0 -28,0",
      ],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 76,116 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 108,116 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add a little nose 👃",
      color: OUTLINE,
      strokes: ["M 94,134 a 6,5 0 1,0 12,0 a 6,5 0 1,0 -12,0"],
    },
    {
      hint: "Add a smile 😄",
      color: OUTLINE,
      strokes: [
        "M 100,139 L 100,145 M 100,145 Q 90,152 84,146 M 100,145 Q 110,152 116,146",
      ],
    },
    {
      hint: "Now color the bunny in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 56,120 a 44,44 0 1,0 88,0 a 44,44 0 1,0 -88,0", color: "#f4f1ee" },
        { d: "M 70,50 a 14,40 0 1,0 28,0 a 14,40 0 1,0 -28,0", color: "#f4f1ee" },
        { d: "M 102,50 a 14,40 0 1,0 28,0 a 14,40 0 1,0 -28,0", color: "#f4f1ee" },
        { d: "M 76,50 a 7,28 0 1,0 14,0 a 7,28 0 1,0 -14,0", color: "#ffb3c1" },
        { d: "M 108,50 a 7,28 0 1,0 14,0 a 7,28 0 1,0 -14,0", color: "#ffb3c1" },
        { d: "M 76,116 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 108,116 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 94,134 a 6,5 0 1,0 12,0 a 6,5 0 1,0 -12,0", color: "#ff8aa0" },
      ],
    },
  ],
};
