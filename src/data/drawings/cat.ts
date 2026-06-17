import type { Animal } from "../animals";

// A friendly kawaii cat face: dark outline drawn step by step, colored in last.
const OUTLINE = "#4f3a2c";

export const cat: Animal = {
  id: "cat",
  name: "Cat",
  emoji: "🐱",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head 🟠",
      color: OUTLINE,
      strokes: ["M 42,102 a 58,58 0 1,0 116,0 a 58,58 0 1,0 -116,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 56,62 L 44,18 L 86,52 Z", "M 144,62 L 156,18 L 114,52 Z"],
    },
    {
      hint: "Now two sparkly eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 74,96 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 110,96 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add a little triangle nose 👃",
      color: OUTLINE,
      strokes: ["M 100,110 L 91,118 L 109,118 Z"],
    },
    {
      hint: "Finish with whiskers and a smile! 😺",
      color: OUTLINE,
      strokes: [
        "M 100,118 L 100,128",
        "M 100,128 Q 90,138 80,130",
        "M 100,128 Q 110,138 120,130",
        "M 88,116 L 52,108 M 88,122 L 50,122 M 88,128 L 54,138",
        "M 112,116 L 148,108 M 112,122 L 150,122 M 112,128 L 146,138",
      ],
    },
    {
      hint: "Now color her all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 42,102 a 58,58 0 1,0 116,0 a 58,58 0 1,0 -116,0", color: "#f4a04a" },
        { d: "M 56,62 L 44,18 L 86,52 Z", color: "#f4a04a" },
        { d: "M 144,62 L 156,18 L 114,52 Z", color: "#f4a04a" },
        { d: "M 60,56 L 52,32 L 76,52 Z", color: "#ff9eb5" },
        { d: "M 140,56 L 148,32 L 124,52 Z", color: "#ff9eb5" },
        { d: "M 64,116 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffb3c1" },
        { d: "M 120,116 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffb3c1" },
        { d: "M 74,96 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 110,96 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 77,93 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0", color: "#ffffff" },
        { d: "M 113,93 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0", color: "#ffffff" },
        { d: "M 100,110 L 91,118 L 109,118 Z", color: "#ff8aa0" },
      ],
    },
  ],
};
