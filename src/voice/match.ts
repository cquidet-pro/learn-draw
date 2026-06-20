// Word-boundary regexes are compiled once and cached. The matcher runs many
// times per second — on every interim speech result, across every command group
// (and every visible drawing name on the home page) — so reusing the compiled
// regexes keeps the hot path cheap and the voice response low-latency.
const reCache = new Map<string, RegExp>();

function wordRegex(word: string): RegExp {
  let re = reCache.get(word);
  if (re === undefined) {
    re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    reCache.set(word, re);
  }
  return re;
}

/** True if any of `words` appears as a whole word in the transcript. */
export function heardAny(transcript: string, words: string[]): boolean {
  for (let i = 0; i < words.length; i++) {
    if (wordRegex(words[i]).test(transcript)) return true;
  }
  return false;
}
