import type { Animal } from "../animals";

// A happy kawaii sun: dark outline drawn step by step, colored in last.
const OUTLINE = "#4f3a2c";

export const sun: Animal = {
  id: "sun",
  name: "Sun",
  emoji: "☀️",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a big round sun ☀️",
      color: OUTLINE,
      strokes: ["M 60,100 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0"],
    },
    {
      hint: "Add straight sunny rays",
      color: OUTLINE,
      strokes: [
        "M 100,52 L 100,28 M 100,148 L 100,172 M 52,100 L 28,100 M 148,100 L 172,100",
      ],
    },
    {
      hint: "Add more rays in the corners! 🌟",
      color: OUTLINE,
      strokes: [
        "M 66,66 L 49,49 M 134,66 L 151,49 M 66,134 L 49,151 M 134,134 L 151,151",
      ],
    },
    {
      hint: "Give the sun a happy face 😊",
      color: OUTLINE,
      strokes: [
        "M 84,92 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 108,92 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 82,112 Q 100,128 118,112",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 60,100 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0", color: "#ffd23f" },
        { d: "M 74,106 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#ffb3c1" },
        { d: "M 114,106 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#ffb3c1" },
        { d: "M 84,92 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 108,92 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 86,90 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0", color: "#ffffff" },
        { d: "M 110,90 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0", color: "#ffffff" },
      ],
    },
  ],
};
