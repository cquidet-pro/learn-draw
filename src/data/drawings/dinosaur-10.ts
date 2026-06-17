import type { Animal } from "../animals";

// A very detailed kawaii long-necked dinosaur with plates, arms and a scene
// (level 10). Outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const dinosaur10: Animal = {
  id: "dinosaur-10",
  name: "Dinosaur",
  emoji: "🦕",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw a big round body 🦕", color: OUTLINE, strokes: ["M 60,128 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0"] },
    {
      hint: "Add a long neck and a tiny head",
      color: OUTLINE,
      strokes: [
        "M 74,114 Q 50,70 64,42",
        "M 92,114 Q 82,78 78,50",
        "M 58,38 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
      ],
    },
    { hint: "Add a long swishy tail", color: OUTLINE, strokes: ["M 148,132 Q 182,126 186,152"] },
    {
      hint: "Give it four chunky legs",
      color: OUTLINE,
      strokes: ["M 78,150 L 78,168 M 100,154 L 100,170 M 122,154 L 122,170 M 142,150 L 142,166"],
    },
    { hint: "Add little arms", color: OUTLINE, strokes: ["M 80,118 Q 70,124 70,132"] },
    {
      hint: "Add bumpy plates along its back!",
      color: OUTLINE,
      strokes: ["M 92,106 L 100,94 L 108,106 M 114,104 L 124,91 L 134,104 M 138,108 L 148,97 L 156,112"],
    },
    {
      hint: "Add an eye, a smile and spots 😄",
      color: OUTLINE,
      strokes: [
        "M 62,36 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 60,44 Q 67,48 73,43",
        "M 86,132 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 116,138 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
      ],
    },
    {
      hint: "Finish with the ground and a fern 🌿",
      color: OUTLINE,
      strokes: ["M 8,182 L 192,182", "M 26,182 Q 18,166 28,154 M 26,168 L 18,164 M 27,160 L 19,156"],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 148,132 Q 182,126 186,152 Q 168,140 148,138 Z", color: "#5bbf63" },
        { d: "M 60,128 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0", color: "#5bbf63" },
        { d: "M 74,114 Q 50,70 64,42 L 78,50 Q 82,78 92,114 Z", color: "#5bbf63" },
        { d: "M 58,38 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#5bbf63" },
        { d: "M 86,132 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a9e48" },
        { d: "M 116,138 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a9e48" },
        { d: "M 62,36 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#3a2a20" },
      ],
    },
  ],
};
