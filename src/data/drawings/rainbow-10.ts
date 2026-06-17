import type { Animal } from "../animals";

// A full rainbow sky scene with clouds, sun, rain and birds (10-year-old level).
export const rainbow10: Animal = {
  id: "rainbow-10",
  name: "Rainbow",
  emoji: "🌈",
  level: 10,
  color: "#e63946",
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Start with a red arc 🔴", color: "#e63946", strokes: ["M 28,150 A 72,72 0 0,1 172,150"] },
    { hint: "Now orange 🟠", color: "#f4a300", strokes: ["M 38,150 A 62,62 0 0,1 162,150"] },
    { hint: "Then yellow 🟡", color: "#ffd166", strokes: ["M 48,150 A 52,52 0 0,1 152,150"] },
    { hint: "Green next 🟢", color: "#06d6a0", strokes: ["M 58,150 A 42,42 0 0,1 142,150"] },
    { hint: "Then blue 🔵", color: "#118ab2", strokes: ["M 68,150 A 32,32 0 0,1 132,150"] },
    { hint: "Indigo after that", color: "#3a3aa0", strokes: ["M 78,150 A 22,22 0 0,1 122,150"] },
    { hint: "Finish the arcs with violet! 🟣", color: "#9b5de5", strokes: ["M 88,150 A 12,12 0 0,1 112,150"] },
    {
      hint: "Add a fluffy cloud at each end ☁️",
      color: "#9aa5b1",
      strokes: [
        "M 22,154 Q 12,154 14,143 Q 11,134 25,136 Q 30,126 43,134 Q 52,132 50,146 Q 56,154 43,154 Z",
        "M 178,154 Q 188,154 186,143 Q 189,134 175,136 Q 170,126 157,134 Q 148,132 150,146 Q 144,154 157,154 Z",
      ],
    },
    {
      hint: "Add raindrops falling from the clouds 💧",
      color: "#118ab2",
      strokes: ["M 26,160 L 22,172 M 38,160 L 34,172 M 162,160 L 158,172 M 174,160 L 170,172"],
    },
    {
      hint: "Finish with a sun and birds! ☀️🐦",
      color: "#f4a300",
      strokes: [
        "M 96,40 a 11,11 0 1,0 22,0 a 11,11 0 1,0 -22,0",
        "M 107,18 L 107,10 M 85,30 L 79,24 M 129,30 L 135,24",
      ],
    },
  ],
};
