import { useCallback, useState } from "react";

// Chosen drawing speed (seconds to draw ONE stroke) persists across pictures,
// so a speed picked on one drawing carries over to the next one the child opens.
// Key is versioned because the meaning changed from per-loop to per-stroke.
const SPEED_KEY = "learn-draw:speed-v2";
const DEFAULT_DURATION = 3; // seconds per stroke — strokes now draw one at a time

function loadDuration(): number {
  const n = Number(localStorage.getItem(SPEED_KEY));
  // Keep within the slider's range (1s fast … 8s slow); fall back to default.
  return Number.isFinite(n) && n >= 1 && n <= 8 ? n : DEFAULT_DURATION;
}

/**
 * Owns the tutorial playback state: which step we're on and how fast the
 * strokes draw. Speed is expressed as the loop duration in seconds.
 */
export function useDrawingPlayer(stepCount: number) {
  const [stepIndex, setStepIndex] = useState(0);
  // Seconds for one draw loop. Lower = faster. Remembered from last time.
  const [duration, setDurationState] = useState<number>(loadDuration);
  // When paused, the current step's strokes freeze mid-draw instead of looping.
  const [paused, setPaused] = useState(false);

  const setDuration = useCallback((d: number) => {
    setDurationState(d);
    try {
      localStorage.setItem(SPEED_KEY, String(d));
    } catch {
      /* ignore storage errors (e.g. private mode) */
    }
  }, []);

  const next = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, stepCount - 1));
  }, [stepCount]);

  const prev = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => setStepIndex(0), []);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  return {
    stepIndex,
    duration,
    setDuration,
    paused,
    setPaused,
    togglePause,
    next,
    prev,
    reset,
    isFirst: stepIndex === 0,
    isLast: stepIndex === stepCount - 1,
  };
}
