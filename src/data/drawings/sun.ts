import type { Animal } from "../animals";

// A happy sun with rays.
export const sun: Animal = {
  id: "sun",
  name: "Sun",
  emoji: "☀️",
  viewBox: "0 0 200 200",
  color: "#f4a300",
  steps: [
    {
      hint: "Draw a big round sun ☀️",
      strokes: ["M 60,100 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0"],
    },
    {
      hint: "Add straight sunny rays",
      strokes: [
        "M 100,52 L 100,28 M 100,148 L 100,172 M 52,100 L 28,100 M 148,100 L 172,100",
      ],
    },
    {
      hint: "Add more rays in the corners! 🌟",
      strokes: [
        "M 66,66 L 49,49 M 134,66 L 151,49 M 66,134 L 49,151 M 134,134 L 151,151",
      ],
    },
    {
      hint: "Give the sun a happy face 😊",
      strokes: [
        "M 84,92 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 108,92 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 82,112 Q 100,128 118,112",
      ],
    },
  ],
};
