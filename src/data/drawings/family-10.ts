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
        "M 167,134 a 14,9 0 1,0 28,0 a 14,9 0 1,0 -28,0",
        "M 155,130 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 165,124 Q 157,123 158,133 Q 163,132 166,128",
        "M 156,133 Q 151,134 153,138 Q 156,139 159,136",
        "M 161,127 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0",
        "M 151,136 a 1.3,1.3 0 1,0 2.6,0 a 1.3,1.3 0 1,0 -2.6,0",
        "M 171,142 L 171,153 M 179,143 L 179,154 M 187,143 L 187,154 M 193,142 L 193,153",
        "M 193,129 Q 198,124 196,117",
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
      strokes: [
        "M 14,28 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
        "M 24,16 L 24,8 M 16,20 L 10,14 M 12,28 L 4,28 M 16,36 L 10,42 M 32,20 L 38,14 M 34,28 L 42,28",
      ],
    },
    { hint: "Draw the grassy ground 🌱", color: "#06d6a0", strokes: ["M 8,160 L 192,160"] },
    {
      hint: "Now color your family scene in! 🖍️",
      strokes: [],
    },
  ],
};
