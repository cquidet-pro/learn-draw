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
// The left line stops at the head's underside (y62) instead of poking up inside
// the green head; the green NECK_FILL still reaches the head so there's no gap.
const NECK_L = "M 74,112 L 70,82 L 72,62";
const NECK_R = "M 92,104 L 91,80 L 90,52";
// The green column BETWEEN the two neck lines, so the neck colours in (it used to
// be left white). Closes NECK_L's path across the top into NECK_R's path.
const NECK_FILL = "M 74,112 L 70,82 L 73,54 L 90,52 L 91,80 L 92,104 Z";
// Long T-rex head, snout pointing left, with the mouth GAPING OPEN: the upper
// skull/snout and the dropped lower jaw are two separate green shapes that join
// solid at the back (where the neck attaches), with a dark cavity between them
// and big sharp teeth on each jaw.
const HEAD_UPPER =
  "M 31,46 L 76,51 L 90,50 Q 95,40 88,30 Q 72,23 54,24 Q 40,26 32,32 Q 26,38 26,42 Q 26,45 31,46 Z";
const HEAD_LOWER =
  "M 76,53 L 37,61 Q 32,63 35,66 Q 50,71 70,67 Q 86,64 91,57 L 90,51 Z";
// Big sharp teeth in the open mouth: the upper row hangs down from the upper jaw,
// the lower row points up from the lower jaw, and they interlock. The mouth
// interior is left white (no dark fill inside the mouth).
const UTEETH =
  "M 33.4,46.3 L 39.4,46.9 L 36.4,53.1 Z M 44.8,47.5 L 49.6,48.1 L 47.2,53.1 Z M 56.2,48.8 L 59.8,49.2 L 58,53.1 Z";
const LTEETH =
  "M 41.3,60.1 L 46.8,59 L 44,53.6 Z M 51.9,57.9 L 56.4,57 L 54.2,52.6 Z M 61.8,55.9 L 65.3,55.2 L 63.5,51.8 Z";
const EYE = "M 64,35 a 3.2,3.2 0 1,0 6.4,0 a 3.2,3.2 0 1,0 -6.4,0";
// Tail: a proper closed loop (teardrop) starting at the body's right edge, so
// it colors cleanly instead of being a thin line.
const TAIL = "M 150,123 Q 178,123 186,148 Q 172,140 150,137 Z";
// Four chunky legs. Each is an OPEN path: it starts a couple of units INSIDE the
// body's lower edge (so it joins with no gap and no dark line cuts across the
// belly), runs down one side, makes three little toes along a flat foot, then
// back up the other side — also starting inside the body. They hang naturally
// below the body (no ground line at this level).
const LEG_1 =
  "M 72,146.9 L 72,171 L 70,176 L 74,176 L 75,173 L 77,176 L 78,173 L 80,176 L 84,176 L 84,152.6";
const LEG_2 =
  "M 90,154.3 L 90,171 L 88,176 L 92,176 L 93,173 L 95,176 L 96,173 L 98,176 L 102,176 L 102,155.9";
const LEG_3 =
  "M 108,156 L 108,171 L 106,176 L 110,176 L 111,173 L 113,176 L 114,173 L 116,176 L 120,176 L 120,154.7";
const LEG_4 =
  "M 126,153.2 L 126,171 L 124,176 L 128,176 L 129,173 L 131,176 L 132,173 L 134,176 L 138,176 L 138,148.1";

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
      strokes: [NECK_L, NECK_R, HEAD_UPPER, HEAD_LOWER],
    },
    {
      hint: "Add big sharp teeth! 🦷",
      color: OUTLINE,
      strokes: [UTEETH, LTEETH],
      strokeWidth: 0.8,
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
        { d: NECK_FILL, color: GREEN },
        { d: TAIL, color: GREEN },
        { d: LEG_1, color: GREEN },
        { d: LEG_2, color: GREEN },
        { d: LEG_3, color: GREEN },
        { d: LEG_4, color: GREEN },
        { d: HEAD_UPPER, color: GREEN },
        { d: HEAD_LOWER, color: GREEN },
        { d: UTEETH, color: "#ffffff" },
        { d: LTEETH, color: "#ffffff" },
        { d: EYE, color: "#3a2a20" },
      ],
    },
  ],
};
