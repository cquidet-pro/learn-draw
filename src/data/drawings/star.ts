import type { Animal } from "../animals";

// A twinkly five-pointed star with a happy face.
export const star: Animal = {
  id: "star",
  name: "Star",
  emoji: "⭐",
  viewBox: "0 0 200 200",
  color: "#ffd166",
  steps: [
    {
      hint: "Draw a twinkly star ⭐",
      strokes: [
        "M 100,50 L 112,84 L 148,85 L 119,106 L 129,140 L 100,120 L 71,140 L 81,106 L 52,85 L 88,84 Z",
      ],
    },
    {
      hint: "Give it a happy face! 😊",
      color: "#f4a300",
      strokes: [
        "M 88,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 106,92 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 88,104 Q 100,114 112,104",
      ],
    },
  ],
};
