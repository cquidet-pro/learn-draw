import { dog } from "./drawings/dog";
import { cat } from "./drawings/cat";
import { horse } from "./drawings/horse";
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
import { popstar } from "./drawings/popstar";
import { popstar7 } from "./drawings/popstar-7";
import { popstar10 } from "./drawings/popstar-10";
import { heromask } from "./drawings/heromask";
import { heromask7 } from "./drawings/heromask-7";
import { heromask10 } from "./drawings/heromask-10";
import { dog7 } from "./drawings/dog-7";
import { cat7 } from "./drawings/cat-7";
import { horse7 } from "./drawings/horse-7";
import { fish7 } from "./drawings/fish-7";
import { butterfly7 } from "./drawings/butterfly-7";
import { flower7 } from "./drawings/flower-7";
import { house7 } from "./drawings/house-7";
import { hedgehog7 } from "./drawings/hedgehog-7";
import { dinosaur7 } from "./drawings/dinosaur-7";
import { tree7 } from "./drawings/tree-7";
import { sun7 } from "./drawings/sun-7";
import { rainbow7 } from "./drawings/rainbow-7";
import { cloud7 } from "./drawings/cloud-7";
import { star7 } from "./drawings/star-7";
import { heart7 } from "./drawings/heart-7";
import { car7 } from "./drawings/car-7";
import { family7 } from "./drawings/family-7";
import { princess7 } from "./drawings/princess-7";
import { dog10 } from "./drawings/dog-10";
import { cat10 } from "./drawings/cat-10";
import { horse10 } from "./drawings/horse-10";
import { hedgehog10 } from "./drawings/hedgehog-10";
import { fish10 } from "./drawings/fish-10";
import { dinosaur10 } from "./drawings/dinosaur-10";
import { butterfly10 } from "./drawings/butterfly-10";
import { flower10 } from "./drawings/flower-10";
import { tree10 } from "./drawings/tree-10";
import { sun10 } from "./drawings/sun-10";
import { rainbow10 } from "./drawings/rainbow-10";
import { cloud10 } from "./drawings/cloud-10";
import { star10 } from "./drawings/star-10";
import { heart10 } from "./drawings/heart-10";
import { car10 } from "./drawings/car-10";
import { family10 } from "./drawings/family-10";
import { princess10 } from "./drawings/princess-10";
import { house10 } from "./drawings/house-10";

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
  /**
   * Optional solid filled shapes painted *behind* this step's outline strokes,
   * for richer art (e.g. the kawaii princess: skin, hair, dress fills). Each
   * has its own fill color. Fills are not part of the printable coloring
   * outline — that uses only `strokes` — so filled drawings should also include
   * outline strokes for every shape worth tracing/coloring.
   */
  fills?: { d: string; color: string; paper?: boolean }[];
  /** Optional stroke width for this step's strokes (default 4). Thinner reads
   *  better for small lettering, e.g. the "write the name" finale. */
  strokeWidth?: number;
  /** Keep this colour step as ONE step (don't split it per colour). Use for
   *  layered emblems where the per-colour reordering would invert the authored
   *  stacking and paint a later colour over an emblem (e.g. flag coats of arms). */
  noSplit?: boolean;
}

/** Difficulty level, shown to the child as Easy (5) / Medium (7) / Harder (10). */
export type Level = 5 | 7 | 10;

/** A drawing the child can learn — an animal, object, or scene. */
export interface Animal {
  id: string;
  name: string;
  /** Emoji shown on the home card. */
  emoji: string;
  /**
   * Optional heading override for the player. When set, the title reads
   * "How to draw a <title>" (with the right a/an) instead of using `name`.
   * Flags use it so "France" shows as "How to draw a French flag".
   */
  title?: string;
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
  /** For "Famous Paintings": the real artwork to show side by side (public domain only). */
  image?: string;
  /**
   * "Pencil sketch, then color" mode: the outline strokes are drawn in a light
   * pencil color and only revealed in their real per-step colors once the final
   * "color it in" step is reached. Used by the masterpieces, whose colored
   * brushstrokes aren't closed fillable shapes.
   */
  colorReveal?: boolean;
  steps: DrawStep[];
}

