import type { Animal } from "../animals";

// A detailed family scene with a pet dog and a house (10-year-old level).
export const family10: Animal = {
  id: "family-10",
  name: "Family",
  emoji: "👪",
  level: 10,
  color: "#3a3a55",
  viewBox: "0 0 200 200",
  colorReveal: true,
  steps: [
    {
      hint: "Draw Daddy 🧔",
      color: "#118ab2",
      strokes: [
        "M 23,58 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 34,69 L 34,116",
        "M 34,84 L 20,97 M 34,84 L 48,97",
        "M 34,116 L 24,146 M 34,116 L 44,146",
        "M 24,50 Q 34,44 44,50",
      ],
    },
    {
      hint: "Draw Mommy 👩",
      color: "#ef476f",
      strokes: [
        "M 61,60 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
        "M 71,70 L 71,114",
        "M 71,84 L 58,96 M 71,84 L 84,96",
        "M 71,114 L 61,144 M 71,114 L 81,144",
        "M 59,56 Q 71,42 83,56",
      ],
    },
    {
      hint: "Draw your brother or sister 🧒",
      color: "#06d6a0",
      strokes: [
        "M 96,66 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 105,75 L 105,114",
        "M 105,87 L 93,98 M 105,87 L 117,98",
        "M 105,114 L 96,142 M 105,114 L 114,142",
      ],
    },
    {
      hint: "And that's you! 🙂",
      color: "#f4a300",
      strokes: [
        "M 128,72 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 136,80 L 136,112",
        "M 136,90 L 126,100 M 136,90 L 146,100",
        "M 136,112 L 129,138 M 136,112 L 143,138",
      ],
    },
    {
      hint: "Add the family pet dog! 🐕",
      color: "#7a5230",
      strokes: [
        "M 158,128 q 0,-10 12,-10 l 14,0 q 12,0 12,10 l 0,12 l -38,0 Z",
        "M 156,124 a 7,7 0 1,0 0,14 a 7,7 0 1,0 0,-14",
        "M 164,140 L 164,150 M 192,140 L 192,150 M 196,122 Q 202,118 200,128",
      ],
    },
    {
      hint: "Draw a little house behind 🏠",
      color: "#8a5a2b",
      strokes: ["M 150,58 L 150,96 L 190,96 L 190,58 Z", "M 144,58 L 170,36 L 196,58 Z"],
    },
    {
      hint: "Finish with the sun and the ground! ☀️",
      color: "#f4a300",
      strokes: ["M 24,28 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0", "M 34,12 L 34,5 M 16,32 L 9,37 M 52,32 L 59,37"],
    },
    { hint: "Draw the grassy ground 🌱", color: "#06d6a0", strokes: ["M 8,160 L 192,160"] },
    {
      hint: "Now color your family scene in! 🖍️",
      strokes: [],
    },
  ],
};
