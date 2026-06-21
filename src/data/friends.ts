import type { Animal } from "./animals";
import { cat } from "./drawings/cat";
import { dog } from "./drawings/dog";
import { horse } from "./drawings/horse";
import { dinosaur } from "./drawings/dinosaur";
import { mouse } from "./drawings/mouse";
import { hamster } from "./drawings/hamster";
import { bunny } from "./drawings/bunny";
import { fox } from "./drawings/fox";
import { pig } from "./drawings/pig";
import { cow } from "./drawings/cow";
import { elephant } from "./drawings/elephant";
import { whale } from "./drawings/whale";

// Each reward "animal friend" (by its REWARDS name) maps to a drawing the child
// can draw straight from the sticker shelf. Cat/Dog/Horse/Dinosaur reuse the
// real subjects; the rest are simple friend-only drawings. Pony reuses Horse.
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
  Horse: horse,
  Elephant: elephant,
  Whale: whale,
  Dinosaur: dinosaur,
};

// Drawings that exist ONLY as reward friends (not in the home grid, levels or
// progress). Completing one of these must not change level totals or the reward
// count, so it's never added to the persisted `completed` set.
const FRIEND_ONLY = [mouse, hamster, bunny, fox, pig, cow, elephant, whale];
const FRIEND_ONLY_IDS = new Set(FRIEND_ONLY.map((a) => a.id));

export function isFriendOnly(id: string): boolean {
  return FRIEND_ONLY_IDS.has(id);
}

/** Auto-advance pool for friend-only drawings: cycle among the friends. */
export const friendPool: Animal[] = FRIEND_ONLY;
