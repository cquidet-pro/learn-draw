import type { Animal } from "../animals";

// A more detailed kawaii car with hubcaps, a door, a headlight and a road
// (level 7). Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const car7: Animal = {
  id: "car-7",
  name: "Car",
  emoji: "🚗",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
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
      hint: "Add two big wheels ⚫",
      color: OUTLINE,
      strokes: [
        "M 51,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
        "M 119,138 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
      ],
    },
    {
      hint: "Add shiny hubcaps in the wheels",
      color: OUTLINE,
      strokes: [
        "M 61,138 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 129,138 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Add a door, handle and headlight",
      color: OUTLINE,
      strokes: [
        "M 108,112 L 108,135",
        "M 98,120 L 105,120",
        "M 156,116 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
      ],
    },
    {
      hint: "Finish with the road! 🛣️",
      color: OUTLINE,
      strokes: ["M 20,170 L 45,170 M 65,170 L 90,170 M 110,170 L 135,170 M 155,170 L 180,170"],
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
        { d: "M 61,138 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#b8bccc" },
        { d: "M 129,138 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#b8bccc" },
        { d: "M 156,116 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#ffd23f" },
      ],
    },
  ],
};