/** All drawings available on the home screen. Add new ones here. */
export const animals: Animal[] = [
  dog,
  cat,
  horse,
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
  popstar,
  heromask,
  // Level 7 — more refined versions of the same subjects.
  dog7,
  cat7,
  horse7,
  fish7,
  butterfly7,
  flower7,
  house7,
  hedgehog7,
  dinosaur7,
  tree7,
  sun7,
  rainbow7,
  cloud7,
  star7,
  heart7,
  car7,
  family7,
  princess7,
  popstar7,
  heromask7,
  // Level 10 — even more detailed versions with little scenes.
  dog10,
  cat10,
  horse10,
  hedgehog10,
  fish10,
  dinosaur10,
  butterfly10,
  flower10,
  tree10,
  sun10,
  rainbow10,
  cloud10,
  star10,
  heart10,
  car10,
  family10,
  princess10,
  house10,
  popstar10,
  heromask10,
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

/** Friendly difficulty names, matching the level selector. */
export const LEVEL_LABEL: Record<Level, string> = {
  5: "Easy",
  7: "Medium",
  10: "Harder",
};

/** The level a child graduates to after clearing this one (top level has none). */
const NEXT_LEVEL: Partial<Record<Level, Level>> = { 5: 7, 7: 10 };

export interface NextUp {
  /** The drawing to auto-advance to. */
  animal: Animal;
  /** Set only when the child just cleared an entire level and is moving up —
   *  carries the friendly labels so we can congratulate them. */
  levelUp?: { from: string; to: string };
}

/**
 * Auto-advance for the regular (leveled) drawings. Stay within the current
 * level, always offering one the child hasn't finished yet; only once every
 * drawing in the level is done do we move up to the next level (with a
 * congratulations). At the top level we simply revisit within the level.
 */
export function chooseNextInLevels(
  current: Animal,
  completed: Set<string>,
): NextUp {
  const level = drawingLevel(current);
  const here = drawingsForLevel(level);
  const undone = here.filter((a) => a.id !== current.id && !completed.has(a.id));
  if (undone.length > 0) {
    return { animal: undone[Math.floor(Math.random() * undone.length)] };
  }

  // Level cleared — graduate to the next one if there is a harder level.
  const up = NEXT_LEVEL[level];
  if (up) {
    const upPool = drawingsForLevel(up);
    const upUndone = upPool.filter((a) => !completed.has(a.id));
    const choices = upUndone.length > 0 ? upUndone : upPool;
    return {
      animal: choices[Math.floor(Math.random() * choices.length)],
      levelUp: { from: LEVEL_LABEL[level], to: LEVEL_LABEL[up] },
    };
  }

  // Highest level fully done — keep them company with another from this level.
  return { animal: chooseNext(here, current.id, completed) };
}

/** Steps shown in the static card preview: everything up to and including the
 *  "color it in" reveal step. Steps after it (e.g. writing the name) are left
 *  out so the card doesn't show the name twice — once drawn, once as the label. */
function previewSteps(animal: Animal): DrawStep[] {
  const revealIndex = animal.steps.findIndex((s) => s.strokes.length === 0);
  return revealIndex >= 0 ? animal.steps.slice(0, revealIndex + 1) : animal.steps;
}

/** Every stroke with its resolved color and width — used for the static card
 *  preview, so finely-outlined drawings (e.g. the family) don't get a thick
 *  default line that swallows small details on the card. */
export function previewStrokes(
  animal: Animal,
): { d: string; color: string; strokeWidth: number }[] {
  return previewSteps(animal).flatMap((step) =>
    step.strokes.map((d) => ({
      d,
      color: step.color ?? animal.color,
      strokeWidth: step.strokeWidth ?? 4,
    })),
  );
}

/** Every filled shape (for drawings that use them) — painted behind the outline
 *  strokes in the static card preview, so colored art shows up on the home card. */
export function previewFills(animal: Animal): { d: string; color: string }[] {
  return previewSteps(animal).flatMap((step) => step.fills ?? []);
}
