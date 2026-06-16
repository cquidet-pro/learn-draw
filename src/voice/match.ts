/** True if any of `words` appears as a whole word in the transcript. */
export function heardAny(transcript: string, words: string[]): boolean {
  return words.some((w) =>
    new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(transcript),
  );
}
