import type { Animal } from "../animals";

// A more detailed kawaii long-necked dinosaur with a cute T-rex head, back
// plates and spots (level 7).
const OUTLINE = "#4f3a2c";
const GREEN = "#5bbf63";

const BODY = "M 60,130 a 46,28 0 1,0 92,0 a 46,28 0 1,0 -92,0";
// Neck: two lines rising straight UP from the body top to the head (no dip into
// the green body).
const NECK_L = "M 74,112 L 70,82 L 73,54";
const NECK_R = "M 92,104 L 91,80 L 90,52";
// Green column between the two neck lines so the neck colours in (was left white).
const NECK_FILL = "M 74,112 L 70,82 L 73,54 L 90,52 L 91,80 L 92,104 Z";
// Long T-rex head (snout pointing left), filled green; the open toothy mouth is
// drawn on top.
const HEAD =
  "M 90,44 Q 94,32 84,28 Q 70,22 56,28 Q 42,34 34,42 Q 30,46 34,49 L 60,47 L 90,44 L 62,51 L 40,53 Q 35,53 36,57 L 46,60 Q 68,66 88,56 Q 93,52 90,44 Z";
const MOUTH = "M 34,49 L 60,47 L 86,45 L 62,51 L 40,53 Q 35,52 35,50 Z";
const UTEETH = "M 42,47.5 L 45,52 L 48,47 Z M 52,47 L 55,51.5 L 58,46.5 Z";
const LTEETH = "M 45,52 L 48,48 L 51,52 Z M 56,51.5 L 59,47.5 L 62,51 Z";
const EYE = "M 64,35 a 3.2,3.2 0 1,0 6.4,0 a 3.2,3.2 0 1,0 -6.4,0";
const TAIL = "M 150,123 Q 178,123 186,148 Q 172,140 150,137 Z";
// Four chunky legs. Each is an OPEN path starting a couple of units INSIDE the
// body's lower edge (joins with no gap, no dark line across the belly), down one
// side, three little toes along a flat foot, then back up the other side.
const LEG_1 =
  "M 72,146.9 L 72,171 L 70,176 L 74,176 L 75,173 L 77,176 L 78,173 L 80,176 L 84,176 L 84,152.6";
const LEG_2 =
  "M 90,154.3 L 90,171 L 88,176 L 92,176 L 93,173 L 95,176 L 96,173 L 98,176 L 102,176 L 102,155.9";
const LEG_3 =
  "M 108,156 L 108,171 L 106,176 L 110,176 L 111,173 L 113,176 L 114,173 L 116,176 L 120,176 L 120,154.7";
const LEG_4 =
  "M 126,153.2 L 126,171 L 124,176 L 128,176 L 129,173 L 131,176 L 132,173 L 134,176 L 138,176 L 138,148.1";
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
        { d: HEAD, color: GREEN },
        { d: PLATES_FILL, color: GREEN },
        { d: SPOT_1, color: "#3a9e48" },
        { d: SPOT_2, color: "#3a9e48" },
        { d: MOUTH, color: "#5a3b2e" },
        { d: UTEETH, color: "#ffffff" },
        { d: LTEETH, color: "#ffffff" },
        { d: EYE, color: "#3a2a20" },
      ],
    },
  ],
};
