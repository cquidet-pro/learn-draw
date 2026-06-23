import type { Animal } from "../animals";

// An original masked superhero of our own design. Easy version — outline first,
// colored in last.
const OUTLINE = "#4f3a2c";

export const heromask: Animal = {
  id: "heromask",
  name: "Superhero",
  emoji: "🦸",
  level: 5,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the hero's head 🦸",
      color: OUTLINE,
      strokes: [
        "M 100,30 C 128,30 142,52 140,76 C 138,102 120,116 100,116 C 80,116 62,102 60,76 C 58,52 72,30 100,30 Z",
      ],
    },
    {
      hint: "Add cool swooshy hair! 💇",
      color: OUTLINE,
      strokes: [
        "M 62,70 Q 54,40 100,27 Q 146,40 138,70 Q 130,50 118,48 Q 109,55 100,48 Q 91,55 82,48 Q 70,50 62,70 Z",
      ],
    },
    {
      hint: "Add a flowing cape!",
      color: OUTLINE,
      strokes: [
        "M 78,116 L 48,150 L 44,184 L 86,158 Z",
        "M 122,116 L 152,150 L 156,184 L 114,158 Z",
      ],
    },
    {
      hint: "Add the body",
      color: OUTLINE,
      strokes: ["M 80,116 Q 100,126 120,116 L 132,184 L 68,184 Z"],
    },
    {
      hint: "Add the eye mask and eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 64,64 Q 72,54 86,56 Q 95,58 100,64 Q 105,58 114,56 Q 128,54 136,64 Q 136,80 118,82 Q 104,82 100,74 Q 96,82 82,82 Q 64,80 64,64 Z",
        "M 76,66 Q 84,59 92,66 Q 90,75 84,76 Q 78,74 76,66 Z",
        "M 124,66 Q 116,59 108,66 Q 110,75 116,76 Q 122,74 124,66 Z",
      ],
    },
    {
      hint: "Add a brave smile",
      color: OUTLINE,
      strokes: ["M 90,98 Q 100,104 110,98"],
    },
    {
      hint: "Finish with a lightning emblem on the chest! ⚡",
      color: OUTLINE,
      strokes: [
        "M 100,134 L 116,140 L 112,160 L 100,168 L 88,160 L 84,140 Z",
        "M 104,140 L 95,152 L 101,152 L 96,162",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 78,116 L 48,150 L 44,184 L 86,158 Z", color: "#e63946" },
        { d: "M 122,116 L 152,150 L 156,184 L 114,158 Z", color: "#e63946" },
        { d: "M 80,116 Q 100,126 120,116 L 132,184 L 68,184 Z", color: "#2a6fd6" },
        {
          d: "M 100,30 C 128,30 142,52 140,76 C 138,102 120,116 100,116 C 80,116 62,102 60,76 C 58,52 72,30 100,30 Z",
          color: "#ffd0a8",
        },
        {
          d: "M 62,70 Q 54,40 100,27 Q 146,40 138,70 Q 130,50 118,48 Q 109,55 100,48 Q 91,55 82,48 Q 70,50 62,70 Z",
          color: "#6b4a2b",
        },
        {
          d: "M 64,64 Q 72,54 86,56 Q 95,58 100,64 Q 105,58 114,56 Q 128,54 136,64 Q 136,80 118,82 Q 104,82 100,74 Q 96,82 82,82 Q 64,80 64,64 Z",
          color: "#1a1a2e",
        },
        { d: "M 76,66 Q 84,59 92,66 Q 90,75 84,76 Q 78,74 76,66 Z", color: "#ffffff" },
        { d: "M 124,66 Q 116,59 108,66 Q 110,75 116,76 Q 122,74 124,66 Z", color: "#ffffff" },
        {
          d: "M 100,134 L 116,140 L 112,160 L 100,168 L 88,160 L 84,140 Z",
          color: "#ffd23f",
        },
      ],
    },
  ],
};
