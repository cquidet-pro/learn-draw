import { useEffect } from "react";

// Minimal shapes for the Screen Wake Lock API (not in every TS DOM lib yet).
interface WakeLockSentinelLike {
  release(): Promise<void>;
  addEventListener(type: "release", cb: () => void): void;
}
interface WakeLockLike {
  request(type: "screen"): Promise<WakeLockSentinelLike>;
}

/**
 * Keeps the screen awake while `active` is true — like a video player — so the
 * laptop doesn't dim or sleep while a drawing animates and the child watches
 * without touching anything.
 *
 * Uses the Screen Wake Lock API (Chrome/Edge/Safari 16.4+). The lock is released
 * automatically by the browser when the tab is hidden, so we re-acquire it when
 * the page becomes visible again. No-ops gracefully where unsupported.
 */
export function useWakeLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const wakeLock = (navigator as unknown as { wakeLock?: WakeLockLike })
      .wakeLock;
    if (!wakeLock) return; // unsupported browser

    let sentinel: WakeLockSentinelLike | null = null;
    let cancelled = false;

    const acquire = async () => {
      // Requesting only makes sense (and only succeeds) while visible.
      if (document.visibilityState !== "visible") return;
      try {
        const s = await wakeLock.request("screen");
        if (cancelled) {
          s.release().catch(() => {});
          return;
        }
        sentinel = s;
        // The browser drops the lock on tab-hide; clear our handle so the
        // visibility handler knows to re-acquire.
        s.addEventListener("release", () => {
          sentinel = null;
        });
      } catch {
        /* request can reject (low battery, not visible, …) — ignore */
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !sentinel) acquire();
    };

    acquire();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      sentinel?.release().catch(() => {});
      sentinel = null;
    };
  }, [active]);
}
