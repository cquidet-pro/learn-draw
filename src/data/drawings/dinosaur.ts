import type { Animal } from "../animals";

// A friendly kawaii long-necked dinosaur with a cute T-rex head: dark outline
// first, colored in last.
const OUTLINE = "#4f3a2c";
const GREEN = "#5bbf63";

// The body is one round ellipse; the neck, head, tail and legs all grow FROM its
// outline (start a couple of units inside so they connect with no gap).
const BODY = "M 60,130 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0";
// Neck: two lines that START on the body's top edge and rise straight UP to the
// head — they never dip back down inside the green body.
const NECK_L = "M 74,112 L 70,82 L 73,54";
const NECK_R = "M 92,104 L 91,80 L 90,52";
// Long T-rex head with an open toothy mouth, snout pointing left. One closed
// blob (upper skull/snout + lower jaw joined at the back) so it fills green; the
// open mouth and teeth are drawn on top.
const HEAD =
  "M 90,44 Q 94,32 84,28 Q 70,22 56,28 Q 42,34 34,42 Q 30,46 34,49 L 60,47 L 90,44 L 62,51 L 40,53 Q 35,53 36,57 L 46,60 Q 68,66 88,56 Q 93,52 90,44 Z";
// The open mouth (a dark wedge between the jaws) and the teeth that sit in it.
const MOUTH = "M 34,49 L 60,47 L 86,45 L 62,51 L 40,53 Q 35,52 35,50 Z";
const UTEETH = "M 42,47.5 L 45,52 L 48,47 Z M 52,47 L 55,51.5 L 58,46.5 Z";
const LTEETH = "M 45,52 L 48,48 L 51,52 Z M 56,51.5 L 59,47.5 L 62,51 Z";
const EYE = "M 64,35 a 3.2,3.2 0 1,0 6.4,0 a 3.2,3.2 0 1,0 -6.4,0";
// Tail: a proper closed loop (teardrop) starting at the body's right edge, so
// it colors cleanly instead of being a thin line.
const TAIL = "M 150,123 Q 178,123 186,148 Q 172,140 150,137 Z";
// Four chunky legs, each flaring into a real foot with little toe claws along a
// flat bottom. They hang naturally below the body (no ground line at this level).
const LEG_1 =
  "M 73,150 L 73,164 Q 70,173 66,174 Q 66,176 74.0,176 Q 74.0,173.5 74.0,176 Q 82.0,176 82.0,176 Q 82.0,173.5 82.0,176 Q 90,176 90,173 Q 89,173 87,164 L 87,150 Z";
const LEG_2 =
  "M 94,154 L 94,164 Q 91,173 87,174 Q 87,176 95.0,176 Q 95.0,173.5 95.0,176 Q 103.0,176 103.0,176 Q 103.0,173.5 103.0,176 Q 111,176 111,173 Q 110,173 108,164 L 108,154 Z";
const LEG_3 =
  "M 114,154 L 114,164 Q 111,173 107,174 Q 107,176 115.0,176 Q 115.0,173.5 115.0,176 Q 123.0,176 123.0,176 Q 123.0,173.5 123.0,176 Q 131,176 131,173 Q 130,173 128,164 L 128,154 Z";
const LEG_4 =
  "M 135,150 L 135,164 Q 132,173 128,174 Q 128,176 136.0,176 Q 136.0,173.5 136.0,176 Q 144.0,176 144.0,176 Q 144.0,173.5 144.0,176 Q 152,176 152,173 Q 151,173 149,164 L 149,150 Z";

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
      hint: "Add a long neck and a big head",
      color: OUTLINE,
      strokes: [NECK_L, NECK_R, HEAD],
    },
    {
      hint: "Open its mouth with pointy teeth! 🦷",
      color: OUTLINE,
      strokes: [MOUTH, UTEETH, LTEETH],
    },
    {
      hint: "Add a long swishy tail",
      color: OUTLINE,
      strokes: [TAIL],
    },
    {
      hint: "Give it four chunky legs and feet",
      color: OUTLINE,
      strokes: [LEG_1, LEG_2, LEG_3, LEG_4],
    },
    {
      hint: "Finish with a friendly eye! 😄",
      color: OUTLINE,
      strokes: [EYE],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      // One uniform green for the body, neck, head, tail and legs; the teeth stay
      // white paper, the mouth a soft dark, and the eye dark.
      fills: [
        { d: BODY, color: GREEN },
        { d: TAIL, color: GREEN },
        { d: LEG_1, color: GREEN },
        { d: LEG_2, color: GREEN },
        { d: LEG_3, color: GREEN },
        { d: LEG_4, color: GREEN },
        { d: HEAD, color: GREEN },
        { d: MOUTH, color: "#5a3b2e" },
        { d: UTEETH, color: "#ffffff" },
        { d: LTEETH, color: "#ffffff" },
        { d: EYE, color: "#3a2a20" },
      ],
    },
  ],
};
