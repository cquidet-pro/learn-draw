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
const NECK_L = "M 74,110 L 70,82 L 73,54";
const NECK_R = "M 92,102 L 91,80 L 90,52";
// Long T-rex head (snout pointing left), filled green; the open toothy mouth is
// drawn on top.
const HEAD =
  "M 90,44 Q 94,32 84,28 Q 70,22 56,28 Q 42,34 34,42 Q 30,46 34,49 L 60,47 L 90,44 L 62,51 L 40,53 Q 35,53 36,57 L 46,60 Q 68,66 88,56 Q 93,52 90,44 Z";
const MOUTH = "M 34,49 L 60,47 L 86,45 L 62,51 L 40,53 Q 35,52 35,50 Z";
const UTEETH = "M 42,47.5 L 45,52 L 48,47 Z M 52,47 L 55,51.5 L 58,46.5 Z";
const LTEETH = "M 45,52 L 48,48 L 51,52 Z M 56,51.5 L 59,47.5 L 62,51 Z";
const EYE = "M 64,35 a 3.2,3.2 0 1,0 6.4,0 a 3.2,3.2 0 1,0 -6.4,0";
const TAIL = "M 150,121 Q 178,121 186,146 Q 172,138 150,135 Z";
const ARM = "M 80,116 Q 70,122 70,130";
// Four chunky legs that flare into real feet and stand ON the ground line at
// y=182 (feet bottoms reach down to the ground).
const LEG_1 =
  "M 73,148 L 73,170 Q 70,179 66,180 Q 66,182 74.0,182 Q 74.0,179.5 74.0,182 Q 82.0,182 82.0,182 Q 82.0,179.5 82.0,182 Q 90,182 90,179 Q 89,179 87,170 L 87,148 Z";
const LEG_2 =
  "M 94,152 L 94,170 Q 91,179 87,180 Q 87,182 95.0,182 Q 95.0,179.5 95.0,182 Q 103.0,182 103.0,182 Q 103.0,179.5 103.0,182 Q 111,182 111,179 Q 110,179 108,170 L 108,152 Z";
const LEG_3 =
  "M 114,152 L 114,170 Q 111,179 107,180 Q 107,182 115.0,182 Q 115.0,179.5 115.0,182 Q 123.0,182 123.0,182 Q 123.0,179.5 123.0,182 Q 131,182 131,179 Q 130,179 128,170 L 128,152 Z";
const LEG_4 =
  "M 135,148 L 135,170 Q 132,179 128,180 Q 128,182 136.0,182 Q 136.0,179.5 136.0,182 Q 144.0,182 144.0,182 Q 144.0,179.5 144.0,182 Q 152,182 152,179 Q 151,179 149,170 L 149,148 Z";
// Back plates and dark-green spots (kept from the original level-10 design).
const PLATES =
  "M 90,104 L 103,86 L 108,102 M 114,102 L 127,85 L 132,107 M 136,109 L 147,95 L 150,122";
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
      strokes: [NECK_L, NECK_R, HEAD],
    },
    {
      hint: "Open its mouth with pointy teeth! 🦷",
      color: OUTLINE,
      strokes: [MOUTH, UTEETH, LTEETH],
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
        { d: LEG_1, color: GREEN },
        { d: LEG_2, color: GREEN },
        { d: LEG_3, color: GREEN },
        { d: LEG_4, color: GREEN },
        { d: HEAD, color: GREEN },
        { d: SPOT_1, color: "#3a9e48" },
        { d: SPOT_2, color: "#3a9e48" },
        { d: MOUTH, color: "#5a3b2e" },
        { d: UTEETH, color: "#ffffff" },
        { d: LTEETH, color: "#ffffff" },
        { d: EYE, color: "#3a2a20" },
      ],
    },
    nameStep("DINOSAUR", { baseline: 199, height: 13, gap: 0.28 }),
  ],
};
