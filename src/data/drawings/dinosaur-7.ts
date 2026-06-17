import type { Animal } from "../animals";

// A more detailed long-necked dinosaur with back plates (7-year-old level).
export const dinosaur7: Animal = {
  id: "dinosaur-7",
  name: "Dinosaur",
  emoji: "🦕",
  level: 7,
  color: "#2a9d4a",
  viewBox: "0 0 200 200",
  steps: [
    {
      hint: "Draw a big round body 🦕",
      strokes: ["M 60,130 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0"],
    },
    {
      hint: "Add a long neck and a tiny head",
      strokes: [
        "M 74,116 Q 50,72 64,44",
        "M 92,116 Q 82,80 78,52",
        "M 58,40 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0",
      ],
    },
    {
      hint: "Add a long swishy tail",
      strokes: ["M 148,134 Q 182,128 186,154"],
    },
    {
      hint: "Give it four chunky legs",
      strokes: [
        "M 78,152 L 78,170 M 100,156 L 100,172 M 122,156 L 122,172 M 142,152 L 142,168",
      ],
    },
    {
      hint: "Add bumpy plates along its back!",
      color: "#1b6b2b",
      strokes: [
        "M 92,108 L 100,96 L 108,108 M 114,106 L 124,93 L 134,106 M 138,110 L 148,99 L 156,114",
      ],
    },
    {
      hint: "Finish with an eye, a smile and spots 😄",
      color: "#1b6b2b",
      strokes: [
        "M 62,38 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 60,46 Q 67,50 73,45",
        "M 86,134 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
        "M 116,140 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
      ],
    },
  ],
};
