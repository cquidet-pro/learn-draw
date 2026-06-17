import type { Animal } from "../animals";

// A more detailed family of stick figures with hands, hair and a sunny scene
// (7-year-old level).
export const family7: Animal = {
  id: "family-7",
  name: "Family",
  emoji: "👪",
  level: 7,
  color: "#3a3a55",
  viewBox: "0 0 200 200",
  colorReveal: true,
  steps: [
    {
      hint: "Draw Daddy 🧔",
      color: "#118ab2",
      strokes: [
        "M 33,58 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 44,69 L 44,118",
        "M 44,84 L 28,98 M 44,84 L 60,98",
        "M 44,118 L 32,150 M 44,118 L 56,150",
        "M 34,50 Q 44,44 54,50",
        "M 25,98 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 M 57,98 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
      ],
    },
    {
      hint: "Draw Mommy 👩",
      color: "#ef476f",
      strokes: [
        "M 73,60 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
        "M 83,70 L 83,116",
        "M 83,84 L 68,98 M 83,84 L 98,98",
        "M 83,116 L 72,148 M 83,116 L 94,148",
        "M 71,56 Q 83,42 95,56",
        "M 65,98 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 M 96,98 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
      ],
    },
    {
      hint: "Draw your brother or sister 🧒",
      color: "#06d6a0",
      strokes: [
        "M 112,66 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
        "M 122,76 L 122,118",
        "M 122,89 L 109,101 M 122,89 L 135,101",
        "M 122,118 L 112,148 M 122,118 L 132,148",
        "M 110,62 Q 122,50 134,62",
      ],
    },
    {
      hint: "And that's you! 🙂",
      color: "#f4a300",
      strokes: [
        "M 148,72 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 157,81 L 157,118",
        "M 157,92 L 146,103 M 157,92 L 168,103",
        "M 157,118 L 149,146 M 157,118 L 165,146",
        "M 147,69 Q 157,58 167,69",
      ],
    },
    {
      hint: "Add the ground and a bright sun! ☀️",
      color: "#f4a300",
      strokes: [
        "M 168,30 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 180,12 L 180,4 M 161,42 L 153,42 M 162,56 L 156,62",
      ],
    },
    {
      hint: "Draw the grassy ground 🌱",
      color: "#06d6a0",
      strokes: ["M 8,158 L 192,158"],
    },
    {
      hint: "Now color your family in! 🖍️",
      strokes: [],
    },
  ],
};
