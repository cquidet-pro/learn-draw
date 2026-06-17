import type { Animal } from "../animals";

// A friendly kawaii long-necked dinosaur: dark outline first, colored in last.
const OUTLINE = "#4f3a2c";

export const dinosaur: Animal = {
  id: "dinosaur",
  name: "Dinosaur",
  emoji: "🦕",
  viewBox: "0 0 200 200",
  color: OUTLINE,
  steps: [
    {
      hint: "Draw a big round body 🦕",
      color: OUTLINE,
      strokes: ["M 60,130 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0"],
    },
    {
      hint: "Add a long neck and a tiny head",
      color: OUTLINE,
      strokes: [
        "M 74,116 Q 50,72 64,44",
        "M 92,116 Q 82,80 78,52",
        "M 58,40 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
      ],
    },
    {
      hint: "Add a long swishy tail",
      color: OUTLINE,
      strokes: ["M 148,134 Q 182,128 186,154"],
    },
    {
      hint: "Give it four chunky legs",
      color: OUTLINE,
      strokes: [
        "M 78,152 L 78,170 M 100,156 L 100,172 M 122,156 L 122,172 M 142,152 L 142,168",
      ],
    },
    {
      hint: "Finish with an eye and a smile! 😄",
      color: OUTLINE,
      strokes: [
        "M 62,38 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 60,46 Q 67,50 73,45",
      ],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: "M 148,134 Q 182,128 186,154 Q 168,142 148,140 Z", color: "#5bbf63" },
        { d: "M 60,130 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0", color: "#5bbf63" },
        { d: "M 74,116 Q 50,72 64,44 L 78,52 Q 82,80 92,116 Z", color: "#5bbf63" },
        { d: "M 58,40 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0", color: "#5bbf63" },
        { d: "M 96,128 a 26,16 0 1,0 52,0 a 26,16 0 1,0 -52,0", color: "#8fdc94" },
        { d: "M 62,38 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#3a2a20" },
      ],
    },
  ],
};
