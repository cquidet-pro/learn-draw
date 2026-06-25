import type { Animal } from "./animals";
import { flags, withName, isFlag as isRegularFlag } from "./flags";
import { jerseyMbappe } from "./jersey";
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
]
  .map(withName)
  .sort((a, b) => a.name.localeCompare(b.name));

const newFlags = newWorldCupFlags;

const byId = (id: string): Animal | undefined =>
  flags.find((f) => f.id === id) ?? newFlags.find((f) => f.id === id);

// The 48 qualifiers (listed by confederation just for readability; the section
// itself is sorted alphabetically by country name below).
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

export const worldCupFlags: Animal[] = WC_ORDER.map(byId)
  .filter((f): f is Animal => Boolean(f))
  .sort((a, b) => a.name.localeCompare(b.name));

// Non-flag World Cup drawings (e.g. the player jersey). They live in the same
// section and animate like everything else, but aren't flags — so they don't
// count toward the football cups (which are for the flags).
export const worldCupExtras: Animal[] = [jerseyMbappe];

// Everything shown in the World Cup section, jerseys first, then the flags.
// This drives the gallery grid, the auto-advance pool and the deep links.
export const worldCupItems: Animal[] = [...worldCupExtras, ...worldCupFlags];

const wcIds = new Set(worldCupItems.map((f) => f.id));

/** A flag for the player's purposes — either a regular flag or a World Cup one
 *  (so new World-Cup-only countries still animate, auto-advance and count like
 *  flags). App and DrawingPlayer import this instead of flags.ts's isFlag. */
export function isFlag(id: string): boolean {
  return isRegularFlag(id) || wcIds.has(id);
}

export function isWorldCupFlag(id: string): boolean {
  return wcIds.has(id);
}

// "Football Cups" — a separate set of trophies you win ONLY by drawing World Cup
// flags (distinct from the animal-friend rewards earned across all drawings).
// They're earned trophies (shown on the sticker shelf), not drawings themselves.
export interface FootballCup {
  emoji: string;
  name: string;
  /** World Cup flags you must finish to win it. */
  need: number;
}
export const FOOTBALL_CUPS: FootballCup[] = [
  { emoji: "⚽", name: "Kickoff Cup", need: 10 },
  { emoji: "🥉", name: "Bronze Cup", need: 20 },
  { emoji: "🥈", name: "Silver Cup", need: 30 },
  { emoji: "🥇", name: "Gold Cup", need: 40 },
  { emoji: "🏆", name: "Champions Cup", need: worldCupFlags.length },
];

/** How many World Cup flags the child has finished — drives the football cups. */
export function worldCupDone(completed: Set<string>): number {
  return worldCupFlags.reduce((sum, f) => sum + (completed.has(f.id) ? 1 : 0), 0);
}
