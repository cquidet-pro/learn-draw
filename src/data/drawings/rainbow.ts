import type { Animal } from "../animals";

// A rainbow — draw each arc in pencil, then reveal all the colors at the end.
export const rainbow: Animal = {
  id: "rainbow",
  name: "Rainbow",
  emoji: "🌈",
  viewBox: "0 0 200 200",
  color: "#e63946",
  colorReveal: true,
  steps: [
    {
      hint: "Draw the biggest arc 🔴",
      color: "#e63946",
      strokes: ["M 30,160 A 70,70 0 0,1 170,160"],
    },
    {
      hint: "Another arc just inside 🟠",
      color: "#f4a300",
      strokes: ["M 42,160 A 58,58 0 0,1 158,160"],
    },
    {
      hint: "Keep going 🟡",
      color: "#ffd166",
      strokes: ["M 54,160 A 46,46 0 0,1 146,160"],
    },
    {
      hint: "Another one 🟢",
      color: "#06d6a0",
      strokes: ["M 66,160 A 34,34 0 0,1 134,160"],
    },
    {
      hint: "Almost there 🔵",
      color: "#118ab2",
      strokes: ["M 78,160 A 22,22 0 0,1 122,160"],
    },
    {
      hint: "The littlest arc 🟣",
      color: "#9b5de5",
      strokes: ["M 90,160 A 10,10 0 0,1 110,160"],
    },
    {
      hint: "Now color the whole rainbow in! 🌈",
      strokes: [],
    },
  ],
};
