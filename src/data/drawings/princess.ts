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
      hint: "Add the arms",
      color: "#d39a6a",
      strokes: ["M 86,100 L 70,122 M 114,100 L 130,122"],
    },
    {
      hint: "Add big cute eyes and a sweet smile 😊",
      color: "#6b4f3a",
      strokes: [
        "M 89,55 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 103,55 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 86,51 L 83,48 M 114,51 L 117,48",
        "M 93,64 Q 100,70 107,64",
      ],
    },
    {
      hint: "Finish with rosy cheeks! 🌸",
      color: "#ff8fab",
      strokes: [
        "M 86,62 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 108,62 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
      ],
    },
  ],
};
