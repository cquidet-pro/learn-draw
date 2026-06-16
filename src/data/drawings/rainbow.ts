import type { Animal } from "../animals";

// A rainbow — one colorful arc per step, a chance to use every crayon.
export const rainbow: Animal = {
  id: "rainbow",
  name: "Rainbow",
  emoji: "🌈",
  viewBox: "0 0 200 200",
  color: "#e63946",
  steps: [
    {
      hint: "Start with a red arc 🔴",
      color: "#e63946",
      strokes: ["M 30,160 A 70,70 0 0,1 170,160"],
    },
    {
      hint: "Now orange 🟠",
      color: "#f4a300",
      strokes: ["M 42,160 A 58,58 0 0,1 158,160"],
    },
    {
      hint: "Then yellow 🟡",
      color: "#ffd166",
      strokes: ["M 54,160 A 46,46 0 0,1 146,160"],
    },
    {
      hint: "Green next 🟢",
      color: "#06d6a0",
      strokes: ["M 66,160 A 34,34 0 0,1 134,160"],
    },
    {
      hint: "Then blue 🔵",
      color: "#118ab2",
      strokes: ["M 78,160 A 22,22 0 0,1 122,160"],
    },
    {
      hint: "Finish with purple! 🟣",
      color: "#9b5de5",
      strokes: ["M 90,160 A 10,10 0 0,1 110,160"],
    },
  ],
};
