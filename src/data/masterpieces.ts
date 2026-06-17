import type { Animal } from "./animals";
import { starryNight } from "./paintings/starry-night";
import { greatWave } from "./paintings/great-wave";
import { cubistFace } from "./paintings/cubist-face";
import { picassoPortrait } from "./paintings/picasso-portrait";

/** The "Famous Paintings" collection — simple sketches inspired by masterpieces. */
export const masterpieces: Animal[] = [
  starryNight,
  greatWave,
  cubistFace,
  picassoPortrait,
];

export function isMasterpiece(id: string): boolean {
  return masterpieces.some((m) => m.id === id);
}
