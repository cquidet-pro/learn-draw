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
        "M 158,140 Q 156,124 172,124 L 186,124 Q 194,124 194,134 Q 194,141 188,141 L 162,141 Q 158,141 158,140 Z",
        "M 143,128 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 149,120 Q 140,119 141,131 Q 146,131 150,127",
        "M 144,131 Q 138,132 140,137 Q 144,138 148,135",
        "M 150,125 a 1.6,1.6 0 1,0 3.2,0 a 1.6,1.6 0 1,0 -3.2,0",
        "M 139,134 a 1.4,1.4 0 1,0 2.8,0 a 1.4,1.4 0 1,0 -2.8,0",
        "M 162,141 L 162,151 M 170,141 L 170,151 M 182,141 L 182,151 M 190,141 L 190,151",
        "M 192,127 Q 199,121 196,113",
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
      strokes: ["M 9,20 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", "M 18,9 L 18,3 M 7,20 L 1,20 M 11,28 L 6,33"],
    },
    { hint: "Draw the grassy ground 🌱", color: "#06d6a0", strokes: ["M 8,160 L 192,160"] },
    {
      hint: "Now color your family scene in! 🖍️",
      strokes: [],
    },
  ],
};
