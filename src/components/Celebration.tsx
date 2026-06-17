import { useEffect, useState } from "react";

interface Props {
  animalName: string;
  /** Name/emoji of the drawing we'll auto-advance to. */
  nextName: string;
  nextEmoji: string;
  /** Start the next drawing now (also fired automatically when the timer ends). */
  onAutoNext: () => void;
  /** Go back to the home screen to pick another drawing. */
  onAgain: () => void;
  /** Replay the same drawing from step 1. */
  onWatchAgain: () => void;
  /** Dismiss the celebration and return to the last step (e.g. opened by mistake). */
  onBack: () => void;
}

const COUNTDOWN = 10;

// Firework bursts at varied positions, colors, and timings.
const BURSTS = [
  { left: "22%", top: "28%", color: "#ef476f", delay: "0s" },
  { left: "72%", top: "22%", color: "#ffd166", delay: "0.45s" },
  { left: "48%", top: "14%", color: "#06d6a0", delay: "0.9s" },
  { left: "82%", top: "52%", color: "#118ab2", delay: "1.15s" },
  { left: "16%", top: "58%", color: "#9b5de5", delay: "0.65s" },
  { left: "58%", top: "46%", color: "#ff7b00", delay: "1.45s" },
];

export function Celebration({
  animalName,
  nextName,
  nextEmoji,
  onAutoNext,
  onAgain,
  onWatchAgain,
  onBack,
}: Props) {
  const [secs, setSecs] = useState(COUNTDOWN);

  // Tick down once a second; when it hits zero, auto-advance to the next drawing.
  useEffect(() => {
    if (secs <= 0) {
      onAutoNext();
      return;
    }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs, onAutoNext]);

  return (
    <div className="celebration" role="dialog" aria-live="assertive">
      <div className="fireworks" aria-hidden="true">
        {BURSTS.map((b, i) => (
          <span
            key={i}
            className="firework"
            style={{
              left: b.left,
              top: b.top,
              color: b.color,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      <div className="celebration-card">
        <button
          className="celebration-close"
          onClick={onBack}
          aria-label="Go back to the drawing"
        >
          ✕
        </button>
        <div className="celebration-emoji" aria-hidden="true">
          🎉🌟🎨
        </div>
        <h2>You did it!</h2>
        <p>
          You drew a <strong>{animalName}</strong>! 🥳
        </p>

        <div className="celebration-buttons">
          <button className="home-btn big next-btn" onClick={onAutoNext}>
            <span>
              Next: {nextEmoji} {nextName}
            </span>
            <span className="next-count" aria-live="polite">
              starting in {secs}s
            </span>
          </button>
          <button className="ghost-btn" onClick={onAgain}>
            🎨 Pick another
          </button>
          <button className="ghost-btn" onClick={onWatchAgain}>
            ↺ Watch again
          </button>
        </div>
      </div>
    </div>
  );
}
