// Sliding-window de-duplication for voice commands.
//
// The point is to absorb the SPEECH ENGINE's own stutter for a single spoken
// word: an interim result and its final, plus the auto-restart re-delivering the
// same word, all land within a few hundred milliseconds and would otherwise fire
// the command twice. The window must stay SHORT — long enough to swallow that
// machine echo, but well under the cadence of a child deliberately repeating a
// command ("next" … wait … "next"). At 2000ms it ate real repeats: a second,
// deliberate "next" a beat later was suppressed (and its words consumed, so it
// couldn't re-fire even after the window), which felt like the command getting
// stuck until you spammed "next next next" past it.
//
// Tune the window by changing this one constant; it's used everywhere voice
// commands are dispatched.
export const DEDUP_WINDOW_MS = 700;

/**
 * Remembers recently handled command keys and reports whether a key repeats
 * within the sliding window. One instance per listening session.
 *
 * `mark` is called only when a command is actually handled, so the window is
 * anchored to each real fire: after one "next" fires, further "next"s are
 * suppressed until DEDUP_WINDOW_MS has passed, then the next one fires again.
 */
export class CommandDeduper {
  private last = new Map<string, number>();

  constructor(private readonly windowMs: number = DEDUP_WINDOW_MS) {}

  /** True if `key` was handled within the window already (i.e. it's a repeat). */
  isDuplicate(key: string, now: number = Date.now()): boolean {
    const t = this.last.get(key);
    return t !== undefined && now - t < this.windowMs;
  }

  /** Record that `key` was just handled, starting/refreshing its window. */
  mark(key: string, now: number = Date.now()): void {
    this.last.set(key, now);
    // Drop entries that have aged out so the map can't grow over a long session.
    if (this.last.size > 32) {
      for (const [k, t] of this.last) {
        if (now - t >= this.windowMs) this.last.delete(k);
      }
    }
  }

  /** Forget all history — call when a fresh listening session begins. */
  reset(): void {
    this.last.clear();
  }
}
