import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A very ornate kawaii butterfly with patterned wings, over a row of flowers
// (level 10). Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const butterfly10: Animal = {
  id: "butterfly-10",
  name: "Butterfly",
  emoji: "🦋",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the body, segments and antennae",
      color: OUTLINE,
      strokes: [
        "M 100,58 Q 96,60 96,78 L 96,118 Q 96,131 100,131 Q 104,131 104,118 L 104,78 Q 104,60 100,58 Z",
        "M 96,86 L 104,86 M 96,100 L 104,100 M 96,114 L 104,114",
        "M 98,60 Q 90,46 83,44 M 102,60 Q 110,46 117,44",
      ],
    },
    {
      hint: "Add the big top wings",
      color: OUTLINE,
      strokes: ["M 96,80 Q 50,38 44,78 Q 44,102 96,96 Z", "M 104,80 Q 150,38 156,78 Q 156,102 104,96 Z"],
    },
    {
      hint: "Add the bottom wings",
      color: OUTLINE,
      strokes: ["M 96,100 Q 58,118 68,142 Q 82,152 98,124 Z", "M 104,100 Q 142,118 132,142 Q 118,152 102,124 Z"],
    },
    {
      hint: "Add big spots on the wings",
      color: OUTLINE,
      strokes: [
        "M 60,72 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 124,72 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 76,128 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 114,128 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Add swirly patterns on the wings 🌈",
      color: OUTLINE,
      strokes: ["M 50,86 Q 70,90 88,84", "M 150,86 Q 130,90 112,84", "M 70,134 Q 80,138 90,132", "M 130,134 Q 120,138 110,132"],
    },
    {
      hint: "Finish with a row of flowers below! 🌷",
      color: OUTLINE,
      strokes: [
        "M 40,184 L 40,166 M 100,184 L 100,164 M 160,184 L 160,166",
        "M 36,162 a 5,5 0 1,0 8,0 a 5,5 0 1,0 -8,0 M 96,160 a 5,5 0 1,0 8,0 a 5,5 0 1,0 -8,0 M 156,162 a 5,5 0 1,0 8,0 a 5,5 0 1,0 -8,0",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 96,80 Q 50,38 44,78 Q 44,102 96,96 Z", color: "#ff6f9c" },
        { d: "M 104,80 Q 150,38 156,78 Q 156,102 104,96 Z", color: "#ff6f9c" },
        { d: "M 96,100 Q 58,118 68,142 Q 82,152 98,124 Z", color: "#36a9e1" },
        { d: "M 104,100 Q 142,118 132,142 Q 118,152 102,124 Z", color: "#36a9e1" },
        {
          d: "M 100,58 Q 96,60 96,78 L 96,118 Q 96,131 100,131 Q 104,131 104,118 L 104,78 Q 104,60 100,58 Z",
          color: "#5b3a29",
        },
        { d: "M 60,72 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffd23f" },
        { d: "M 124,72 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#ffd23f" },
        { d: "M 76,128 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffd23f" },
        { d: "M 114,128 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffd23f" },
        { d: "M 36,162 a 5,5 0 1,0 8,0 a 5,5 0 1,0 -8,0", color: "#ff7eb6" },
        { d: "M 96,160 a 5,5 0 1,0 8,0 a 5,5 0 1,0 -8,0", color: "#ff7eb6" },
        { d: "M 156,162 a 5,5 0 1,0 8,0 a 5,5 0 1,0 -8,0", color: "#ff7eb6" },
      ],
    },
    nameStep("BUTTERFLY", { baseline: 26, height: 15 }),
  ],
};
