import type { Animal } from "../animals";

// A colorful symmetrical butterfly.
export const butterfly: Animal = {
  id: "butterfly",
  name: "Butterfly",
  emoji: "🦋",
  viewBox: "0 0 200 200",
  color: "#6b4f3a",
  steps: [
    {
      hint: "Draw the body and antennae 🦋",
      strokes: [
        "M 100,78 Q 95,80 95,100 L 95,138 Q 95,148 100,148 Q 105,148 105,138 L 105,100 Q 105,80 100,78 Z",
        "M 98,80 Q 90,66 83,64",
        "M 102,80 Q 110,66 117,64",
      ],
    },
    {
      hint: "Add the big top wings",
      color: "#ef476f",
      strokes: [
        "M 95,98 Q 52,58 48,96 Q 48,116 95,112 Z",
        "M 105,98 Q 148,58 152,96 Q 152,116 105,112 Z",
      ],
    },
    {
      hint: "Add the bottom wings",
      color: "#118ab2",
      strokes: [
        "M 95,116 Q 60,132 70,152 Q 82,162 98,138 Z",
        "M 105,116 Q 140,132 130,152 Q 118,162 102,138 Z",
      ],
    },
    {
      hint: "Add pretty spots! 🌈",
      color: "#ffd166",
      strokes: [
        "M 64,90 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 126,90 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 78,142 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 114,142 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
      ],
    },
  ],
};
