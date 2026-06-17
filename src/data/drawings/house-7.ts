import type { Animal } from "../animals";

// A more detailed kawaii house scene with chimney, smoke, a path and a sun
// (level 7). Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const house7: Animal = {
  id: "house-7",
  name: "House",
  emoji: "🏡",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the walls (a big square) 🟫",
      color: OUTLINE,
      strokes: ["M 50,95 L 50,165 L 150,165 L 150,95 Z"],
    },
    {
      hint: "Add the roof and a chimney 🔺",
      color: OUTLINE,
      strokes: ["M 42,95 L 100,52 L 158,95 Z", "M 126,73 L 126,56 L 138,56 L 138,80"],
    },
    {
      hint: "Draw the door with a doorknob 🚪",
      color: OUTLINE,
      strokes: [
        "M 86,165 L 86,124 L 110,124 L 110,165",
        "M 104,145 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
      ],
    },
    {
      hint: "Add windows with little panes 🪟",
      color: OUTLINE,
      strokes: [
        "M 62,108 L 80,108 L 80,126 L 62,126 Z M 71,108 L 71,126 M 62,117 L 80,117",
        "M 120,108 L 138,108 L 138,126 L 120,126 Z M 129,108 L 129,126 M 120,117 L 138,117",
      ],
    },
    {
      hint: "Add curly smoke from the chimney 💨",
      color: OUTLINE,
      strokes: ["M 132,54 q -8,-6 0,-12 q 8,-6 0,-12"],
    },
    {
      hint: "Finish with a sun and a path! ☀️",
      color: OUTLINE,
      strokes: [
        "M 24,40 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 36,22 L 36,12 M 36,68 L 36,76 M 6,40 L 14,40 M 58,40 L 66,40",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 126,73 L 126,56 L 138,56 L 138,80 Z", color: "#8a5a2b" },
        { d: "M 50,95 L 50,165 L 150,165 L 150,95 Z", color: "#ffe0a3" },
        { d: "M 42,95 L 100,52 L 158,95 Z", color: "#e8604c" },
        { d: "M 86,165 L 86,124 L 110,124 L 110,165 Z", color: "#8a5a2b" },
        { d: "M 62,108 L 80,108 L 80,126 L 62,126 Z", color: "#9bd8e6" },
        { d: "M 120,108 L 138,108 L 138,126 L 120,126 Z", color: "#9bd8e6" },
        { d: "M 24,40 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#ffd23f" },
      ],
    },
  ],
};
