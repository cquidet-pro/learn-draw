import type { Animal } from "../animals";

// A friendly cat face, built up step by step in a 200x200 box.
export const cat: Animal = {
  id: "cat",
  name: "Cat",
  emoji: "🐱",
  viewBox: "0 0 200 200",
  color: "#d98032",
  steps: [
    {
      hint: "Draw a round head 🟠",
      strokes: ["M 42,102 a 58,58 0 1,0 116,0 a 58,58 0 1,0 -116,0"],
    },
    {
      hint: "Add two pointy ears 🔺",
      strokes: [
        "M 56,62 L 44,18 L 86,52 Z",
        "M 144,62 L 156,18 L 114,52 Z",
      ],
    },
    {
      hint: "Now two sparkly eyes 👀",
      strokes: [
        "M 74,96 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 110,96 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
      ],
    },
    {
      hint: "Add a little triangle nose 👃",
      strokes: ["M 100,110 L 91,118 L 109,118 Z"],
    },
    {
      hint: "Finish with whiskers and a smile! 😺",
      strokes: [
        "M 100,118 L 100,128",
        "M 100,128 Q 90,138 80,130",
        "M 100,128 Q 110,138 120,130",
        "M 88,116 L 52,108 M 88,122 L 50,122 M 88,128 L 54,138",
        "M 112,116 L 148,108 M 112,122 L 150,122 M 112,128 L 146,138",
      ],
    },
  ],
};
