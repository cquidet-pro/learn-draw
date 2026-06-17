import type { Animal } from "../animals";

// A more refined, full-body sitting kawaii cat (7-year-old level).
const OUTLINE = "#4f3a2c";

export const cat7: Animal = {
  id: "cat-7",
  name: "Cat",
  emoji: "🐱",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Start with the round head",
      color: OUTLINE,
      strokes: ["M 72,52 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 80,34 L 72,12 L 96,28 Z", "M 120,34 L 128,12 L 104,28 Z"],
    },
    {
      hint: "Add the eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 85,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 107,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
      ],
    },
    {
      hint: "Add the nose, mouth and whiskers",
      color: OUTLINE,
      strokes: [
        "M 100,58 L 95,63 L 105,63 Z",
        "M 100,63 L 100,68 M 100,68 Q 93,74 88,69 M 100,68 Q 107,74 112,69",
        "M 90,61 L 68,57 M 90,65 L 68,67 M 110,61 L 132,57 M 110,65 L 132,67",
      ],
    },
    {
      hint: "Add the sitting body",
      color: OUTLINE,
      strokes: ["M 84,76 C 68,96 66,150 80,164 L 120,164 C 134,150 132,96 116,76"],
    },
    {
      hint: "Add the front legs and paws 🐾",
      color: OUTLINE,
      strokes: [
        "M 90,164 L 90,178 M 110,164 L 110,178",
        "M 83,178 q 7,6 14,0 M 103,178 q 7,6 14,0",
      ],
    },
    {
      hint: "Finish with a curly tail!",
      color: OUTLINE,
      strokes: ["M 120,156 Q 152,158 152,132 Q 152,118 139,122"],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 84,76 C 68,96 66,150 80,164 L 120,164 C 134,150 132,96 116,76 Z",
          color: "#f4a04a",
        },
        { d: "M 72,52 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0", color: "#f4a04a" },
        { d: "M 80,34 L 72,12 L 96,28 Z", color: "#f4a04a" },
        { d: "M 120,34 L 128,12 L 104,28 Z", color: "#f4a04a" },
        { d: "M 82,30 L 77,17 L 91,27 Z", color: "#ff9eb5" },
        { d: "M 118,30 L 123,17 L 109,27 Z", color: "#ff9eb5" },
        { d: "M 76,58 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 114,58 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 85,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 107,50 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 100,58 L 95,63 L 105,63 Z", color: "#ff8aa0" },
      ],
    },
  ],
};
