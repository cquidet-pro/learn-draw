import type { Animal } from "./animals";
import { cat } from "./drawings/cat";
import { dog } from "./drawings/dog";
import { horse } from "./drawings/horse";
import { horse10 } from "./drawings/horse-10";
import { dinosaur } from "./drawings/dinosaur";
import { dinosaur10 } from "./drawings/dinosaur-10";
import { mouse } from "./drawings/mouse";
import { hamster } from "./drawings/hamster";
import { bunny } from "./drawings/bunny";
import { fox } from "./drawings/fox";
import { pig } from "./drawings/pig";
import { cow } from "./drawings/cow";
import { elephant } from "./drawings/elephant";
import { whale } from "./drawings/whale";

void dinosaur; // (kept for reference — the dino friend now uses a blue variant)

/** Copy a drawing with its fill colours remapped (outline/strokes untouched). */
function recolorFills(a: Animal, map: Record<string, string>, id: string): Animal {
  return {
    ...a,
    id,
    steps: a.steps.map((s) => ({
      ...s,
      fills: s.fills?.map((f) => ({ ...f, color: map[f.color.toLowerCase()] ?? f.color })),
    })),
  };
}

// The dinosaur sticker is a BLUE dinosaur, so it matches the friend shelf — the
// hard dinosaur with its greens swapped for blues (kept friend-only below).
const dinosaurBlue = recolorFills(
  dinosaur10,
  { "#5bbf63": "#4aa3df", "#3a9e48": "#2e86c1" },
  "dinosaur-blue",
);

// Each reward "animal friend" (by its REWARDS name) maps to a drawing the child
// can draw straight from the sticker shelf. Cat/Dog reuse the easy subjects;
// Pony reuses the easy Horse, the Horse sticker is the HARD horse, and the
// Dinosaur sticker is the hard dinosaur recoloured blue. The rest are
// simple friend-only drawings.
export const FRIEND_DRAWINGS: Record<string, Animal> = {
  Mouse: mouse,
  Hamster: hamster,
  Bunny: bunny,
  Cat: cat,
  Fox: fox,
  Dog: dog,
  Pig: pig,
  Pony: horse,
  Cow: cow,
  Horse: horse10,
  Elephant: elephant,
  Whale: whale,
  Dinosaur: dinosaurBlue,
};

// Drawings that exist ONLY as reward friends (not in the home grid, levels or
// progress). Completing one of these must not change level totals or the reward
// count, so it's never added to the persisted `completed` set.
const FRIEND_ONLY = [mouse, hamster, bunny, fox, pig, cow, elephant, whale, dinosaurBlue];
const FRIEND_ONLY_IDS = new Set(FRIEND_ONLY.map((a) => a.id));

export function isFriendOnly(id: string): boolean {
  return FRIEND_ONLY_IDS.has(id);
}

/** Auto-advance pool for friend-only drawings: cycle among the friends. */
export const friendPool: Animal[] = FRIEND_ONLY;
