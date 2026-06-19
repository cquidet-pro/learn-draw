import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A detailed kawaii flower scene with a bee and sun (level 10).
const OUTLINE = "#4f3a2c";

export const flower10: Animal = {
  id: "flower-10",
  name: "Flower",
  emoji: "🌸",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the stem and two leaves 🌿",
      color: OUTLINE,
      strokes: [
        "M 100,176 L 100,112",
        "M 100,150 Q 76,138 72,158 Q 92,164 100,150 Z",
        "M 100,134 Q 124,124 128,142 Q 108,148 100,134 Z",
      ],
    },
    { hint: "Add the round middle 🟡", color: OUTLINE, strokes: ["M 84,98 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0"] },
    {
      hint: "Add eight petals all around! 🌸",
      color: OUTLINE,
      strokes: [
        "M 117,98 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 109,78 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 89,70 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 69,78 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 61,98 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 69,118 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 89,126 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 109,118 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
      ],
    },
    {
      hint: "Add seeds and grass",
      color: OUTLINE,
      strokes: [
        "M 95,93 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 104,96 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 97,103 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
      ],
    },
    {
      hint: "Add a buzzy bee 🐝",
      color: OUTLINE,
      strokes: [
        "M 150,70 a 10,7 0 1,0 20,0 a 10,7 0 1,0 -20,0",
        "M 157,63 L 157,77 M 163,63 L 163,77",
        "M 150,68 Q 142,60 146,70 M 170,68 Q 178,60 174,70",
      ],
    },
    {
      hint: "Finish with a shining sun! ☀️",
      color: OUTLINE,
      strokes: [
        "M 30,40 a 13,13 0 1,0 26,0 a 13,13 0 1,0 -26,0",
        "M 43,18 L 43,8 M 43,62 L 43,72 M 8,40 L 18,40 M 68,40 L 78,40",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 117,98 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 109,78 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 89,70 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 69,78 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 61,98 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 69,118 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 89,126 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 109,118 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0", color: "#ff7eb6" },
        { d: "M 100,150 Q 76,138 72,158 Q 92,164 100,150 Z", color: "#06d6a0" },
        { d: "M 100,134 Q 124,124 128,142 Q 108,148 100,134 Z", color: "#06d6a0" },
        { d: "M 84,98 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0", color: "#ffd23f" },
        { d: "M 150,70 a 10,7 0 1,0 20,0 a 10,7 0 1,0 -20,0", color: "#ffd23f" },
        { d: "M 30,40 a 13,13 0 1,0 26,0 a 13,13 0 1,0 -26,0", color: "#ffd23f" },
      ],
    },
    nameStep("FLOWER", { baseline: 194, height: 16 }),
  ],
};
