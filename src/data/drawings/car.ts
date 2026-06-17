import type { Animal } from "../animals";

// A little kawaii car with big round wheels. Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const car: Animal = {
  id: "car",
  name: "Car",
  emoji: "🚗",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw the car body 🚗",
      color: OUTLINE,
      strokes: [
        "M 35,135 L 40,112 L 70,112 L 85,90 L 130,90 L 145,112 L 165,112 L 165,135 Z",
      ],
    },
    {
      hint: "Add the windows 🪟",
      color: OUTLINE,
      strokes: [
        "M 88,110 L 98,94 L 112,94 L 112,110 Z",
        "M 118,94 L 128,94 L 140,110 L 118,110 Z",
      ],
    },
    {
      hint: "Add big round wheels! ⚫",
      color: OUTLINE,
      strokes: [
        "M 51,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
        "M 119,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 35,135 L 40,112 L 70,112 L 85,90 L 130,90 L 145,112 L 165,112 L 165,135 Z",
          color: "#33a8d6",
        },
        { d: "M 88,110 L 98,94 L 112,94 L 112,110 Z", color: "#cdeefb" },
        { d: "M 118,94 L 128,94 L 140,110 L 118,110 Z", color: "#cdeefb" },
        { d: "M 51,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0", color: "#3a3a55" },
        { d: "M 119,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0", color: "#3a3a55" },
        { d: "M 60,138 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#b8bccc" },
        { d: "M 128,138 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#b8bccc" },
      ],
    },
  ],
};
