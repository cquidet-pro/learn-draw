import type { Animal } from "../animals";

// A detailed princess with a wand, a castle and stars (10-year-old level).
export const princess10: Animal = {
  id: "princess-10",
  name: "Princess",
  emoji: "👑",
  level: 10,
  color: "#ef476f",
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw the head", color: "#d39a6a", strokes: ["M 64,56 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0"] },
    {
      hint: "Add long flowing hair",
      color: "#6b4f3a",
      strokes: ["M 53,50 Q 53,29 79,29 Q 105,29 105,50 Q 107,73 99,90", "M 57,90 Q 49,73 51,50"],
    },
    {
      hint: "Add a sparkly jewelled crown 👑",
      color: "#ffd166",
      strokes: ["M 64,40 L 68,27 L 79,36 L 90,27 L 94,40 Z", "M 79,33 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0"],
    },
    {
      hint: "Draw a big flowy dress 👗",
      color: "#ef476f",
      strokes: ["M 79,71 L 47,160 L 111,160 Z", "M 65,95 L 93,95", "M 47,160 Q 79,152 111,160"],
    },
    {
      hint: "Add arms and a magic wand! ✨",
      color: "#d39a6a",
      strokes: [
        "M 67,103 L 52,120 M 91,103 L 112,116",
        "M 112,116 L 126,100",
        "M 126,94 l 2,5 l 5,0 l -4,4 l 2,5 l -5,-3 l -5,3 l 2,-5 l -4,-4 l 5,0 z",
      ],
    },
    {
      hint: "Add a happy face 😊",
      color: "#6b4f3a",
      strokes: [
        "M 72,55 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 84,55 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
        "M 72,64 Q 79,70 87,64",
      ],
    },
    {
      hint: "Draw her castle in the distance 🏰",
      color: "#9b8cb5",
      strokes: [
        "M 150,160 L 150,110 L 190,110 L 190,160",
        "M 150,110 L 150,102 L 156,102 L 156,110 M 162,110 L 162,102 L 168,102 L 168,110 M 174,110 L 174,102 L 180,102 L 180,110 M 186,110 L 186,102 L 190,102",
        "M 165,160 L 165,138 Q 165,132 170,132 Q 175,132 175,138 L 175,160",
      ],
    },
    {
      hint: "Finish with twinkly stars! ⭐",
      color: "#ffd166",
      strokes: [
        "M 140,40 l 2,6 l 6,1 l -5,4 l 2,6 l -5,-3 l -5,3 l 2,-6 l -5,-4 l 6,-1 z",
        "M 175,60 l 2,5 l 5,1 l -4,3 l 1,5 l -4,-3 l -4,3 l 1,-5 l -4,-3 l 5,-1 z",
      ],
    },
  ],
};
