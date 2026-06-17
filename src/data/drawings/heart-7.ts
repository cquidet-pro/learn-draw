import type { Animal } from "../animals";

// A heart with a shiny highlight and little hearts around it (7-year-old level).
export const heart7: Animal = {
  id: "heart-7",
  name: "Heart",
  emoji: "❤️",
  level: 7,
  color: "#ef476f",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the left side of the heart",
      strokes: ["M 100,152 C 58,120 48,88 70,73 C 88,61 100,80 100,92"],
    },
    {
      hint: "Now mirror it on the right! ❤️",
      strokes: ["M 100,92 C 100,80 112,61 130,73 C 152,88 142,120 100,152"],
    },
    {
      hint: "Add a shiny highlight ✨",
      color: "#ff8fab",
      strokes: ["M 78,82 Q 74,94 82,104", "M 88,78 Q 86,82 88,86"],
    },
    {
      hint: "Finish with two little hearts!",
      color: "#ff8fab",
      strokes: [
        "M 40,64 C 33,59 31,53 37,49 C 41,46 44,49 44,53 C 44,49 47,46 51,49 C 57,53 55,59 48,64 Z",
        "M 160,72 C 153,67 151,61 157,57 C 161,54 164,57 164,61 C 164,57 167,54 171,57 C 177,61 175,67 168,72 Z",
      ],
    },
  ],
};
