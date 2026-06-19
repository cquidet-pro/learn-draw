import type { Animal } from "../animals";

// A more detailed kawaii long-necked dinosaur with back plates (level 7).
const OUTLINE = "#4f3a2c";

export const dinosaur7: Animal = {
  id: "dinosaur-7",
  name: "Dinosaur",
  emoji: "🦕",
  level: 7,
  color: OUTLINE,
  viewBox: "0 0 200 200",
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
      hint: "Add bumpy plates along its back!",
      color: OUTLINE,
      strokes: [
        "M 90,106 L 103,88 L 108,104 M 114,104 L 127,87 L 132,109 M 136,111 L 147,97 L 150,124",
      ],
    },
    {
      hint: "Finish with an eye, a smile and spots 😄",
      color: OUTLINE,
      strokes: [
        "M 62,38 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 60,46 Q 67,50 73,45",
        "M 86,134 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 116,140 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
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
        { d: "M 86,134 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a9e48" },
        { d: "M 116,140 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0", color: "#3a9e48" },
        { d: "M 62,38 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0", color: "#3a2a20" },
      ],
    },
  ],
};
