import type { Animal } from "../animals";

// A heart — draw one side, then mirror it.
export const heart: Animal = {
  id: "heart",
  name: "Heart",
  emoji: "❤️",
  viewBox: "0 0 200 200",
  color: "#ef476f",
  steps: [
    {
      hint: "Draw the left side of the heart",
      strokes: ["M 100,152 C 58,120 48,88 70,73 C 88,61 100,80 100,92"],
    },
    {
      hint: "Now mirror it on the right! ❤️",
      strokes: ["M 100,92 C 100,80 112,61 130,73 C 152,88 142,120 100,152"],
    },
  ],
};
