import type { Animal } from "../animals";

// A heart with a shiny highlight and little hearts around it (level 7).
const OUTLINE = "#4f3a2c";

export const heart7: Animal = {
  id: "heart-7",
  name: "Heart",
  emoji: "❤️",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the left side of the heart",
      color: OUTLINE,
      strokes: ["M 100,152 C 58,120 48,88 70,73 C 88,61 100,80 100,92"],
    },
    {
      hint: "Now mirror it on the right! ❤️",
      color: OUTLINE,
      strokes: ["M 100,92 C 100,80 112,61 130,73 C 152,88 142,120 100,152"],
    },
    {
      hint: "Add a shiny highlight ✨",
      color: OUTLINE,
      strokes: ["M 78,82 Q 74,94 82,104", "M 88,78 Q 86,82 88,86"],
    },
    {
      hint: "Finish with two little hearts!",
      color: OUTLINE,
      strokes: [
        "M 40,64 C 33,59 31,53 37,49 C 41,46 44,49 44,53 C 44,49 47,46 51,49 C 57,53 55,59 48,64 Z",
        "M 160,72 C 153,67 151,61 157,57 C 161,54 164,57 164,61 C 164,57 167,54 171,57 C 177,61 175,67 168,72 Z",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 100,152 C 58,120 48,88 70,73 C 88,61 100,80 100,92 C 100,80 112,61 130,73 C 152,88 142,120 100,152 Z",
          color: "#ff4d6d",
        },
        { d: "M 78,82 Q 74,94 82,104 Q 84,92 88,86 Q 82,84 78,82 Z", color: "#ffffff" },
        {
          d: "M 40,64 C 33,59 31,53 37,49 C 41,46 44,49 44,53 C 44,49 47,46 51,49 C 57,53 55,59 48,64 Z",
          color: "#ff8fab",
        },
        {
          d: "M 160,72 C 153,67 151,61 157,57 C 161,54 164,57 164,61 C 164,57 167,54 171,57 C 177,61 175,67 168,72 Z",
          color: "#ff8fab",
        },
      ],
    },
  ],
};
