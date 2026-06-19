import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A heart with highlight, an arrow and little hearts around it (level 10).
const OUTLINE = "#4f3a2c";

export const heart10: Animal = {
  id: "heart-10",
  name: "Heart",
  emoji: "❤️",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw the left side of the heart", color: OUTLINE, strokes: ["M 100,150 C 58,118 48,86 70,71 C 88,59 100,78 100,90"] },
    { hint: "Now mirror it on the right! ❤️", color: OUTLINE, strokes: ["M 100,90 C 100,78 112,59 130,71 C 152,86 142,118 100,150"] },
    { hint: "Add a shiny highlight ✨", color: OUTLINE, strokes: ["M 78,80 Q 74,92 82,102", "M 88,76 Q 86,80 88,84"] },
    {
      hint: "Shoot an arrow through it! 🏹",
      color: OUTLINE,
      strokes: [
        "M 40,118 L 160,72",
        "M 160,72 L 150,70 M 160,72 L 154,81",
        "M 40,118 L 30,116 L 36,124 L 26,122",
      ],
    },
    {
      hint: "Finish with little hearts floating up!",
      color: OUTLINE,
      strokes: [
        "M 40,56 C 33,51 31,45 37,41 C 41,38 44,41 44,45 C 44,41 47,38 51,41 C 57,45 55,51 48,56 Z",
        "M 162,60 C 155,55 153,49 159,45 C 163,42 166,45 166,49 C 166,45 169,42 173,45 C 179,49 177,55 170,60 Z",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 100,150 C 58,118 48,86 70,71 C 88,59 100,78 100,90 C 100,78 112,59 130,71 C 152,86 142,118 100,150 Z",
          color: "#ff4d6d",
        },
        { d: "M 78,80 Q 74,92 82,102 Q 84,90 88,84 Q 82,82 78,80 Z", color: "#ffffff" },
        {
          d: "M 40,56 C 33,51 31,45 37,41 C 41,38 44,41 44,45 C 44,41 47,38 51,41 C 57,45 55,51 48,56 Z",
          color: "#ff8fab",
        },
        {
          d: "M 162,60 C 155,55 153,49 159,45 C 163,42 166,45 166,49 C 166,45 169,42 173,45 C 179,49 177,55 170,60 Z",
          color: "#ff8fab",
        },
      ],
    },
    nameStep("HEART", { baseline: 192, height: 22 }),
  ],
};
