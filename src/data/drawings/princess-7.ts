import type { Animal } from "../animals";

// A more detailed princess with hair, a jewelled crown and a wand (7-year-old level).
export const princess7: Animal = {
  id: "princess-7",
  name: "Princess",
  emoji: "👑",
  level: 7,
  color: "#ef476f",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the head",
      color: "#d39a6a",
      strokes: ["M 84,56 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0"],
    },
    {
      hint: "Add long flowing hair",
      color: "#6b4f3a",
      strokes: [
        "M 72,50 Q 72,28 100,28 Q 128,28 128,50 Q 130,74 122,92",
        "M 78,92 Q 70,74 72,50",
      ],
    },
    {
      hint: "Add a sparkly jewelled crown 👑",
      color: "#ffd166",
      strokes: [
        "M 84,40 L 88,26 L 100,36 L 112,26 L 116,40 Z",
        "M 100,33 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
      ],
    },
    {
      hint: "Draw a big flowy dress 👗",
      color: "#ef476f",
      strokes: [
        "M 100,74 Q 72,116 60,162 Q 100,176 140,162 Q 128,116 100,74 Z",
        "M 84,100 Q 100,106 116,100",
      ],
    },
    {
      hint: "Add her arms",
      color: "#d39a6a",
      strokes: ["M 86,82 Q 70,104 76,122", "M 114,82 Q 134,98 132,116"],
    },
    {
      hint: "Give her a magic wand! ✨",
      color: "#ffd166",
      strokes: [
        "M 132,116 L 146,100",
        "M 146,94 l 2,5 l 5,0 l -4,4 l 2,5 l -5,-3 l -5,3 l 2,-5 l -4,-4 l 5,0 z",
      ],
    },
    {
      hint: "Finish with a happy face! 😊",
      color: "#6b4f3a",
      strokes: [
        "M 92,55 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 104,55 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 92,64 Q 100,70 108,64",
      ],
    },
  ],
};
