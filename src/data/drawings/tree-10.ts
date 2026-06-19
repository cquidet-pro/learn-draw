import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A detailed kawaii tree with roots, bark, a swing and a bird (level 10).
const OUTLINE = "#4f3a2c";

const CANOPY =
  "M 88,124 Q 60,128 54,104 Q 44,86 64,76 Q 66,52 90,56 Q 100,46 110,56 Q 134,52 136,76 Q 156,86 146,104 Q 140,128 112,124 Q 100,130 88,124 Z";

export const tree10: Animal = {
  id: "tree-10",
  name: "Tree",
  emoji: "🌳",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the trunk with roots 🟫",
      color: OUTLINE,
      strokes: [
        "M 88,124 L 88,176 L 112,176 L 112,124",
        "M 88,176 Q 78,180 70,182 M 112,176 Q 122,180 130,182",
      ],
    },
    {
      hint: "Add a big cloud of leaves 🌳",
      color: OUTLINE,
      strokes: [CANOPY],
    },
    {
      hint: "Add yummy apples! 🍎",
      color: OUTLINE,
      strokes: [
        "M 73,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 117,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 95,108 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
      ],
    },
    {
      hint: "Add bark lines on the trunk",
      color: OUTLINE,
      strokes: ["M 96,130 L 96,172 M 104,130 L 104,172"],
    },
    {
      hint: "Hang a little swing from a branch 🪢",
      color: OUTLINE,
      strokes: ["M 66,122 L 64,152 M 80,122 L 82,152", "M 60,152 L 86,152"],
    },
    {
      hint: "Add a little bird 🐦",
      color: OUTLINE,
      strokes: ["M 150,46 q 7,-7 14,0 q 7,-7 14,0"],
    },
    {
      hint: "Finish with grass at the bottom! 🌱",
      color: OUTLINE,
      strokes: ["M 8,182 L 192,182", "M 32,182 L 28,170 M 168,182 L 172,170"],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 88,124 L 88,176 L 112,176 L 112,124 Z", color: "#8a5a2b" },
        { d: CANOPY, color: "#46b56a" },
        { d: "M 73,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
        { d: "M 117,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
        { d: "M 95,108 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#e63946" },
      ],
    },
    nameStep("TREE", { baseline: 197, height: 13 }),
  ],
};
