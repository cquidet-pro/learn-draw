import type { Animal } from "../animals";

// A simple kawaii lion face — a drawable reward "friend".
const OUTLINE = "#6b4a1f";

export const lion: Animal = {
  id: "lion",
  name: "Lion",
  emoji: "🦁",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a big fluffy mane! 🦁",
      color: OUTLINE,
      strokes: ["M 28,100 a 72,72 0 1,0 144,0 a 72,72 0 1,0 -144,0"],
    },
    {
      hint: "Add a round face on top 🟡",
      color: OUTLINE,
      strokes: ["M 52,100 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0"],
    },
    {
      hint: "Add two little ears 👂",
      color: OUTLINE,
      strokes: [
        "M 50,62 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0",
        "M 118,62 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0",
      ],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 74,94 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 110,94 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add a cute nose 👃",
      color: OUTLINE,
      strokes: ["M 90,116 L 110,116 L 100,128 Z"],
    },
    {
      hint: "Add a smile and whiskers 〰️",
      color: OUTLINE,
      strokes: [
        "M 100,128 L 100,134 M 100,134 Q 90,142 82,135 M 100,134 Q 110,142 118,135",
        "M 78,120 L 48,114 M 78,126 L 50,132 M 122,120 L 152,114 M 122,126 L 150,132",
      ],
    },
    {
      hint: "Now color the lion in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 28,100 a 72,72 0 1,0 144,0 a 72,72 0 1,0 -144,0", color: "#d98a3d" },
        { d: "M 52,100 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0", color: "#f4c25a" },
        { d: "M 50,62 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0", color: "#d98a3d" },
        { d: "M 118,62 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0", color: "#d98a3d" },
        { d: "M 56,62 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0", color: "#f7c9a6" },
        { d: "M 124,62 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0", color: "#f7c9a6" },
        { d: "M 74,94 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#2b2620" },
        { d: "M 110,94 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#2b2620" },
        { d: "M 90,116 L 110,116 L 100,128 Z", color: "#5b4636" },
      ],
    },
  ],
};
