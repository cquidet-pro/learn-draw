import type { Animal } from "../animals";

// An even more detailed sitting kawaii dog with a collar and a little scene
// (level 10). Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const dog10: Animal = {
  id: "dog-10",
  name: "Dog",
  emoji: "🐶",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Start with the round head", color: OUTLINE, strokes: ["M 70,52 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0"] },
    {
      hint: "Add two floppy ears 👂",
      color: OUTLINE,
      strokes: [
        "M 74,31 Q 50,31 54,72 Q 72,76 82,50 Z",
        "M 126,31 Q 150,31 146,72 Q 128,76 118,50 Z",
      ],
    },
    {
      hint: "Add eyes and eyebrows 👀",
      color: OUTLINE,
      strokes: [
        "M 84,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 108,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 82,40 Q 88,36 94,40",
        "M 106,40 Q 112,36 118,40",
      ],
    },
    {
      hint: "Draw the nose and mouth 👃",
      color: OUTLINE,
      strokes: [
        "M 95,61 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 100,66 L 100,71 M 100,71 Q 92,78 86,72 M 100,71 Q 108,78 114,72",
      ],
    },
    {
      hint: "Add a little tongue!",
      color: OUTLINE,
      strokes: ["M 100,73 Q 99,84 104,86 Q 109,83 107,73"],
    },
    {
      hint: "Add the sitting body",
      color: OUTLINE,
      strokes: ["M 80,80 C 66,100 64,150 76,166 L 124,166 C 136,150 134,100 120,80"],
    },
    {
      hint: "Add front legs and paws 🐾",
      color: OUTLINE,
      strokes: [
        "M 90,166 L 90,180 M 110,166 L 110,180",
        "M 83,180 q 7,6 14,0 M 103,180 q 7,6 14,0",
      ],
    },
    { hint: "Add a wagging tail!", color: OUTLINE, strokes: ["M 124,138 Q 150,132 146,108"] },
    {
      hint: "Add a collar with a name tag",
      color: OUTLINE,
      strokes: ["M 80,92 Q 100,100 120,92", "M 100,98 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0"],
    },
    {
      hint: "Finish with the ground and a bone! 🦴",
      color: OUTLINE,
      strokes: [
        "M 8,184 L 192,184",
        "M 138,176 a 4,4 0 1,0 0,8 M 142,180 L 156,180 M 156,176 a 4,4 0 1,0 0,8",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 80,80 C 66,100 64,150 76,166 L 124,166 C 136,150 134,100 120,80 Z",
          color: "#edb583",
        },
        { d: "M 70,52 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0", color: "#edb583" },
        { d: "M 74,31 Q 50,31 54,72 Q 72,76 82,50 Z", color: "#b87a44" },
        { d: "M 126,31 Q 150,31 146,72 Q 128,76 118,50 Z", color: "#b87a44" },
        { d: "M 76,60 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 114,60 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 84,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 108,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 95,61 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#42301f" },
        { d: "M 100,73 Q 99,84 104,86 Q 109,83 107,73 Z", color: "#ff7088" },
        { d: "M 100,98 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#ffd23f" },
      ],
    },
  ],
};
