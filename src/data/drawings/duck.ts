import type { Animal } from "../animals";

// A simple kawaii duck face — a drawable reward "friend".
const OUTLINE = "#7a5a12";

export const duck: Animal = {
  id: "duck",
  name: "Duck",
  emoji: "🦆",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head! 🦆",
      color: OUTLINE,
      strokes: ["M 50,98 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0"],
    },
    {
      hint: "Add a wide orange beak 🟧",
      color: OUTLINE,
      strokes: ["M 64,132 a 36,16 0 1,0 72,0 a 36,16 0 1,0 -72,0"],
    },
    {
      hint: "Draw a line on the beak 〰️",
      color: OUTLINE,
      strokes: ["M 70,132 L 130,132"],
    },
    {
      hint: "Add two round eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 74,96 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 108,96 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
      ],
    },
    {
      hint: "Add a little feather tuft on top 🪶",
      color: OUTLINE,
      strokes: ["M 86,52 Q 100,28 114,52 M 100,50 L 100,38"],
    },
    {
      hint: "Add two rosy cheeks 😊",
      color: OUTLINE,
      strokes: [
        "M 54,112 a 9,7 0 1,0 18,0 a 9,7 0 1,0 -18,0",
        "M 128,112 a 9,7 0 1,0 18,0 a 9,7 0 1,0 -18,0",
      ],
    },
    {
      hint: "Now color the duck in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 50,98 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0", color: "#ffd23f" },
        { d: "M 86,52 Q 100,28 114,52 L 86,52 Z", color: "#ffd23f" },
        { d: "M 64,132 a 36,16 0 1,0 72,0 a 36,16 0 1,0 -72,0", color: "#f4a300" },
        { d: "M 54,112 a 9,7 0 1,0 18,0 a 9,7 0 1,0 -18,0", color: "#f7a6b8" },
        { d: "M 128,112 a 9,7 0 1,0 18,0 a 9,7 0 1,0 -18,0", color: "#f7a6b8" },
        { d: "M 74,96 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#2b2620" },
        { d: "M 108,96 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#2b2620" },
      ],
    },
  ],
};
