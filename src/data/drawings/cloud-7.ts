import type { Animal } from "../animals";

// A bigger rain cloud with lightning and a puddle (7-year-old level).
export const cloud7: Animal = {
  id: "cloud-7",
  name: "Rain Cloud",
  emoji: "🌧️",
  level: 7,
  color: "#9aa5b1",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw a big fluffy cloud ☁️",
      strokes: [
        "M 58,108 Q 36,108 38,88 Q 34,66 58,68 Q 62,46 88,54 Q 104,38 124,54 Q 150,50 148,78 Q 168,82 158,104 Q 154,114 136,108 Z",
      ],
    },
    {
      hint: "Add the first row of raindrops",
      color: "#118ab2",
      strokes: ["M 68,116 L 63,132 M 90,118 L 85,134 M 112,116 L 107,132 M 132,118 L 127,134"],
    },
    {
      hint: "Add another row of rain",
      color: "#118ab2",
      strokes: ["M 78,140 L 74,154 M 100,142 L 96,156 M 122,140 L 118,154"],
    },
    {
      hint: "Add a zig-zag lightning bolt! ⚡",
      color: "#ffd166",
      strokes: ["M 100,114 L 92,138 L 102,138 L 94,162"],
    },
    {
      hint: "Finish with a splashy puddle 💧",
      color: "#118ab2",
      strokes: ["M 64,178 Q 100,170 150,178"],
    },
  ],
};
