import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// An original masked superhero of our own design. Harder version — outline
// first, colored in last. The harder version also brews a little storm cloud
// on the right (the hero's name is "Super-Stormy").
const OUTLINE = "#4f3a2c";
const RAIN = "#3aa6d8";

// A small storm in the upper-right: fluffy cloud, lightning bolt and raindrops.
const STORM_CLOUD =
  "M 159,80 Q 150,80 151,71 Q 148,61 158,62 Q 160,51 171,54 Q 179,47 187,56 Q 193,64 185,73 Q 183,80 174,79 Z";
const STORM_BOLT = "M 172,80 L 164,96 L 174,96 L 166,112";
const STORM_RAIN =
  "M 155,86 L 152,96 M 184,86 L 181,96 M 159,101 L 156,110 M 180,101 L 177,110";

export const heromask10: Animal = {
  id: "heromask-10",
  name: "Super-Stormy",
  emoji: "🦸",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw the hero's head 🦸",
      color: OUTLINE,
      strokes: [
        "M 100,30 C 128,30 142,52 140,76 C 138,102 120,116 100,116 C 80,116 62,102 60,76 C 58,52 72,30 100,30 Z",
      ],
    },
    {
      hint: "Add cool swooshy hair! 💇",
      color: OUTLINE,
      strokes: [
        "M 62,70 Q 54,40 100,27 Q 146,40 138,70 Q 130,50 118,48 Q 109,55 100,48 Q 91,55 82,48 Q 70,50 62,70 Z",
      ],
    },
    {
      hint: "Add a big flowing cape!",
      color: OUTLINE,
      strokes: [
        "M 78,116 L 44,148 L 38,186 L 86,158 Z",
        "M 122,116 L 156,148 L 162,186 L 114,158 Z",
      ],
    },
    {
      hint: "Add the body and collar",
      color: OUTLINE,
      strokes: [
        "M 80,116 Q 100,126 120,116 L 132,186 L 68,186 Z",
        "M 84,118 L 100,128 L 116,118",
      ],
    },
    {
      hint: "Add a hero belt",
      color: OUTLINE,
      strokes: ["M 70,168 L 130,168", "M 95,164 L 105,164 L 105,174 L 95,174 Z"],
    },
    {
      hint: "Add the eye mask 🦸",
      color: OUTLINE,
      strokes: [
        "M 64,64 Q 72,54 86,56 Q 95,58 100,64 Q 105,58 114,56 Q 128,54 136,64 Q 136,80 118,82 Q 104,82 100,74 Q 96,82 82,82 Q 64,80 64,64 Z",
      ],
    },
    {
      hint: "Add the eyes 👀",
      color: OUTLINE,
      strokes: [
        "M 76,66 Q 84,59 92,66 Q 90,75 84,76 Q 78,74 76,66 Z",
        "M 124,66 Q 116,59 108,66 Q 110,75 116,76 Q 122,74 124,66 Z",
      ],
    },
    {
      hint: "Add a brave smile",
      color: OUTLINE,
      strokes: ["M 90,98 Q 100,104 110,98"],
    },
    {
      hint: "Finish with a lightning emblem in a shield! ⚡",
      color: OUTLINE,
      strokes: [
        "M 100,132 L 116,138 L 112,156 L 100,162 L 88,156 L 84,138 Z",
        "M 104,138 L 95,149 L 101,149 L 96,158",
      ],
    },
    {
      hint: "Brew a storm cloud on the right! ☁️",
      color: OUTLINE,
      strokes: [STORM_CLOUD],
    },
    {
      hint: "Add a zig-zag lightning bolt! ⚡",
      color: "#f4b400",
      strokes: [STORM_BOLT],
    },
    {
      hint: "Add some falling raindrops 💧",
      color: RAIN,
      strokes: [STORM_RAIN],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: STORM_CLOUD, color: "#dbe4ec" },
        { d: "M 78,116 L 44,148 L 38,186 L 86,158 Z", color: "#e63946" },
        { d: "M 122,116 L 156,148 L 162,186 L 114,158 Z", color: "#e63946" },
        { d: "M 80,116 Q 100,126 120,116 L 132,186 L 68,186 Z", color: "#2a6fd6" },
        {
          d: "M 100,30 C 128,30 142,52 140,76 C 138,102 120,116 100,116 C 80,116 62,102 60,76 C 58,52 72,30 100,30 Z",
          color: "#ffd0a8",
        },
        {
          d: "M 62,70 Q 54,40 100,27 Q 146,40 138,70 Q 130,50 118,48 Q 109,55 100,48 Q 91,55 82,48 Q 70,50 62,70 Z",
          color: "#6b4a2b",
        },
        { d: "M 95,164 L 105,164 L 105,174 L 95,174 Z", color: "#ffd23f" },
        {
          d: "M 64,64 Q 72,54 86,56 Q 95,58 100,64 Q 105,58 114,56 Q 128,54 136,64 Q 136,80 118,82 Q 104,82 100,74 Q 96,82 82,82 Q 64,80 64,64 Z",
          color: "#1a1a2e",
        },
        { d: "M 76,66 Q 84,59 92,66 Q 90,75 84,76 Q 78,74 76,66 Z", color: "#ffffff" },
        { d: "M 124,66 Q 116,59 108,66 Q 110,75 116,76 Q 122,74 124,66 Z", color: "#ffffff" },
        {
          d: "M 100,132 L 116,138 L 112,156 L 100,162 L 88,156 L 84,138 Z",
          color: "#ffd23f",
        },
      ],
    },
    nameStep("SUPER-STORMY", { baseline: 26, height: 14 }),
  ],
};
