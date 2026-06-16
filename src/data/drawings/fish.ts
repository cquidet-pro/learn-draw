import type { Animal } from "../animals";

// A simple smiling fish.
export const fish: Animal = {
  id: "fish",
  name: "Fish",
  emoji: "🐟",
  viewBox: "0 0 200 200",
  color: "#f4a300",
  steps: [
    {
      hint: "Draw the fish body 🐟",
      strokes: ["M 45,100 Q 90,65 135,100 Q 90,135 45,100 Z"],
    },
    {
      hint: "Add a swishy tail",
      strokes: ["M 45,100 L 25,80 L 30,100 L 25,120 Z"],
    },
    {
      hint: "Add a fin on top and bottom",
      strokes: [
        "M 80,76 Q 95,68 105,82",
        "M 80,124 Q 95,132 105,118",
      ],
    },
    {
      hint: "Finish with an eye and a smile! 🐠",
      strokes: [
        "M 110,90 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 118,108 Q 124,112 130,106",
      ],
    },
  ],
};
