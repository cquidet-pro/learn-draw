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
        "M 114,84 L 132,72 M 86,86 L 70,102",
        "M 90,118 L 86,150 M 110,118 L 114,150",
        "M 86,150 L 77,152 M 114,150 L 123,152",
      ],
    },
    {
      hint: "Add the microphone 🎤",
      color: "#3a3a55",
      strokes: [
        "M 130,48 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 132,45 L 146,45 M 131,50 L 147,50 M 133,55 L 145,55",
        "M 133,56 L 133,70 Q 133,74 139,74 Q 145,74 145,70 L 145,56",
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
      hint: "Finish with musical notes and a star! 🎵⭐",
      color: "#ef476f",
      strokes: [
        "M 144,100 a 6,4.5 0 1,0 12,0 a 6,4.5 0 1,0 -12,0",
        "M 156,100 L 156,76 q 9,3 7,14",
        "M 34,110 a 5,4 0 1,0 10,0 a 5,4 0 1,0 -10,0",
        "M 44,110 L 44,90 q 8,3 6,12",
        "M 158,118 l 2,5 l 6,1 l -4,4 l 1,5 l -5,-3 l -5,3 l 1,-5 l -4,-4 l 6,-1 z",
      ],
    },
  ],
};
