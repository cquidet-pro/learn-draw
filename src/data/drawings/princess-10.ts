import type { Animal } from "../animals";

// Kawaii princess (harder level): outline drawn step by step — princess, wand,
// castle and stars — then the whole scene is colored in at the very end.
const OUTLINE = "#5b3a29";
const SKIN = "#ffe0c2";
const HAIR = "#7b4a26";

const COLOR_FILLS = [
  {
    d: "M 62,82 Q 58,44 100,42 Q 142,44 138,82 Q 140,112 128,130 Q 122,116 124,100 Q 126,72 100,70 Q 74,72 76,100 Q 78,116 72,130 Q 60,112 62,82 Z",
    color: HAIR,
  },
  { d: "M 66,82 a 34,34 0 1,0 68,0 a 34,34 0 1,0 -68,0", color: SKIN },
  {
    d: "M 70,72 Q 72,52 100,52 Q 128,52 130,72 Q 120,60 108,66 Q 100,58 92,66 Q 80,60 70,72 Z",
    color: HAIR,
  },
  {
    d: "M 74,54 L 82,32 L 95,50 L 100,28 L 105,50 L 118,32 L 126,54 Q 100,46 74,54 Z",
    color: "#ffd35a",
  },
  { d: "M 80,42 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0", color: "#ff5d8f" },
  { d: "M 97.5,38 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0", color: "#ff5d8f" },
  { d: "M 115,42 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0", color: "#ff5d8f" },
  { d: "M 79,86 a 7,9 0 1,0 14,0 a 7,9 0 1,0 -14,0", color: "#3a2a20" },
  { d: "M 107,86 a 7,9 0 1,0 14,0 a 7,9 0 1,0 -14,0", color: "#3a2a20" },
  { d: "M 80.5,82 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0", color: "#ffffff" },
  { d: "M 108.5,82 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0", color: "#ffffff" },
  { d: "M 69,98 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ff9ec2" },
  { d: "M 121,98 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ff9ec2" },
  {
    d: "M 100,112 Q 78,130 72,160 Q 100,170 128,160 Q 122,130 100,112 Z",
    color: "#ff7eb6",
  },
  { d: "M 124,150 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0", color: SKIN },
  {
    d: "M 150,108 l 3,7 l 7,1 l -5,5 l 2,7 l -7,-4 l -7,4 l 2,-7 l -5,-5 l 7,-1 z",
    color: "#ffd35a",
  },
  { d: "M 196,170 L 196,124 L 244,124 L 244,170 Z", color: "#cdbfe6" },
  { d: "M 196,124 L 196,116 L 204,116 L 204,124 Z", color: "#cdbfe6" },
  { d: "M 212,124 L 212,116 L 220,116 L 220,124 Z", color: "#cdbfe6" },
  { d: "M 228,124 L 228,116 L 236,116 L 236,124 Z", color: "#cdbfe6" },
  {
    d: "M 214,170 L 214,150 Q 214,144 220,144 Q 226,144 226,150 L 226,170 Z",
    color: "#a98fd6",
  },
  {
    d: "M 210,38 l 3,7 l 7,1 l -5,5 l 2,7 l -7,-4 l -7,4 l 2,-7 l -5,-5 l 7,-1 z",
    color: "#ffd35a",
  },
  {
    d: "M 238,68 l 2.5,6 l 6,1 l -4,4 l 1.5,6 l -6,-3.5 l -6,3.5 l 1.5,-6 l -4,-4 l 6,-1 z",
    color: "#ffd35a",
  },
];

export const princess10: Animal = {
  id: "princess-10",
  name: "Princess",
  emoji: "👑",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 260 200",
  steps: [
    {
      hint: "Start with a big round head 🟤",
      color: OUTLINE,
      strokes: ["M 66,82 a 34,34 0 1,0 68,0 a 34,34 0 1,0 -68,0"],
    },
    {
      hint: "Add a sparkly jewelled crown 👑",
      color: OUTLINE,
      strokes: [
        "M 74,54 L 82,32 L 95,50 L 100,28 L 105,50 L 118,32 L 126,54 Q 100,46 74,54 Z",
      ],
    },
    {
      hint: "Draw her hair fringe",
      color: OUTLINE,
      strokes: [
        "M 70,72 Q 72,52 100,52 Q 128,52 130,72 Q 120,60 108,66 Q 100,58 92,66 Q 80,60 70,72",
      ],
    },
    {
      hint: "Add two big eyes 👀",
      color: "#3a2a20",
      strokes: [
        "M 79,86 a 7,9 0 1,0 14,0 a 7,9 0 1,0 -14,0",
        "M 107,86 a 7,9 0 1,0 14,0 a 7,9 0 1,0 -14,0",
      ],
    },
    {
      hint: "Give her a happy smile 😊",
      color: "#c0436b",
      strokes: ["M 92,100 Q 100,107 108,100"],
    },
    {
      hint: "Draw her big flowy dress 👗",
      color: OUTLINE,
      strokes: [
        "M 100,112 Q 78,130 72,160 Q 100,170 128,160 Q 122,130 100,112 Z",
        "M 84,140 Q 100,146 116,140",
      ],
    },
    {
      hint: "Add a magic wand! ✨",
      color: OUTLINE,
      strokes: [
        "M 124,150 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
        "M 130,150 L 152,116",
        "M 150,108 l 3,7 l 7,1 l -5,5 l 2,7 l -7,-4 l -7,4 l 2,-7 l -5,-5 l 7,-1 z",
      ],
    },
    {
      hint: "Draw her castle in the distance 🏰",
      color: "#6f5b9e",
      strokes: [
        "M 196,170 L 196,116 L 204,116 L 204,124 L 212,124 L 212,116 L 220,116 L 220,124 L 228,124 L 228,116 L 236,116 L 236,124 L 244,124 L 244,170",
        "M 214,170 L 214,150 Q 214,144 220,144 Q 226,144 226,150 L 226,170",
      ],
    },
    {
      hint: "Add twinkly stars! ⭐",
      color: OUTLINE,
      strokes: [
        "M 210,38 l 3,7 l 7,1 l -5,5 l 2,7 l -7,-4 l -7,4 l 2,-7 l -5,-5 l 7,-1 z",
        "M 238,68 l 2.5,6 l 6,1 l -4,4 l 1.5,6 l -6,-3.5 l -6,3.5 l 1.5,-6 l -4,-4 l 6,-1 z",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: COLOR_FILLS,
    },
  ],
};
