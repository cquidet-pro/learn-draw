import type { Animal } from "../animals";

// A simple kawaii cow face — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const cow: Animal = {
  id: "cow",
  name: "Cow",
  emoji: "🐮",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head! 🐮",
      color: OUTLINE,
      strokes: ["M 54,106 a 46,46 0 1,0 92,0 a 46,46 0 1,0 -92,0"],
    },
    {
      hint: "Add two ears on the sides 👂",
      color: OUTLINE,
      strokes: [
        "M 34,96 a 15,11 0 1,0 30,0 a 15,11 0 1,0 -30,0",
        "M 136,96 a 15,11 0 1,0 30,0 a 15,11 0 1,0 -30,0",
      ],
    },
    {
      hint: "Add two little horns 🔶",
      color: OUTLINE,
      strokes: ["M 78,64 Q 72,48 82,46", "M 122,64 Q 128,48 118,46"],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 76,100 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 108,100 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add a big muzzle and a smile 🐽",
      color: OUTLINE,
      strokes: [
        "M 72,128 a 28,18 0 1,0 56,0 a 28,18 0 1,0 -56,0",
        "M 86,126 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0",
        "M 108,126 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0",
        "M 88,140 Q 100,147 112,140",
      ],
    },
    {
      hint: "Now color the cow in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 54,106 a 46,46 0 1,0 92,0 a 46,46 0 1,0 -92,0", color: "#f4f1ee" },
        { d: "M 34,96 a 15,11 0 1,0 30,0 a 15,11 0 1,0 -30,0", color: "#f4f1ee" },
        { d: "M 136,96 a 15,11 0 1,0 30,0 a 15,11 0 1,0 -30,0", color: "#f4f1ee" },
        { d: "M 38,96 a 9,7 0 1,0 18,0 a 9,7 0 1,0 -18,0", color: "#ffb3c1" },
        { d: "M 144,96 a 9,7 0 1,0 18,0 a 9,7 0 1,0 -18,0", color: "#ffb3c1" },
        { d: "M 64,76 a 16,14 0 1,0 32,0 a 16,14 0 1,0 -32,0", color: "#3a3a3a" },
        { d: "M 120,124 a 13,11 0 1,0 26,0 a 13,11 0 1,0 -26,0", color: "#3a3a3a" },
        { d: "M 72,128 a 28,18 0 1,0 56,0 a 28,18 0 1,0 -56,0", color: "#f2a6b0" },
        { d: "M 76,100 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 108,100 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 86,126 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0", color: "#5a3a3a" },
        { d: "M 108,126 a 3,4 0 1,0 6,0 a 3,4 0 1,0 -6,0", color: "#5a3a3a" },
      ],
    },
  ],
};
