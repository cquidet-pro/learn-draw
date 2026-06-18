import { useCallback, useState } from "react";

/**
 * Owns the tutorial playback state: which step we're on and how fast the
 * strokes draw. Speed is expressed as the loop duration in seconds.
 */
export function useDrawingPlayer(stepCount: number) {
  const [stepIndex, setStepIndex] = useState(0);
  // Seconds for one draw loop. Lower = faster. Default ~7s — a calmer pace that
  // little hands can follow (about 30% slower than the old 5s default).
  const [duration, setDuration] = useState(7);
  // When paused, the current step's strokes freeze mid-draw instead of looping.
  const [paused, setPaused] = useState(false);

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
