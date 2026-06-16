import type { Animal } from "../animals";

// A little car with big round wheels.
export const car: Animal = {
  id: "car",
  name: "Car",
  emoji: "🚗",
  viewBox: "0 0 200 200",
  color: "#118ab2",
  steps: [
    {
      hint: "Draw the car body 🚗",
      strokes: [
        "M 35,135 L 40,112 L 70,112 L 85,90 L 130,90 L 145,112 L 165,112 L 165,135 Z",
      ],
    },
    {
      hint: "Add the windows 🪟",
      color: "#9bd8e6",
      strokes: [
        "M 88,110 L 98,94 L 112,94 L 112,110 Z",
        "M 118,94 L 128,94 L 140,110 L 118,110 Z",
      ],
    },
    {
      hint: "Add big round wheels! ⚫",
      color: "#3a3a55",
      strokes: [
        "M 51,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
        "M 119,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
      ],
    },
  ],
};
