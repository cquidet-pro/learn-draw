import type { Animal } from "../animals";

// A simple kawaii hamster face — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const hamster: Animal = {
  id: "hamster",
  name: "Hamster",
  emoji: "🐹",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a big round head! 🐹",
      color: OUTLINE,
      strokes: ["M 48,104 a 52,52 0 1,0 104,0 a 52,52 0 1,0 -104,0"],
    },
    {
      hint: "Add two little ears 👂",
      color: OUTLINE,
      strokes: [
        "M 52,56 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
        "M 118,56 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
      ],
    },
    {
      hint: "Add two puffy cheeks 😊",
      color: OUTLINE,
      strokes: [
        "M 40,124 a 20,18 0 1,0 40,0 a 20,18 0 1,0 -40,0",
        "M 120,124 a 20,18 0 1,0 40,0 a 20,18 0 1,0 -40,0",
      ],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 76,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
        "M 110,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
      ],
    },
    {
      hint: "Add a nose and a smile 😄",
      color: OUTLINE,
      strokes: [
        "M 95,118 a 5,4 0 1,0 10,0 a 5,4 0 1,0 -10,0",
        "M 100,122 L 100,127 M 100,127 Q 92,134 86,128 M 100,127 Q 108,134 114,128",
      ],
    },
    {
      hint: "Now color the hamster in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 48,104 a 52,52 0 1,0 104,0 a 52,52 0 1,0 -104,0", color: "#e8b06a" },
        { d: "M 52,56 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0", color: "#e8b06a" },
        { d: "M 118,56 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0", color: "#e8b06a" },
        { d: "M 57,56 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#ffb3c1" },
        { d: "M 123,56 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#ffb3c1" },
        { d: "M 40,124 a 20,18 0 1,0 40,0 a 20,18 0 1,0 -40,0", color: "#f4cf96" },
        { d: "M 120,124 a 20,18 0 1,0 40,0 a 20,18 0 1,0 -40,0", color: "#f4cf96" },
        { d: "M 76,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
        { d: "M 110,100 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0", color: "#3a2a20" },
        { d: "M 95,118 a 5,4 0 1,0 10,0 a 5,4 0 1,0 -10,0", color: "#ff8aa0" },
      ],
    },
  ],
};
