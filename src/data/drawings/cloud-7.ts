import type { Animal } from "../animals";

// A bigger kawaii rain cloud with lightning and a puddle (level 7). The cloud
// outline is drawn then colored; rain, lightning and puddle keep their colors.
const OUTLINE = "#4f3a2c";
const RAIN = "#3aa6d8";

export const cloud7: Animal = {
  id: "cloud-7",
  name: "Rain Cloud",
  emoji: "🌧️",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw a big fluffy cloud ☁️",
      color: OUTLINE,
      strokes: [
        "M 58,108 Q 36,108 38,88 Q 34,66 58,68 Q 62,46 88,54 Q 104,38 124,54 Q 150,50 148,78 Q 168,82 158,104 Q 154,114 136,108 Z",
      ],
    },
    {
      hint: "Add the first row of raindrops",
      color: RAIN,
      strokes: ["M 68,116 L 63,132 M 90,118 L 85,134 M 112,116 L 107,132 M 132,118 L 127,134"],
    },
    {
      hint: "Add another row of rain",
      color: RAIN,
      strokes: ["M 78,140 L 74,154 M 100,142 L 96,156 M 122,140 L 118,154"],
    },
    {
      hint: "Add a zig-zag lightning bolt! ⚡",
      color: "#f4b400",
      strokes: ["M 100,114 L 92,138 L 102,138 L 94,162"],
    },
    {
      hint: "Finish with a splashy puddle 💧",
      color: RAIN,
      strokes: ["M 64,178 Q 100,170 150,178"],
    },
    {
      hint: "Now color the cloud in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        {
          d: "M 58,108 Q 36,108 38,88 Q 34,66 58,68 Q 62,46 88,54 Q 104,38 124,54 Q 150,50 148,78 Q 168,82 158,104 Q 154,114 136,108 Z",
          color: "#dbe4ec",
        },
      ],
    },
  ],
};
