import type { Animal } from "../animals";

// A detailed car with mirror, exhaust, headlights, road and a sunny sky (10-year-old level).
export const car10: Animal = {
  id: "car-10",
  name: "Car",
  emoji: "🚗",
  level: 10,
  color: "#118ab2",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the car body 🚗",
      strokes: ["M 35,130 L 40,107 L 70,107 L 85,85 L 130,85 L 145,107 L 165,107 L 165,130 Z"],
    },
    {
      hint: "Add the windows 🪟",
      color: "#9bd8e6",
      strokes: ["M 88,105 L 98,89 L 112,89 L 112,105 Z", "M 118,89 L 128,89 L 140,105 L 118,105 Z"],
    },
    {
      hint: "Add two big wheels ⚫",
      color: "#3a3a55",
      strokes: [
        "M 51,133 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
        "M 119,133 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0",
      ],
    },
    {
      hint: "Add shiny hubcaps in the wheels",
      color: "#9aa5b1",
      strokes: [
        "M 61,133 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 129,133 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Add a door, handle and headlight",
      strokes: ["M 108,107 L 108,130", "M 98,115 L 105,115", "M 156,111 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0"],
    },
    {
      hint: "Add a side mirror and a puff of exhaust 💨",
      color: "#9aa5b1",
      strokes: ["M 85,90 L 78,86", "M 30,124 q -8,-4 0,-8 q 8,-4 0,-8"],
    },
    {
      hint: "Add the road 🛣️",
      color: "#9aa5b1",
      strokes: ["M 20,166 L 45,166 M 65,166 L 90,166 M 110,166 L 135,166 M 155,166 L 180,166"],
    },
    {
      hint: "Finish with a sunny sky! ☀️",
      color: "#f4a300",
      strokes: [
        "M 158,34 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 170,16 L 170,8 M 148,46 L 142,52 M 192,46 L 198,52",
      ],
    },
  ],
};
