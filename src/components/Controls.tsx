interface Props {
  stepIndex: number;
  stepCount: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
  duration: number;
  onPrev: () => void;
  onNext: () => void;
  onSpeedChange: (duration: number) => void;
}

// Speed slider maps a 0..100 position to a loop duration. Left = slow turtle
// (10s), right = fast rabbit (2s). We invert so dragging right speeds up.
const SLOW = 10;
const FAST = 2;
const toDuration = (pct: number) => SLOW - (pct / 100) * (SLOW - FAST);
const toPct = (duration: number) => ((SLOW - duration) / (SLOW - FAST)) * 100;

export function Controls({
  stepIndex,
  stepCount,
  prevDisabled,
  nextDisabled,
  duration,
  onPrev,
  onNext,
  onSpeedChange,
}: Props) {
  return (
    <div className="controls">
      <div className="nav-row">
        <button
          className="big-btn"
          onClick={onPrev}
          disabled={prevDisabled}
          aria-label="Previous step"
        >
          ◀
        </button>

        <div className="step-indicator" aria-live="polite">
          Step {stepIndex + 1} / {stepCount}
        </div>

        <button
          className="big-btn"
          onClick={onNext}
          disabled={nextDisabled}
          aria-label="Next step"
        >
          ▶
        </button>
      </div>

      <div className="speed-row">
        <span className="speed-icon" aria-hidden="true">
          🐢
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={toPct(duration)}
          onChange={(e) => onSpeedChange(toDuration(Number(e.target.value)))}
          aria-label="Drawing speed"
        />
        <span className="speed-icon" aria-hidden="true">
          🐇
        </span>
      </div>

      <p className="hint-keys">
        Press <kbd>Space</kbd> for next, <kbd>←</kbd> to go back
      </p>
    </div>
  );
}
