import type { Animal } from "../animals";

// A more detailed kawaii long-necked dinosaur with a cute T-rex head, back
// plates and spots (level 7).
const OUTLINE = "#4f3a2c";
const GREEN = "#5bbf63";

const BODY = "M 60,130 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0";
// Neck: two lines rising straight UP from the body top to the head (no dip into
// the green body).
// The neck lines bottom out exactly ON the body's top outline (109.9 / 103.3) so
// their round caps merge into it instead of poking a knob into the green body;
// the top of the left line stops at the lower jaw's underside (y67) so it doesn't
// poke into the open mouth. NECK_FILL still reaches inside, no gap.
const NECK_L = "M 74,109.9 L 70,82 L 72,67";
const NECK_R = "M 92,103.3 L 91,80 L 90,52";
// Green column between the two neck lines so the neck colours in (was left white).
const NECK_FILL = "M 74,112 L 70,82 L 73,54 L 90,52 L 91,80 L 92,104 Z";
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
const TAIL = "M 150,123 Q 178,123 186,148 Q 172,140 150,137 Z";
// Four chunky legs. Each is an OPEN path whose two top endpoints sit exactly ON
// the body's lower outline (so the round caps merge into it — no knob in the
// belly, no white gap), down one side, three little toes along a flat foot, then
// back up the other side.
const LEG_1 =
  "M 72,148.9 L 72,171 L 70,176 L 74,176 L 75,173 L 77,176 L 78,173 L 80,176 L 84,176 L 84,154.6";
const LEG_2 =
  "M 90,156.3 L 90,171 L 88,176 L 92,176 L 93,173 L 95,176 L 96,173 L 98,176 L 102,176 L 102,157.9";
const LEG_3 =
  "M 108,158 L 108,171 L 106,176 L 110,176 L 111,173 L 113,176 L 114,173 L 116,176 L 120,176 L 120,156.7";
const LEG_4 =
  "M 126,155.2 L 126,171 L 124,176 L 128,176 L 129,173 L 131,176 L 132,173 L 134,176 L 138,176 L 138,150.1";
// Back plates and dark-green spots (kept from the original level-7 design).
const PLATES =
  "M 90,106 L 103,88 L 108,104 M 114,104 L 127,87 L 132,109 M 136,111 L 147,97 L 150,124";
// Each back plate closed into a triangle so the spikes colour in green too.
const PLATES_FILL =
  "M 90,106 L 103,88 L 108,104 Z M 114,104 L 127,87 L 132,109 Z M 136,111 L 147,97 L 150,124 Z";
const SPOT_1 = "M 86,134 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0";
const SPOT_2 = "M 116,140 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0";

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
      hint: "Add bumpy plates along its back!",
      color: OUTLINE,
      strokes: [PLATES],
    },
    {
      hint: "Finish with an eye and spots 😄",
      color: OUTLINE,
      strokes: [EYE, SPOT_1, SPOT_2],
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
  ],
};
