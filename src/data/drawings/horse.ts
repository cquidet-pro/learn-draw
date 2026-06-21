import type { Animal } from "../animals";

// A friendly kawaii horse head seen from the SIDE (profile) — the iconic horse
// shape: long nose, one eye, pointy ears and a flowing mane down the neck. Dark
// outline drawn step by step, then colored in (flat fills sit behind the lines).
const OUTLINE = "#4f3a2c";

export const horse: Animal = {
  id: "horse",
  name: "Horse",
  emoji: "🐴",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a long horse head and neck from the side 🟫",
      color: OUTLINE,
      strokes: [
        "M 122,50 Q 108,58 84,88 Q 60,112 48,132 Q 48,146 66,151 Q 86,153 98,131 Q 103,153 114,189 L 150,189 Q 156,128 138,62 Q 133,52 122,50 Z",
      ],
    },
    {
      hint: "Add two pointy ears on top 🔺",
      color: OUTLINE,
      strokes: ["M 118,52 L 112,28 L 130,46 Z", "M 132,50 L 146,30 L 137,48 Z"],
    },
    {
      hint: "Draw the flowing mane down the neck 💇",
      color: OUTLINE,
      strokes: ["M 128,56 Q 148,94 141,134 Q 149,164 143,188"],
    },
    {
      hint: "Add one big eye and a nostril 👀",
      color: OUTLINE,
      strokes: [
        "M 99,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 56,121 a 4,5 0 1,0 8,0 a 4,5 0 1,0 -8,0",
      ],
    },
    {
      hint: "Add a smiley mouth and a forelock 😄",
      color: OUTLINE,
      strokes: [
        "M 50,140 Q 60,147 72,143",
        "M 121,53 Q 116,64 125,71",
      ],
    },
    {
      hint: "Now color the horse in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 122,50 Q 108,58 84,88 Q 60,112 48,132 Q 48,146 66,151 Q 86,153 98,131 Q 103,153 114,189 L 150,189 Q 156,128 138,62 Q 133,52 122,50 Z",
          color: "#c89b6c",
        },
        { d: "M 118,52 L 112,28 L 130,46 Z", color: "#c89b6c" },
        { d: "M 132,50 L 146,30 L 137,48 Z", color: "#c89b6c" },
        { d: "M 120,50 L 116,34 L 128,46 Z", color: "#e7a6b0" },
        { d: "M 134,48 L 142,34 L 137,46 Z", color: "#e7a6b0" },
        {
          d: "M 128,56 Q 148,94 141,134 Q 149,164 143,188 L 153,188 Q 159,150 152,116 Q 156,86 142,58 Z",
          color: "#8a5a34",
        },
        { d: "M 99,84 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#3a2a20" },
        { d: "M 56,121 a 4,5 0 1,0 8,0 a 4,5 0 1,0 -8,0", color: "#5a3a28" },
      ],
    },
  ],
};
