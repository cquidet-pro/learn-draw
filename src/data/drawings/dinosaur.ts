import type { Animal } from "../animals";

// A friendly long-necked dinosaur.
export const dinosaur: Animal = {
  id: "dinosaur",
  name: "Dinosaur",
  emoji: "🦕",
  viewBox: "0 0 200 200",
  color: "#2a9d4a",
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
      hint: "Finish with an eye and a smile! 😄",
      strokes: [
        "M 62,38 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
        "M 60,46 Q 67,50 73,45",
      ],
    },
  ],
};
