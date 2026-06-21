// Sliding-window de-duplication for voice commands.
//
// Speech recognition (and excited kids) can repeat the same word in a quick
// burst — "next next" — which we don't want to act on twice. Saying the same
// command again within DEDUP_WINDOW_MS is treated as a single command.
//
// Tune the window by changing this one constant; it's used everywhere voice
// commands are dispatched.
export const DEDUP_WINDOW_MS = 2000;

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
