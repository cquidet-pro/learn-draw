import type { Animal } from "./animals";
import { flags, withName, isFlag as isRegularFlag } from "./flags";
import { afcFlags } from "./worldcup/afc";
import { caf1Flags } from "./worldcup/caf1";
import { caf2Flags } from "./worldcup/caf2";
import { concacafFlags } from "./worldcup/concacaf";
import { conmebolFlags } from "./worldcup/conmebol";
import { uefaFlags } from "./worldcup/uefa";

// The 2026 FIFA World Cup qualifiers, as a "World Cup Flags" section that lives
// next to the regular Flags section (it doesn't replace it). 18 of the 48 already
// exist in flags.ts; the other 30 are the new per-confederation files, finished
// with the same `withName` mapper so they get the "write the name" step + title.

// The 30 NEW flags (countries we didn't already have), finished with withName.
// Exported so the sticker shelf can show them as their own "World Cup" group
// WITHOUT double-counting the 18 qualifiers that are already in the Flags group.
export const newWorldCupFlags: Animal[] = [
  ...afcFlags,
  ...caf1Flags,
  ...caf2Flags,
  ...concacafFlags,
  ...conmebolFlags,
  ...uefaFlags,
].map(withName);

const newFlags = newWorldCupFlags;

const byId = (id: string): Animal | undefined =>
  flags.find((f) => f.id === id) ?? newFlags.find((f) => f.id === id);

// The 48 qualifiers, grouped by confederation in the order published.
const WC_ORDER = [
  // AFC
  "flag-australia", "flag-iran", "flag-iraq", "flag-japan", "flag-jordan",
  "flag-qatar", "flag-saudi-arabia", "flag-south-korea", "flag-uzbekistan",
  // CAF
  "flag-algeria", "flag-cape-verde", "flag-dr-congo", "flag-egypt", "flag-ghana",
  "flag-ivory-coast", "flag-morocco", "flag-senegal", "flag-south-africa", "flag-tunisia",
  // CONCACAF
  "flag-canada", "flag-curacao", "flag-haiti", "flag-mexico", "flag-panama", "flag-united-states",
  // CONMEBOL
  "flag-argentina", "flag-brazil", "flag-colombia", "flag-ecuador", "flag-paraguay", "flag-uruguay",
  // OFC
  "flag-new-zealand",
  // UEFA
  "flag-austria", "flag-belgium", "flag-bosnia-and-herzegovina", "flag-croatia",
  "flag-czech-republic", "flag-england", "flag-france", "flag-germany", "flag-netherlands",
  "flag-norway", "flag-portugal", "flag-scotland", "flag-spain", "flag-sweden",
  "flag-switzerland", "flag-turkey",
];

export const worldCupFlags: Animal[] = WC_ORDER.map(byId).filter(
  (f): f is Animal => Boolean(f),
);

const wcIds = new Set(worldCupFlags.map((f) => f.id));

/** A flag for the player's purposes — either a regular flag or a World Cup one
 *  (so new World-Cup-only countries still animate, auto-advance and count like
 *  flags). App and DrawingPlayer import this instead of flags.ts's isFlag. */
export function isFlag(id: string): boolean {
  return isRegularFlag(id) || wcIds.has(id);
}

export function isWorldCupFlag(id: string): boolean {
  return wcIds.has(id);
}
