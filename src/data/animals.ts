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

/** Difficulty level, shown to the child as an age. */
export type Level = 5 | 7 | 10;

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
  /** Difficulty level (defaults to 5). More complex drawings come later. */
  level?: Level;
  /** For "Famous Paintings": the artist this sketch is inspired by. */
  artist?: string;
  /** A short, kid-friendly fun fact shown when the drawing is finished. */
  fact?: string;
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

/** Resolved difficulty level (drawings without an explicit level are level 5). */
export function drawingLevel(animal: Animal): Level {
  return animal.level ?? 5;
}

/** Drawings available at a given level. */
export function drawingsForLevel(level: Level): Animal[] {
  return animals.filter((a) => drawingLevel(a) === level);
}

/**
 * Pick the next drawing to auto-advance to after finishing one, from the given
 * pool (e.g. the animals at the current level, or the masterpieces): prefer one
 * that hasn't been done yet; if all are done, pick a random one. Never the one
 * we just finished, when avoidable.
 */
export function chooseNext(
  pool: Animal[],
  currentId: string,
  completed: Set<string>,
): Animal {
  const others = pool.filter((a) => a.id !== currentId);
  const undone = others.filter((a) => !completed.has(a.id));
  const choices = undone.length > 0 ? undone : others;
  if (choices.length === 0) {
    return pool.find((a) => a.id === currentId) ?? pool[0];
  }
  return choices[Math.floor(Math.random() * choices.length)];
}

/** Every stroke with its resolved color — used for the static card preview. */
export function previewStrokes(animal: Animal): { d: string; color: string }[] {
  return animal.steps.flatMap((step) =>
    step.strokes.map((d) => ({ d, color: step.color ?? animal.color })),
  );
}
