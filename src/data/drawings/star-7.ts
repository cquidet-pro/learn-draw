import type { Animal } from "../animals";

// A twinkly star with a face and sparkles around it (7-year-old level).
export const star7: Animal = {
  id: "star-7",
  name: "Star",
  emoji: "⭐",
  level: 7,
  color: "#ffd166",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw a big twinkly star ⭐",
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
    {
      hint: "Add sparkles all around! ✨",
      color: "#f4a300",
      strokes: [
        "M 40,42 L 40,56 M 33,49 L 47,49",
        "M 162,46 L 162,60 M 155,53 L 169,53",
        "M 150,150 L 150,164 M 143,157 L 157,157",
        "M 44,150 L 44,162 M 38,156 L 50,156",
      ],
    },
  ],
};
