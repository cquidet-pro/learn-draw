import { animals } from "./animals";
import { masterpieces } from "./masterpieces";

export interface Reward {
  emoji: string;
  name: string;
}

// Milestone "animal friend" rewards: a new companion every 10 drawings, growing
// from a tiny mouse all the way up to an enormous dinosaur. Listed smallest →
// biggest so they visibly grow.
export const REWARDS: Reward[] = [
  { emoji: "🐭", name: "Mouse" },
  { emoji: "🐱", name: "Cat" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🐴", name: "Pony" },
  { emoji: "🐎", name: "Horse" },
  { emoji: "🐳", name: "Whale" },
  { emoji: "🦕", name: "Dinosaur" },
];

// Every drawing the child can complete (all levels + the famous paintings).
export const TOTAL_DRAWINGS = animals.length + masterpieces.length;

export interface RewardTier extends Reward {
  /** Drawings needed to unlock. The biggest friend is capped at the whole
   *  collection so it's always earnable as the grand prize. */
  need: number;
  /** Relative display size, so friends visibly grow from small to big. */
  size: number;
}

/** The reward shelf with concrete unlock thresholds for the given collection. */
export function rewardTiers(totalAll: number = TOTAL_DRAWINGS): RewardTier[] {
  return REWARDS.map((r, i) => ({
    ...r,
    need: Math.min((i + 1) * 10, totalAll),
    size: 1.7 + i * 0.32,
  }));
}

/**
 * The friend *just* unlocked by reaching `totalDone` drawings — i.e. this count
 * lands exactly on a milestone. Returns undefined between milestones, so the
 * celebration only shows a reward at the moment it's earned.
 */
export function rewardJustUnlocked(
  totalDone: number,
  totalAll: number = TOTAL_DRAWINGS,
): RewardTier | undefined {
  return rewardTiers(totalAll).find((r) => r.need === totalDone);
}
