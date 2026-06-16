import { useCallback, useState } from "react";

/**
 * Owns the tutorial playback state: which step we're on and how fast the
 * strokes draw. Speed is expressed as the loop duration in seconds.
 */
export function useDrawingPlayer(stepCount: number) {
  const [stepIndex, setStepIndex] = useState(0);
  // Seconds for one draw loop. Lower = faster. Default ~5s as requested.
  const [duration, setDuration] = useState(5);

  const next = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, stepCount - 1));
  }, [stepCount]);

  const prev = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => setStepIndex(0), []);

  return {
    stepIndex,
    duration,
    setDuration,
    next,
    prev,
    reset,
    isFirst: stepIndex === 0,
    isLast: stepIndex === stepCount - 1,
  };
}
