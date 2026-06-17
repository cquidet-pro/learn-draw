import type { Animal } from "../animals";

// A heart — draw one side, then mirror it, then color it in with a shiny glint.
const OUTLINE = "#4f3a2c";

export const heart: Animal = {
  id: "heart",
  name: "Heart",
  emoji: "❤️",
  viewBox: "0 0 200 200",
  color: OUTLINE,
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
      hint: "Now color it in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 100,152 C 58,120 48,88 70,73 C 88,61 100,80 100,92 C 100,80 112,61 130,73 C 152,88 142,120 100,152 Z",
          color: "#ff4d6d",
        },
        { d: "M 70,92 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#ffffff" },
        { d: "M 84,82 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#ffffff" },
      ],
    },
  ],
};
