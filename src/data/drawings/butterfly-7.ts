import type { Animal } from "../animals";

// A more detailed, patterned kawaii butterfly (level 7).
const OUTLINE = "#4f3a2c";

export const butterfly7: Animal = {
  id: "butterfly-7",
  name: "Butterfly",
  emoji: "🦋",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the body, segments and antennae",
      color: OUTLINE,
      strokes: [
        "M 100,72 Q 96,74 96,92 L 96,135 Q 96,148 100,148 Q 104,148 104,135 L 104,92 Q 104,74 100,72 Z",
        "M 96,102 L 104,102 M 96,116 L 104,116 M 96,130 L 104,130",
        "M 98,74 Q 90,60 83,58 M 102,74 Q 110,60 117,58",
      ],
    },
    {
      hint: "Add the big top wings",
      color: OUTLINE,
      strokes: [
        "M 96,95 Q 50,52 44,92 Q 44,116 96,110 Z",
        "M 104,95 Q 150,52 156,92 Q 156,116 104,110 Z",
      ],
    },
    {
      hint: "Add the bottom wings",
      color: OUTLINE,
      strokes: [
        "M 96,114 Q 58,132 68,156 Q 82,166 98,138 Z",
        "M 104,114 Q 142,132 132,156 Q 118,166 102,138 Z",
      ],
    },
    {
      hint: "Add big spots on the wings",
      color: OUTLINE,
      strokes: [
        "M 60,86 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 124,86 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 76,142 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 114,142 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Finish with swirly wing patterns! 🌈",
      color: OUTLINE,
      strokes: ["M 50,100 Q 70,104 88,98", "M 150,100 Q 130,104 112,98"],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 96,95 Q 50,52 44,92 Q 44,116 96,110 Z", color: "#ff6f9c" },
        { d: "M 104,95 Q 150,52 156,92 Q 156,116 104,110 Z", color: "#ff6f9c" },
        { d: "M 96,114 Q 58,132 68,156 Q 82,166 98,138 Z", color: "#36a9e1" },
        { d: "M 104,114 Q 142,132 132,156 Q 118,166 102,138 Z", color: "#36a9e1" },
        {
          d: "M 100,72 Q 96,74 96,92 L 96,135 Q 96,148 100,148 Q 104,148 104,135 L 104,92 Q 104,74 100,72 Z",
          color: "#5b3a29",
        },
        { d: "M 60,86 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffd23f" },
        { d: "M 124,86 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffd23f" },
        { d: "M 76,142 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffd23f" },
        { d: "M 114,142 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffd23f" },
      ],
    },
  ],
};
