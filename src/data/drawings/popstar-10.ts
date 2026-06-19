import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// An original cartoon pop star on a little stage (our own design). Harder
// version — outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const popstar10: Animal = {
  id: "popstar-10",
  name: "Pop Star",
  emoji: "🎤",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the face and cool hair",
      color: OUTLINE,
      strokes: [
        "M 78,52 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0",
        "M 78,48 Q 74,24 100,24 Q 126,24 122,48 Q 119,36 108,34 Q 100,30 92,34 Q 81,36 78,48 Z",
      ],
    },
    {
      hint: "Add cool sunglasses 😎",
      color: OUTLINE,
      strokes: [
        "M 83,50 L 95,50 L 95,57 L 83,57 Z",
        "M 105,50 L 117,50 L 117,57 L 105,57 Z",
        "M 95,53 L 105,53",
      ],
    },
    {
      hint: "Add a big singing smile 🎶",
      color: OUTLINE,
      strokes: ["M 88,62 Q 100,72 112,62 Q 100,68 88,62 Z"],
    },
    {
      hint: "Add the body and outfit",
      color: OUTLINE,
      strokes: ["M 86,74 Q 100,82 114,74 L 120,118 L 80,118 Z"],
    },
    {
      hint: "Add arms and legs",
      color: OUTLINE,
      strokes: [
        "M 114,84 L 132,72 M 86,86 L 70,102",
        "M 90,118 L 86,150 M 110,118 L 114,150",
        "M 86,150 L 77,152 M 114,150 L 123,152",
      ],
    },
    {
      hint: "Add the microphone 🎤",
      color: OUTLINE,
      strokes: [
        "M 130,48 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
        "M 132,45 L 146,45 M 131,50 L 147,50 M 133,55 L 145,55",
        "M 133,56 L 133,70 Q 133,74 139,74 Q 145,74 145,70 L 145,56",
      ],
    },
    {
      hint: "Put the star on a stage with a spotlight! 🔦",
      color: OUTLINE,
      strokes: ["M 18,160 L 182,160", "M 6,8 L 64,150 M 30,6 L 96,150"],
    },
    {
      hint: "Finish with musical notes and a star! 🎵⭐",
      color: OUTLINE,
      strokes: [
        "M 144,100 a 6,4.5 0 1,0 12,0 a 6,4.5 0 1,0 -12,0",
        "M 156,100 L 156,76 q 9,3 7,14",
        "M 34,110 a 5,4 0 1,0 10,0 a 5,4 0 1,0 -10,0",
        "M 44,110 L 44,90 q 8,3 6,12",
        "M 158,118 l 2,5 l 6,1 l -4,4 l 1,5 l -5,-3 l -5,3 l 1,-5 l -4,-4 l 6,-1 z",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 78,52 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0", color: "#ffe0c2" },
        {
          d: "M 78,48 Q 74,24 100,24 Q 126,24 122,48 Q 119,36 108,34 Q 100,30 92,34 Q 81,36 78,48 Z",
          color: "#9b5de5",
        },
        { d: "M 86,74 Q 100,82 114,74 L 120,118 L 80,118 Z", color: "#ff70a6" },
        { d: "M 80,60 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#ffb3c1" },
        { d: "M 112,60 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#ffb3c1" },
        { d: "M 83,50 L 95,50 L 95,57 L 83,57 Z", color: "#3a3a55" },
        { d: "M 105,50 L 117,50 L 117,57 L 105,57 Z", color: "#3a3a55" },
        { d: "M 130,48 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0", color: "#6a6a86" },
        { d: "M 133,56 L 133,70 Q 133,74 139,74 Q 145,74 145,70 L 145,56 Z", color: "#3a3a55" },
        { d: "M 158,118 l 2,5 l 6,1 l -4,4 l 1,5 l -5,-3 l -5,3 l 1,-5 l -4,-4 l 6,-1 z", color: "#ffd23f" },
        { d: "M 144,100 a 6,4.5 0 1,0 12,0 a 6,4.5 0 1,0 -12,0", color: "#3a3a55" },
        { d: "M 34,110 a 5,4 0 1,0 10,0 a 5,4 0 1,0 -10,0", color: "#3a3a55" },
      ],
    },
    nameStep("POP STAR", { baseline: 193, height: 18 }),
  ],
};
