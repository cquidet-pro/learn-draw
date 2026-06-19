import type { Animal } from "../animals";

// A full seven-colour rainbow with clouds at each end (7-year-old level).
export const rainbow7: Animal = {
  id: "rainbow-7",
  name: "Rainbow",
  emoji: "🌈",
  level: 7,
  color: "#e63946",
  viewBox: "0 0 200 200",
  colorReveal: true,
  steps: [
    { hint: "Start with a red arc 🔴", color: "#e63946", strokes: ["M 28,160 A 72,72 0 0,1 172,160"] },
    { hint: "Now orange 🟠", color: "#f4a300", strokes: ["M 38,160 A 62,62 0 0,1 162,160"] },
    { hint: "Then yellow 🟡", color: "#ffd166", strokes: ["M 48,160 A 52,52 0 0,1 152,160"] },
    { hint: "Green next 🟢", color: "#06d6a0", strokes: ["M 58,160 A 42,42 0 0,1 142,160"] },
    { hint: "Then blue 🔵", color: "#118ab2", strokes: ["M 68,160 A 32,32 0 0,1 132,160"] },
    { hint: "Indigo after that", color: "#3a3aa0", strokes: ["M 78,160 A 22,22 0 0,1 122,160"] },
    { hint: "Finish the arcs with violet! 🟣", color: "#9b5de5", strokes: ["M 88,160 A 12,12 0 0,1 112,160"] },
    {
      hint: "Add a fluffy cloud on the left ☁️",
      color: "#9aa5b1",
      strokes: [
        "M 22,138 Q 12,138 14,127 Q 11,118 25,120 Q 30,110 43,118 Q 52,116 50,130 Q 56,138 43,138 Z",
      ],
    },
    {
      hint: "And one on the right! ☁️",
      color: "#9aa5b1",
      strokes: [
        "M 178,138 Q 188,138 186,127 Q 189,118 175,120 Q 170,110 157,118 Q 148,116 150,130 Q 144,138 157,138 Z",
      ],
    },
    {
      hint: "Now color the whole rainbow in! 🌈",
      strokes: [],
    },
  ],
};
