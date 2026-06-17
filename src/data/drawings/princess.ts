import type { Animal } from "../animals";

// A cute princess with a crown and a flowing gown.
export const princess: Animal = {
  id: "princess",
  name: "Princess",
  emoji: "👑",
  viewBox: "0 0 200 200",
  color: "#ef476f",
  steps: [
    {
      hint: "Start with a round head",
      color: "#d39a6a",
      strokes: ["M 82,60 a 18,18 0 1,0 36,0 a 18,18 0 1,0 -36,0"],
    },
    {
      hint: "Add a sparkly crown 👑",
      color: "#ffd166",
      strokes: ["M 84,50 L 88,33 L 94,47 L 100,30 L 106,47 L 112,33 L 116,50 Z"],
    },
    {
      hint: "Draw a big flowy dress 👗",
      color: "#ef476f",
      strokes: [
        "M 100,78 Q 76,116 62,160 Q 100,176 138,160 Q 124,116 100,78 Z",
        "M 86,104 Q 100,110 114,104",
      ],
    },
    {
      hint: "Add her arms",
      color: "#d39a6a",
      strokes: ["M 88,84 Q 72,102 76,118", "M 112,84 Q 128,102 124,118"],
    },
    {
      hint: "Finish with a happy face! 😊",
      color: "#5b3a29",
      strokes: [
        "M 91.5,57 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
        "M 103.5,57 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
        "M 94,66 Q 100,71 106,66",
      ],
    },
  ],
};
