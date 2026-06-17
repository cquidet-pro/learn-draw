import type { Animal } from "../animals";

// A more detailed, patterned butterfly for the 7-year-old level.
export const butterfly7: Animal = {
  id: "butterfly-7",
  name: "Butterfly",
  emoji: "🦋",
  level: 7,
  color: "#6b4f3a",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the body, segments and antennae",
      strokes: [
        "M 100,72 Q 96,74 96,92 L 96,135 Q 96,148 100,148 Q 104,148 104,135 L 104,92 Q 104,74 100,72 Z",
        "M 96,102 L 104,102 M 96,116 L 104,116 M 96,130 L 104,130",
        "M 98,74 Q 90,60 83,58 M 102,74 Q 110,60 117,58",
      ],
    },
    {
      hint: "Add the big top wings",
      color: "#ef476f",
      strokes: [
        "M 96,95 Q 50,52 44,92 Q 44,116 96,110 Z",
        "M 104,95 Q 150,52 156,92 Q 156,116 104,110 Z",
      ],
    },
    {
      hint: "Add the bottom wings",
      color: "#118ab2",
      strokes: [
        "M 96,114 Q 58,132 68,156 Q 82,166 98,138 Z",
        "M 104,114 Q 142,132 132,156 Q 118,166 102,138 Z",
      ],
    },
    {
      hint: "Add big spots on the wings",
      color: "#ffd166",
      strokes: [
        "M 60,86 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 124,86 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 76,142 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 114,142 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Finish with swirly wing patterns! 🌈",
      color: "#9b5de5",
      strokes: [
        "M 50,100 Q 70,104 88,98",
        "M 150,100 Q 130,104 112,98",
      ],
    },
  ],
};
