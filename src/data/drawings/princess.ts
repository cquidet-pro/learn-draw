import type { Animal } from "../animals";

// A simple princess with a crown and a big dress.
export const princess: Animal = {
  id: "princess",
  name: "Princess",
  emoji: "👑",
  viewBox: "0 0 200 200",
  color: "#ef476f",
  steps: [
    {
      hint: "Draw the head",
      color: "#d39a6a",
      strokes: ["M 84,56 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0"],
    },
    {
      hint: "Add a sparkly crown 👑",
      color: "#ffd166",
      strokes: ["M 85,44 L 89,28 L 100,38 L 111,28 L 115,44 Z"],
    },
    {
      hint: "Draw a big flowy dress 👗",
      color: "#ef476f",
      strokes: ["M 100,72 L 68,162 L 132,162 Z"],
    },
    {
      hint: "Add arms and a happy face! 😊",
      color: "#d39a6a",
      strokes: [
        "M 86,100 L 70,122 M 114,100 L 130,122",
        "M 92,56 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 104,56 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 92,64 Q 100,70 108,64",
      ],
    },
  ],
};
