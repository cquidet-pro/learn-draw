import { dog } from "./drawings/dog";
import { cat } from "./drawings/cat";
import { hedgehog } from "./drawings/hedgehog";
import { fish } from "./drawings/fish";
import { dinosaur } from "./drawings/dinosaur";
import { butterfly } from "./drawings/butterfly";
import { sun } from "./drawings/sun";
import { rainbow } from "./drawings/rainbow";
import { cloud } from "./drawings/cloud";
import { flower } from "./drawings/flower";
import { tree } from "./drawings/tree";
import { house } from "./drawings/house";
import { car } from "./drawings/car";
import { star } from "./drawings/star";
import { heart } from "./drawings/heart";
import { family } from "./drawings/family";
import { princess } from "./drawings/princess";

/** A single tutorial step. */
export interface DrawStep {
  /**
   * SVG path `d` strings introduced at this step. These are the strokes that
   * "draw themselves" (animate) while this step is on screen. Strokes from
   * earlier steps are shown static/faded so the picture builds up.
   */
  strokes: string[];
  /** Friendly hint shown big to the child, e.g. "Now add the ears!" */
  hint: string;
  /** Optional stroke color for this step's strokes, overriding the base color
   *  (used by multi-color drawings like the rainbow or a flower). */
  color?: string;
}

/** A drawing the child can learn — an animal, object, or scene. */
export interface Animal {
  id: string;
  name: string;
  /** Emoji shown on the home card. */
  emoji: string;
  /** SVG viewBox, e.g. "0 0 200 200". */
  viewBox: string;
  /** Base stroke color (per-step `color` can override it). */
  color: string;
  steps: DrawStep[];
}

/** All drawings available on the home screen. Add new ones here. */
export const animals: Animal[] = [
  dog,
  cat,
  hedgehog,
  fish,
  dinosaur,
  butterfly,
  flower,
  tree,
  sun,
  rainbow,
  cloud,
  star,
  heart,
  house,
  car,
  family,
  princess,
];

export function getAnimal(id: string): Animal | undefined {
  return animals.find((a) => a.id === id);
}

/** Every stroke with its resolved color — used for the static card preview. */
export function previewStrokes(animal: Animal): { d: string; color: string }[] {
  return animal.steps.flatMap((step) =>
    step.strokes.map((d) => ({ d, color: step.color ?? animal.color })),
  );
}
