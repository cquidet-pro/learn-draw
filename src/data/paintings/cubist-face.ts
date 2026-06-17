import type { Animal } from "../animals";

// An original "mixed-up face" inspired by Picasso's Cubism — not a copy of any
// specific painting (those are still under copyright), just the playful idea.
export const cubistFace: Animal = {
  id: "cubist-face",
  name: "Cubist Face",
  emoji: "🎭",
  artist: "Picasso style",
  fact: "Picasso drew faces from the front and the side at the same time — that's Cubism!",
  viewBox: "0 0 200 200",
  color: "#3a3a55",
  colorReveal: true,
  steps: [
    {
      hint: "Draw a wonky face shape 🟦",
      color: "#3a3a55",
      strokes: ["M 70,40 L 132,52 L 146,112 L 110,162 L 68,150 L 56,90 Z"],
    },
    {
      hint: "Add two eyes — make them different! 👁️",
      color: "#118ab2",
      strokes: [
        "M 76,76 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
        "M 108,66 L 124,66 L 124,82 L 108,82 Z",
      ],
    },
    {
      hint: "Add a nose seen from the side 👃",
      color: "#ef476f",
      strokes: ["M 96,86 L 114,100 L 96,110 L 101,98 Z"],
    },
    {
      hint: "Add a crooked smile 🙂",
      color: "#f4a300",
      strokes: ["M 80,126 Q 100,142 122,130"],
    },
    {
      hint: "Finish with cubist lines! 🎨",
      color: "#9b5de5",
      strokes: ["M 100,40 L 100,110 M 56,90 L 146,96"],
    },
    {
      hint: "Now bring it to life with color! 🎨",
      strokes: [],
    },
  ],
};
