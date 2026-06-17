import type { Animal } from "../animals";

// An original cartoon pop star (our own design). Easy version — outline first,
// colored in last.
const OUTLINE = "#4f3a2c";

export const popstar: Animal = {
  id: "popstar",
  name: "Pop Star",
  emoji: "🎤",
  level: 5,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the face and cool hair",
      color: OUTLINE,
      strokes: [
        "M 78,54 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0",
        "M 78,50 Q 74,26 100,26 Q 126,26 122,50 Q 119,38 108,36 Q 100,32 92,36 Q 81,38 78,50 Z",
      ],
    },
    {
      hint: "Add eyes and a big smile 🎶",
      color: OUTLINE,
      strokes: [
        "M 89,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 105,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 88,60 Q 100,70 112,60",
      ],
    },
    {
      hint: "Add the body, arms and legs",
      color: OUTLINE,
      strokes: [
        "M 86,76 Q 100,84 114,76 L 120,120 L 80,120 Z",
        "M 90,120 L 86,152 M 110,120 L 114,152",
        "M 86,152 L 77,154 M 114,152 L 123,154",
        "M 114,86 L 132,74 M 86,88 L 70,104",
      ],
    },
    {
      hint: "Add a microphone to sing into! 🎤",
      color: OUTLINE,
      strokes: [
        "M 130,50 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 132,47 L 146,47 M 131,52 L 147,52 M 133,57 L 145,57",
        "M 133,58 L 133,72 Q 133,76 139,76 Q 145,76 145,72 L 145,58",
      ],
    },
    {
      hint: "Finish with a sparkly star! ⭐",
      color: OUTLINE,
      strokes: ["M 50,40 l 3,9 l 9,1 l -7,6 l 2,9 l -7,-5 l -7,5 l 2,-9 l -7,-6 l 9,-1 z"],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 78,54 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0", color: "#ffe0c2" },
        {
          d: "M 78,50 Q 74,26 100,26 Q 126,26 122,50 Q 119,38 108,36 Q 100,32 92,36 Q 81,38 78,50 Z",
          color: "#9b5de5",
        },
        { d: "M 86,76 Q 100,84 114,76 L 120,120 L 80,120 Z", color: "#ff70a6" },
        { d: "M 80,64 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 110,64 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 89,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#3a2a20" },
        { d: "M 105,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#3a2a20" },
        { d: "M 130,50 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#6a6a86" },
        {
          d: "M 133,58 L 133,72 Q 133,76 139,76 Q 145,76 145,72 L 145,58 Z",
          color: "#3a3a55",
        },
        {
          d: "M 50,40 l 3,9 l 9,1 l -7,6 l 2,9 l -7,-5 l -7,5 l 2,-9 l -7,-6 l 9,-1 z",
          color: "#ffd23f",
        },
      ],
    },
  ],
};
