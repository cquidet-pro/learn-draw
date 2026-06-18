interface Props {
  stepIndex: number;
  stepCount: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
  duration: number;
  paused: boolean;
  pauseDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSpeedChange: (duration: number) => void;
  onTogglePause: () => void;
}

// Speed slider maps a 0..100 position to a loop duration. Left = slow turtle
// (40s), right = fast rabbit (2s). We invert so dragging right speeds up.
const SLOW = 40;
const FAST = 2;
const toDuration = (pct: number) => SLOW - (pct / 100) * (SLOW - FAST);
const toPct = (duration: number) => ((SLOW - duration) / (SLOW - FAST)) * 100;

export function Controls({
  stepIndex,
  stepCount,
  prevDisabled,
  nextDisabled,
  duration,
  paused,
  pauseDisabled,
  onPrev,
  onNext,
  onSpeedChange,
  onTogglePause,
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
        <button
          className={paused ? "pause-btn paused" : "pause-btn"}
          onClick={onTogglePause}
          disabled={pauseDisabled}
          aria-label={paused ? "Play the drawing" : "Pause the drawing"}
          aria-pressed={paused}
        >
          {paused ? "▶️" : "⏸️"}
        </button>
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
