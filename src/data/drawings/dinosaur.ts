import type { Animal } from "../animals";

// A friendly kawaii long-necked dinosaur: dark outline first, colored in last.
const OUTLINE = "#4f3a2c";
const GREEN = "#5bbf63";

// The body is one round ellipse; the neck, tail and head all grow FROM its
// outline (start a couple of units inside so they connect with no gap).
const BODY = "M 60,130 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0";
// Neck: two lines rising from the top of the body up to the head. They start on
// the body's top edge (not inside it) and stop AT the head, never crossing it.
const NECK_L = "M 75,113 Q 54,80 64,52";
const NECK_R = "M 91,106 Q 84,82 80,54";
const HEAD = "M 60,42 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0";
const NECK_FILL = "M 75,113 Q 54,80 64,52 L 80,54 Q 84,82 91,106 Z";
// Tail: a proper closed loop (teardrop) starting at the body's right edge, so
// it colors cleanly instead of being a thin line.
const TAIL = "M 150,123 Q 178,123 186,148 Q 172,140 150,137 Z";
const LEGS =
  "M 78,152 L 78,170 M 100,156 L 100,172 M 122,156 L 122,172 M 142,152 L 142,168";
const EYE = "M 65,40 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0";
const SMILE = "M 64,47 Q 71,51 78,46";

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
      strokes: [BODY],
    },
    {
      hint: "Add a long neck and a tiny head",
      color: OUTLINE,
      strokes: [NECK_L, NECK_R, HEAD],
    },
    {
      hint: "Add a long swishy tail",
      color: OUTLINE,
      strokes: [TAIL],
    },
    {
      hint: "Give it four chunky legs",
      color: OUTLINE,
      strokes: [LEGS],
    },
    {
      hint: "Finish with an eye and a smile! 😄",
      color: OUTLINE,
      strokes: [EYE, SMILE],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      // One uniform green for the whole body, neck, tail and head.
      fills: [
        { d: BODY, color: GREEN },
        { d: TAIL, color: GREEN },
        { d: NECK_FILL, color: GREEN },
        { d: HEAD, color: GREEN },
        { d: EYE, color: "#3a2a20" },
      ],
    },
  ],
};
