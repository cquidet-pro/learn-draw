import type { Animal } from "../animals";

// An original cartoon pop star on a little stage (our own design). Harder version.
export const popstar10: Animal = {
  id: "popstar-10",
  name: "Pop Star",
  emoji: "🎤",
  level: 10,
  color: "#9b5de5",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the face and cool hair",
      strokes: [
        "M 78,52 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0",
        "M 78,48 Q 74,24 100,24 Q 126,24 122,48 Q 119,36 108,34 Q 100,30 92,34 Q 81,36 78,48 Z",
      ],
    },
    {
      hint: "Add cool sunglasses 😎",
      color: "#3a3a55",
      strokes: [
        "M 83,50 L 95,50 L 95,57 L 83,57 Z",
        "M 105,50 L 117,50 L 117,57 L 105,57 Z",
        "M 95,53 L 105,53",
      ],
    },
    {
      hint: "Add a big singing smile 🎶",
      strokes: ["M 88,62 Q 100,72 112,62 Q 100,68 88,62 Z"],
    },
    {
      hint: "Add the body and outfit",
      strokes: ["M 86,74 Q 100,82 114,74 L 120,118 L 80,118 Z"],
    },
    {
      hint: "Add arms and legs",
      strokes: [
        "M 114,84 L 134,68 M 86,86 L 70,102",
        "M 90,118 L 86,150 M 110,118 L 114,150",
        "M 86,150 L 77,152 M 114,150 L 123,152",
      ],
    },
    {
      hint: "Add the microphone 🎤",
      color: "#3a3a55",
      strokes: [
        "M 132,58 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
        "M 137,64 L 134,68",
      ],
    },
    {
      hint: "Put the star on a stage with a spotlight! 🔦",
      color: "#ffd166",
      strokes: [
        "M 18,160 L 182,160",
        "M 6,8 L 64,150 M 30,6 L 96,150",
      ],
    },
    {
      hint: "Finish with musical notes and sparkles! 🎵",
      color: "#ef476f",
      strokes: [
        "M 150,80 L 150,96 M 146,96 a 4,3 0 1,0 8,0 a 4,3 0 1,0 -8,0",
        "M 40,96 L 40,110 M 36,110 a 3,2.5 0 1,0 7,0 a 3,2.5 0 1,0 -7,0",
        "M 158,120 L 158,130 M 153,125 L 163,125",
      ],
    },
  ],
};
