import type { Animal } from "../animals";

// An even more detailed sitting cat with stripes and a ball of yarn (10-year-old level).
export const cat10: Animal = {
  id: "cat-10",
  name: "Cat",
  emoji: "🐱",
  level: 10,
  color: "#d98032",
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Start with the round head", strokes: ["M 72,50 a 28,28 0 1,0 56,0 a 28,28 0 1,0 -56,0"] },
    { hint: "Add two pointy ears 🔺", strokes: ["M 80,32 L 72,10 L 96,26 Z", "M 120,32 L 128,10 L 104,26 Z"] },
    {
      hint: "Add the eyes 👀",
      strokes: [
        "M 85,48 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 107,48 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
      ],
    },
    {
      hint: "Add nose, mouth and whiskers",
      strokes: [
        "M 100,56 L 95,61 L 105,61 Z",
        "M 100,61 L 100,66 M 100,66 Q 93,72 88,67 M 100,66 Q 107,72 112,67",
        "M 90,59 L 68,55 M 90,63 L 68,65 M 110,59 L 132,55 M 110,63 L 132,65",
      ],
    },
    { hint: "Add the sitting body", strokes: ["M 84,74 C 68,94 66,150 80,164 L 120,164 C 134,150 132,94 116,74"] },
    {
      hint: "Add front legs and paws 🐾",
      strokes: ["M 90,164 L 90,178 M 110,164 L 110,178", "M 83,178 q 7,6 14,0 M 103,178 q 7,6 14,0"],
    },
    { hint: "Add a curly tail!", strokes: ["M 120,156 Q 152,158 152,132 Q 152,118 139,122"] },
    {
      hint: "Add cosy stripes on its body 🐈",
      color: "#a85d20",
      strokes: ["M 84,110 Q 100,116 116,110", "M 80,126 Q 100,132 120,126", "M 80,142 Q 100,148 120,142"],
    },
    {
      hint: "Finish with a ball of yarn to play with! 🧶",
      color: "#9b5de5",
      strokes: [
        "M 36,168 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
        "M 40,160 Q 56,170 52,180 M 36,166 Q 56,164 58,176",
      ],
    },
  ],
};
