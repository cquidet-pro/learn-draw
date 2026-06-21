import type { Animal } from "../animals";

// A simple kawaii mouse face — a drawable reward "friend".
const OUTLINE = "#4f3a2c";

export const mouse: Animal = {
  id: "mouse",
  name: "Mouse",
  emoji: "🐭",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a round head! 🐭",
      color: OUTLINE,
      strokes: ["M 54,112 a 46,46 0 1,0 92,0 a 46,46 0 1,0 -92,0"],
    },
    {
      hint: "Add two big round ears 👂",
      color: OUTLINE,
      strokes: [
        "M 30,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0",
        "M 114,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0",
      ],
    },
    {
      hint: "Add two eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 76,108 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 108,108 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add a little nose 👃",
      color: OUTLINE,
      strokes: ["M 94,132 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"],
    },
    {
      hint: "Add a smile and whiskers 〰️",
      color: OUTLINE,
      strokes: [
        "M 100,138 L 100,144 M 100,144 Q 90,151 82,145 M 100,144 Q 110,151 118,145",
        "M 74,130 L 44,124 M 74,136 L 46,142 M 126,130 L 156,124 M 126,136 L 154,142",
      ],
    },
    {
      hint: "Now color the mouse in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 54,112 a 46,46 0 1,0 92,0 a 46,46 0 1,0 -92,0", color: "#b9bcc4" },
        { d: "M 30,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0", color: "#b9bcc4" },
        { d: "M 114,64 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0", color: "#b9bcc4" },
        { d: "M 42,64 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0", color: "#ffb3c1" },
        { d: "M 126,64 a 16,16 0 1,0 32,0 a 16,16 0 1,0 -32,0", color: "#ffb3c1" },
        { d: "M 76,108 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 108,108 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0", color: "#3a2a20" },
        { d: "M 94,132 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: "#ff8aa0" },
      ],
    },
  ],
};
