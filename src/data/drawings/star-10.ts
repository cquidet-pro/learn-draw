import type { Animal } from "../animals";

// A star with a face, sparkles, a crescent moon and little stars (10-year-old level).
export const star10: Animal = {
  id: "star-10",
  name: "Star",
  emoji: "⭐",
  level: 10,
  color: "#ffd166",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw a big twinkly star ⭐",
      strokes: ["M 90,50 L 102,84 L 138,85 L 109,106 L 119,140 L 90,120 L 61,140 L 71,106 L 42,85 L 78,84 Z"],
    },
    {
      hint: "Give it a happy face! 😊",
      color: "#f4a300",
      strokes: [
        "M 78,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 96,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 78,104 Q 90,114 102,104",
      ],
    },
    {
      hint: "Add sparkles around it ✨",
      color: "#f4a300",
      strokes: ["M 34,46 L 34,60 M 27,53 L 41,53", "M 40,148 L 40,160 M 34,154 L 46,154"],
    },
    {
      hint: "Add a crescent moon 🌙",
      color: "#f4a300",
      strokes: ["M 158,52 A 26,26 0 1,0 158,104 A 20,20 0 1,1 158,52 Z"],
    },
    {
      hint: "Finish with little stars in the sky! ⭐",
      color: "#ffd166",
      strokes: [
        "M 150,140 l 3,8 l 8,1 l -6,5 l 2,8 l -7,-4 l -7,4 l 2,-8 l -6,-5 l 8,-1 z",
        "M 60,30 l 2,6 l 6,1 l -5,4 l 2,6 l -5,-3 l -5,3 l 2,-6 l -5,-4 l 6,-1 z",
      ],
    },
  ],
};
