import type { Animal } from "../animals";

// A simple smiling kawaii fish: dark outline drawn step by step, colored last.
const OUTLINE = "#4f3a2c";

export const fish: Animal = {
  id: "fish",
  name: "Fish",
  emoji: "🐟",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw the fish body 🐟",
      color: OUTLINE,
      strokes: ["M 45,100 Q 90,65 135,100 Q 90,135 45,100 Z"],
    },
    {
      hint: "Add a swishy tail",
      color: OUTLINE,
      strokes: ["M 45,100 L 25,80 L 30,100 L 25,120 Z"],
    },
    {
      hint: "Add a fin on top and bottom",
      color: OUTLINE,
      strokes: ["M 80,76 Q 95,68 105,82", "M 80,124 Q 95,132 105,118"],
    },
    {
      hint: "Finish with an eye and a smile! 🐠",
      color: OUTLINE,
      strokes: [
        "M 110,90 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 118,108 Q 124,112 130,106",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 45,100 Q 90,65 135,100 Q 90,135 45,100 Z", color: "#ffb02e" },
        { d: "M 45,100 L 25,80 L 30,100 L 25,120 Z", color: "#ff8c1a" },
        { d: "M 110,90 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a2a20" },
        { d: "M 111,88 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0", color: "#ffffff" },
      ],
    },
  ],
};
