import type { Animal } from "../animals";

// A twinkly five-pointed kawaii star with a happy face, colored in last.
const OUTLINE = "#4f3a2c";

export const star: Animal = {
  id: "star",
  name: "Star",
  emoji: "⭐",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a twinkly star ⭐",
      color: OUTLINE,
      strokes: [
        "M 100,50 L 112,84 L 148,85 L 119,106 L 129,140 L 100,120 L 71,140 L 81,106 L 52,85 L 88,84 Z",
      ],
    },
    {
      hint: "Give it a happy face! 😊",
      color: OUTLINE,
      strokes: [
        "M 88,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 106,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 88,104 Q 100,114 112,104",
      ],
    },
    {
      hint: "Now color it in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 100,50 L 112,84 L 148,85 L 119,106 L 129,140 L 100,120 L 71,140 L 81,106 L 52,85 L 88,84 Z",
          color: "#ffd23f",
        },
        { d: "M 78,100 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 112,100 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffb3c1" },
        { d: "M 88,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#3a2a20" },
        { d: "M 106,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#3a2a20" },
      ],
    },
  ],
};
