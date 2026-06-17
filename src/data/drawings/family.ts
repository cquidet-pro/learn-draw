import type { Animal } from "../animals";

// A family of stick figures — drawn one person at a time
// (and yes, they're all about the same size!).
export const family: Animal = {
  id: "family",
  name: "Family",
  emoji: "👪",
  viewBox: "0 0 200 200",
  color: "#3a3a55",
  colorReveal: true,
  steps: [
    {
      hint: "Draw Daddy 🧔",
      color: "#118ab2",
      strokes: [
        "M 33,58 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 44,69 L 44,120",
        "M 44,84 L 28,99 M 44,84 L 60,99",
        "M 44,120 L 32,152 M 44,120 L 56,152",
      ],
    },
    {
      hint: "Draw Mommy 👩",
      color: "#ef476f",
      strokes: [
        "M 74,60 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
        "M 84,70 L 84,118",
        "M 84,84 L 69,98 M 84,84 L 99,98",
        "M 84,118 L 73,150 M 84,118 L 95,150",
      ],
    },
    {
      hint: "Draw your sister or brother 🧒",
      color: "#06d6a0",
      strokes: [
        "M 112,66 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
        "M 122,76 L 122,120",
        "M 122,89 L 109,102 M 122,89 L 135,102",
        "M 122,120 L 112,150 M 122,120 L 132,150",
      ],
    },
    {
      hint: "And that's you! 🙂",
      color: "#f4a300",
      strokes: [
        "M 148,70 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 157,79 L 157,120",
        "M 157,91 L 146,102 M 157,91 L 168,102",
        "M 157,120 L 148,148 M 157,120 L 166,148",
      ],
    },
    {
      hint: "Now color your family in! 🖍️",
      strokes: [],
    },
  ],
};
