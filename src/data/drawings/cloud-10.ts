import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A stormy kawaii scene: big cloud, heavy rain, lightning, puddle and an
// umbrella (level 10). The cloud and umbrella are colored; rain stays blue.
const OUTLINE = "#4f3a2c";
const RAIN = "#3aa6d8";

export const cloud10: Animal = {
  id: "cloud-10",
  name: "Rain Cloud",
  emoji: "🌧️",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw a big fluffy cloud ☁️",
      color: OUTLINE,
      strokes: [
        "M 58,98 Q 36,98 38,78 Q 34,56 58,58 Q 62,36 88,44 Q 104,28 124,44 Q 150,40 148,68 Q 168,72 158,94 Q 154,104 136,98 Z",
      ],
    },
    {
      hint: "Add the first row of raindrops",
      color: RAIN,
      strokes: ["M 64,106 L 59,122 M 84,108 L 79,124 M 104,106 L 99,122 M 124,108 L 119,124"],
    },
    {
      hint: "Add another row of rain",
      color: RAIN,
      strokes: ["M 74,130 L 70,144 M 94,132 L 90,146 M 114,130 L 110,144"],
    },
    {
      hint: "Add a zig-zag lightning bolt! ⚡",
      color: "#f4b400",
      strokes: ["M 100,104 L 92,128 L 102,128 L 94,152"],
    },
    {
      hint: "Add a colourful umbrella ☂️",
      color: OUTLINE,
      strokes: [
        "M 130,150 Q 130,128 152,128 Q 174,128 174,150 Z",
        "M 152,128 L 152,170 Q 152,176 146,176",
      ],
    },
    {
      hint: "Add a splashy puddle 💧",
      color: RAIN,
      strokes: ["M 40,182 Q 80,174 120,182", "M 64,178 L 60,170 M 96,178 L 92,170"],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 58,98 Q 36,98 38,78 Q 34,56 58,58 Q 62,36 88,44 Q 104,28 124,44 Q 150,40 148,68 Q 168,72 158,94 Q 154,104 136,98 Z",
          color: "#dbe4ec",
        },
        { d: "M 130,150 Q 130,128 152,128 Q 174,128 174,150 Z", color: "#ef476f" },
      ],
    },
    nameStep("CLOUD", { baseline: 197, height: 13 }),
  ],
};
