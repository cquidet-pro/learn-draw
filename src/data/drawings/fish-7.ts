import type { Animal } from "../animals";

// A more refined kawaii fish with fins, gills, scales and bubbles (level 7).
const OUTLINE = "#4f3a2c";

export const fish7: Animal = {
  id: "fish-7",
  name: "Fish",
  emoji: "🐠",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the fish body",
      color: OUTLINE,
      strokes: ["M 40,100 Q 95,60 145,100 Q 95,140 40,100 Z"],
    },
    {
      hint: "Add a swishy tail",
      color: OUTLINE,
      strokes: ["M 40,100 L 18,74 L 25,100 L 18,126 Z"],
    },
    {
      hint: "Add fins on top and bottom",
      color: OUTLINE,
      strokes: ["M 72,72 Q 92,58 110,76 L 75,76 Z", "M 78,124 Q 95,138 110,121"],
    },
    {
      hint: "Add the gill line and an eye",
      color: OUTLINE,
      strokes: [
        "M 116,80 Q 109,100 116,120",
        "M 124,90 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 127,90 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
      ],
    },
    {
      hint: "Add curvy scales 🐟",
      color: OUTLINE,
      strokes: ["M 66,90 q 9,10 0,20 M 84,90 q 9,10 0,20 M 102,90 q 9,10 0,20"],
    },
    {
      hint: "Finish with bubbles! 🫧",
      color: OUTLINE,
      strokes: [
        "M 150,68 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 162,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 40,100 Q 95,60 145,100 Q 95,140 40,100 Z", color: "#ffb02e" },
        { d: "M 40,100 L 18,74 L 25,100 L 18,126 Z", color: "#ff8c1a" },
        { d: "M 72,72 Q 92,58 110,76 L 75,76 Z", color: "#ff9100" },
        { d: "M 124,90 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffffff" },
        { d: "M 127,90 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0", color: "#3a2a20" },
        { d: "M 150,68 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#cdeefb" },
        { d: "M 162,52 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#cdeefb" },
      ],
    },
  ],
};
