import type { Animal } from "../animals";

// A friendly kawaii horse face: a dark outline drawn step by step, then colored
// in at the end (flat fills sit behind the outlines).
const OUTLINE = "#4f3a2c";

export const horse: Animal = {
  id: "horse",
  name: "Horse",
  emoji: "🐴",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Start with a long round head! 🟫",
      color: OUTLINE,
      strokes: ["M 56,102 a 44,54 0 1,0 88,0 a 44,54 0 1,0 -88,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      color: OUTLINE,
      strokes: ["M 70,54 L 62,26 L 86,48 Z", "M 130,54 L 138,26 L 114,48 Z"],
    },
    {
      hint: "Add a floppy forelock 💇",
      color: OUTLINE,
      strokes: ["M 92,50 Q 96,66 100,54 Q 104,66 108,50"],
    },
    {
      hint: "Now draw two big eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 74,92 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 110,92 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add two nostrils and a smile 👃",
      color: OUTLINE,
      strokes: [
        "M 82,126 a 5,7 0 1,0 10,0 a 5,7 0 1,0 -10,0",
        "M 108,126 a 5,7 0 1,0 10,0 a 5,7 0 1,0 -10,0",
        "M 84,146 Q 100,154 116,146",
      ],
    },
    {
      hint: "Now color the horse in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 56,102 a 44,54 0 1,0 88,0 a 44,54 0 1,0 -88,0", color: "#c89b6c" },
        { d: "M 70,54 L 62,26 L 86,48 Z", color: "#c89b6c" },
        { d: "M 130,54 L 138,26 L 114,48 Z", color: "#c89b6c" },
        { d: "M 72,49 L 67,33 L 82,46 Z", color: "#e7a6b0" },
        { d: "M 128,49 L 133,33 L 118,46 Z", color: "#e7a6b0" },
        { d: "M 74,134 a 26,22 0 1,0 52,0 a 26,22 0 1,0 -52,0", color: "#e8c39a" },
        { d: "M 92,50 Q 96,66 100,54 Q 104,66 108,50 Z", color: "#8a5a34" },
        { d: "M 74,92 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 110,92 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 78,88 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#ffffff" },
        { d: "M 114,88 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#ffffff" },
        { d: "M 82,126 a 5,7 0 1,0 10,0 a 5,7 0 1,0 -10,0", color: "#6b4a32" },
        { d: "M 108,126 a 5,7 0 1,0 10,0 a 5,7 0 1,0 -10,0", color: "#6b4a32" },
      ],
    },
  ],
};
