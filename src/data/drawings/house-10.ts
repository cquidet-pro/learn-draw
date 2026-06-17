import type { Animal } from "../animals";

// A detailed house scene with a tree, fence, flowers and sun (10-year-old level).
export const house10: Animal = {
  id: "house-10",
  name: "House",
  emoji: "🏡",
  level: 10,
  color: "#6b4f3a",
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw the walls (a big square) 🟫", strokes: ["M 60,98 L 60,160 L 140,160 L 140,98 Z"] },
    {
      hint: "Add the roof and a chimney 🔺",
      color: "#e63946",
      strokes: ["M 52,98 L 100,60 L 148,98 Z", "M 122,75 L 122,60 L 132,60 L 132,82"],
    },
    {
      hint: "Draw the door with a doorknob 🚪",
      color: "#8a5a2b",
      strokes: ["M 88,160 L 88,124 L 110,124 L 110,160", "M 105,143 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0"],
    },
    {
      hint: "Add windows with little panes 🪟",
      color: "#118ab2",
      strokes: [
        "M 68,110 L 84,110 L 84,128 L 68,128 Z M 76,110 L 76,128 M 68,119 L 84,119",
        "M 116,110 L 132,110 L 132,128 L 116,128 Z M 124,110 L 124,128 M 116,119 L 132,119",
      ],
    },
    {
      hint: "Add curly smoke from the chimney 💨",
      color: "#9aa5b1",
      strokes: ["M 128,58 q -8,-6 0,-12 q 8,-6 0,-12"],
    },
    {
      hint: "Plant a tree beside the house 🌳",
      color: "#2a9d4a",
      strokes: [
        "M 168,160 L 168,128 M 176,160 L 176,128",
        "M 154,128 Q 150,104 172,102 Q 194,104 190,128 Q 192,140 172,138 Q 154,140 154,128 Z",
      ],
    },
    {
      hint: "Add a little fence and flowers 🌷",
      color: "#06d6a0",
      strokes: [
        "M 18,160 L 18,142 M 30,160 L 30,142 M 42,160 L 42,142 M 12,148 L 48,148",
        "M 30,142 L 30,134 M 26,130 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
      ],
    },
    {
      hint: "Finish with a bright sun! ☀️",
      color: "#f4a300",
      strokes: [
        "M 24,40 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 36,22 L 36,12 M 14,32 L 8,26 M 58,32 L 64,26",
      ],
    },
  ],
};
