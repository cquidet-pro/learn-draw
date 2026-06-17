import type { Animal } from "../animals";

// An original "two views at once" portrait inspired by the general idea of
// Picasso's Cubism (a face shown half from the front, half in profile). Designed
// from scratch — not traced from any existing artwork or tutorial.
export const picassoPortrait: Animal = {
  id: "picasso-portrait",
  name: "Picasso Portrait",
  emoji: "👤",
  artist: "Picasso style",
  fact: "Picasso often showed a face from the front and the side at the same time — two views in one!",
  viewBox: "0 0 200 200",
  color: "#3a3a55",
  colorReveal: true,
  steps: [
    {
      hint: "Draw a big head shape 🟣",
      color: "#3a3a55",
      strokes: [
        "M 100,30 C 140,30 158,70 152,110 C 148,150 120,168 96,166 C 64,164 50,130 52,90 C 54,55 70,30 100,30 Z",
      ],
    },
    {
      hint: "Draw a curvy line down the middle — that splits the face!",
      color: "#9b5de5",
      strokes: ["M 100,32 C 118,60 120,100 108,140 C 104,152 100,160 96,166"],
    },
    {
      hint: "Add two eyes — one round, one from the side! 👁️",
      color: "#118ab2",
      strokes: [
        "M 68,86 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 74,86 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 116,74 Q 128,66 140,74 Q 128,82 116,74 Z",
        "M 125,74 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
      ],
    },
    {
      hint: "Add a nose seen from the side 👃",
      color: "#ef476f",
      strokes: ["M 108,98 L 130,110 L 112,120 L 116,106 Z"],
    },
    {
      hint: "Add colorful lips 👄",
      color: "#f4a300",
      strokes: [
        "M 84,136 Q 100,130 116,136 Q 100,140 84,136 Z",
        "M 86,140 Q 100,152 114,140",
      ],
    },
    {
      hint: "Finish with wild hair and an ear! 🎨",
      color: "#2a9d4a",
      strokes: [
        "M 70,34 Q 58,14 90,17 Q 122,10 140,34 Q 152,50 147,68",
        "M 150,94 q 13,4 7,19 q -9,2 -11,-9",
      ],
    },
    {
      hint: "Now bring it to life with color! 🎨",
      strokes: [],
    },
  ],
};
