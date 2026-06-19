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
        "M 12,115 Q 5,115 7,107 Q 4,99 15,101 Q 19,93 29,99 Q 37,98 35,108 Q 40,115 29,115 Z",
      ],
    },
    {
      hint: "And one on the right! ☁️",
      color: "#9aa5b1",
      strokes: [
        "M 188,115 Q 195,115 193,107 Q 196,99 185,101 Q 181,93 171,99 Q 163,98 165,108 Q 160,115 171,115 Z",
      ],
    },
    {
      hint: "Now color the whole rainbow in! 🌈",
      strokes: [],
    },
  ],
};
