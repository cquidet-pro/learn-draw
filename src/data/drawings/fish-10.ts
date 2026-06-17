import type { Animal } from "../animals";

// A detailed kawaii fish in an underwater scene with seaweed and bubbles
// (level 10). Outline first, colored in last.
const OUTLINE = "#4f3a2c";
const SEAWEED = "#06d6a0";
const BUBBLE = "#3aa6d8";

export const fish10: Animal = {
  id: "fish-10",
  name: "Fish",
  emoji: "🐠",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw the fish body", color: OUTLINE, strokes: ["M 40,96 Q 95,56 145,96 Q 95,136 40,96 Z"] },
    { hint: "Add a swishy tail", color: OUTLINE, strokes: ["M 40,96 L 18,70 L 25,96 L 18,122 Z"] },
    {
      hint: "Add fins on top and bottom",
      color: OUTLINE,
      strokes: ["M 72,68 Q 92,54 110,72 L 75,72 Z", "M 78,120 Q 95,134 110,117"],
    },
    {
      hint: "Add the gill line and an eye",
      color: OUTLINE,
      strokes: [
        "M 116,76 Q 109,96 116,116",
        "M 124,86 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
        "M 127,86 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
      ],
    },
    {
      hint: "Add two rows of curvy scales 🐟",
      color: OUTLINE,
      strokes: [
        "M 64,86 q 9,10 0,20 M 82,86 q 9,10 0,20 M 100,86 q 9,10 0,20",
        "M 73,96 q 9,10 0,20 M 91,96 q 9,10 0,20",
      ],
    },
    {
      hint: "Add wavy seaweed 🌿",
      color: SEAWEED,
      strokes: ["M 30,184 Q 22,164 32,148 Q 24,132 34,116", "M 170,184 Q 178,162 168,146 Q 176,130 166,116"],
    },
    {
      hint: "Add rising bubbles! 🫧",
      color: BUBBLE,
      strokes: [
        "M 150,64 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 162,48 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 156,30 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
      ],
    },
    {
      hint: "Now color the fish in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 40,96 Q 95,56 145,96 Q 95,136 40,96 Z", color: "#ffb02e" },
        { d: "M 40,96 L 18,70 L 25,96 L 18,122 Z", color: "#ff8c1a" },
        { d: "M 72,68 Q 92,54 110,72 L 75,72 Z", color: "#ff9100" },
        { d: "M 124,86 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0", color: "#ffffff" },
        { d: "M 127,86 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0", color: "#3a2a20" },
      ],
    },
  ],
};
