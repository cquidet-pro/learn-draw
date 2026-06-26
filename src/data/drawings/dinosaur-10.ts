import type { Animal } from "../animals";
import { nameStep } from "../handwriting";

// A very detailed kawaii long-necked dinosaur with a cute T-rex head, plates, an
// arm and a scene (level 10). Outline first, colored in last. The feet stand
// right on the ground line.
const OUTLINE = "#4f3a2c";
const GREEN = "#5bbf63";

const BODY = "M 60,128 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0";
// Neck: two lines rising straight UP from the body top to the head (no dip into
// the green body).
// The left line stops at the head's underside (y62) instead of poking up inside
// the green head; the green NECK_FILL still reaches the head so there's no gap.
const NECK_L = "M 74,110 L 70,82 L 72,62";
const NECK_R = "M 92,102 L 91,80 L 90,52";
// Green column between the two neck lines so the neck colours in (was left white).
const NECK_FILL = "M 74,110 L 70,82 L 73,54 L 90,52 L 91,80 L 92,102 Z";
// Long T-rex head, snout pointing left, mouth GAPING OPEN: upper skull/snout and
// the dropped lower jaw are two green shapes joined solid at the back, with a
// dark cavity between them and big sharp teeth on each jaw.
const HEAD_UPPER =
  "M 31,46 L 76,51 L 90,50 Q 95,40 88,30 Q 72,23 54,24 Q 40,26 32,32 Q 26,38 26,42 Q 26,45 31,46 Z";
const HEAD_LOWER =
  "M 76,53 L 37,61 Q 32,63 35,66 Q 50,71 70,67 Q 86,64 91,57 L 90,51 Z";
const UTEETH =
  "M 33.4,46.3 L 39.4,46.9 L 36.4,53.1 Z M 44.8,47.5 L 49.6,48.1 L 47.2,53.1 Z M 56.2,48.8 L 59.8,49.2 L 58,53.1 Z";
const LTEETH =
  "M 41.3,60.1 L 46.8,59 L 44,53.6 Z M 51.9,57.9 L 56.4,57 L 54.2,52.6 Z M 61.8,55.9 L 65.3,55.2 L 63.5,51.8 Z";
const EYE = "M 64,35 a 3.2,3.2 0 1,0 6.4,0 a 3.2,3.2 0 1,0 -6.4,0";
const TAIL = "M 150,121 Q 178,121 186,146 Q 172,138 150,135 Z";
const ARM = "M 80,116 Q 70,122 70,130";
// Four chunky legs. Each is an OPEN path starting a couple of units INSIDE the
// body's lower edge (joins with no gap, no dark line across the belly), down one
// side, three little toes along a flat foot at the ground line (y=182), then back
// up the other side — so every foot, including the back one, touches the floor.
const LEG_1 =
  "M 72,144.9 L 72,177 L 70,182 L 74,182 L 75,179 L 77,182 L 78,179 L 80,182 L 84,182 L 84,150.6";
const LEG_2 =
  "M 90,152.3 L 90,177 L 88,182 L 92,182 L 93,179 L 95,182 L 96,179 L 98,182 L 102,182 L 102,153.9";
const LEG_3 =
  "M 108,154 L 108,177 L 106,182 L 110,182 L 111,179 L 113,182 L 114,179 L 116,182 L 120,182 L 120,152.7";
const LEG_4 =
  "M 126,151.2 L 126,177 L 124,182 L 128,182 L 129,179 L 131,182 L 132,179 L 134,182 L 138,182 L 138,146.1";
// Back plates and dark-green spots (kept from the original level-10 design).
const PLATES =
  "M 90,104 L 103,86 L 108,102 M 114,102 L 127,85 L 132,107 M 136,109 L 147,95 L 150,122";
// Each back plate closed into a triangle so the spikes colour in green too.
const PLATES_FILL =
  "M 90,104 L 103,86 L 108,102 Z M 114,102 L 127,85 L 132,107 Z M 136,109 L 147,95 L 150,122 Z";
const SPOT_1 = "M 86,132 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0";
const SPOT_2 = "M 116,138 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0";
// The scene: a ground line and a little fern.
const GROUND = "M 8,182 L 192,182";
const FERN = "M 26,182 Q 18,166 28,154 M 26,168 L 18,164 M 27,160 L 19,156";

export const dinosaur10: Animal = {
  id: "dinosaur-10",
  name: "Dinosaur",
  emoji: "🦕",
  level: 10,
  color: OUTLINE,
  viewBox: "0 0 200 200",
  steps: [
    { hint: "Draw a big round body 🦕", color: OUTLINE, strokes: [BODY] },
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
    { hint: "Add a long swishy tail", color: OUTLINE, strokes: [TAIL] },
    {
      hint: "Give it four chunky legs and feet",
      color: OUTLINE,
      strokes: [LEG_1, LEG_2, LEG_3, LEG_4],
    },
    { hint: "Add a little arm", color: OUTLINE, strokes: [ARM] },
    {
      hint: "Add bumpy plates along its back!",
      color: OUTLINE,
      strokes: [PLATES],
    },
    {
      hint: "Add an eye and spots 😄",
      color: OUTLINE,
      strokes: [EYE, SPOT_1, SPOT_2],
    },
    {
      hint: "Finish with the ground and a fern 🌿",
      color: OUTLINE,
      strokes: [GROUND, FERN],
    },
    {
      hint: "Now color it all in! 🖍️",
      color: OUTLINE,
      strokes: [],
      fills: [
        { d: TAIL, color: GREEN },
        { d: BODY, color: GREEN },
        { d: NECK_FILL, color: GREEN },
        { d: LEG_1, color: GREEN },
        { d: LEG_2, color: GREEN },
        { d: LEG_3, color: GREEN },
        { d: LEG_4, color: GREEN },
        { d: HEAD_UPPER, color: GREEN },
        { d: HEAD_LOWER, color: GREEN },
        { d: PLATES_FILL, color: GREEN },
        { d: SPOT_1, color: "#3a9e48" },
        { d: SPOT_2, color: "#3a9e48" },
        { d: UTEETH, color: "#ffffff" },
        { d: LTEETH, color: "#ffffff" },
        { d: EYE, color: "#3a2a20" },
      ],
    },
    nameStep("DINOSAUR", { baseline: 199, height: 13, gap: 0.28 }),
  ],
};
