import type { Animal } from "../animals";

// A fluffy cloud with falling rain.
export const cloud: Animal = {
  id: "cloud",
  name: "Rain Cloud",
  emoji: "🌧️",
  viewBox: "0 0 200 200",
  color: "#9aa5b1",
  steps: [
    {
      hint: "Draw a fluffy cloud ☁️",
      strokes: [
        "M 62,118 Q 40,118 42,100 Q 38,80 60,82 Q 64,60 90,68 Q 106,52 126,68 Q 152,64 150,90 Q 168,94 158,114 Q 154,122 138,118 Z",
      ],
    },
    {
      hint: "Add some big raindrops",
      color: "#118ab2",
      strokes: [
        "M 72,128 L 67,144 M 96,130 L 91,146 M 120,128 L 115,144 M 140,130 L 135,146",
      ],
    },
    {
      hint: "Add even more rain! 🌧️",
      color: "#118ab2",
      strokes: [
        "M 84,150 L 80,164 M 108,150 L 104,164 M 128,150 L 124,164",
      ],
    },
  ],
};
