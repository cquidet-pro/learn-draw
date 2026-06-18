import { useState } from "react";
import { useTimeLimit } from "./TimeLimitProvider";
import { PinPad } from "./PinPad";

/** Full-screen grey lock shown when the daily time limit is reached. Entering
 *  the grown-up PIN gives back today's time and dismisses the lock. */
export function LockOverlay() {
  const { verifyPin, resetToday } = useTimeLimit();
  const [entering, setEntering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onComplete = (code: string) => {
    if (verifyPin(code)) {
      resetToday(); // unlocks: locked becomes false, overlay unmounts
    } else {
      setError("Wrong code — try again");
    }
  };

  return (
    <div className="lock-overlay" role="dialog" aria-modal="true" aria-label="Time's up">
      <div className="lock-card">
        <div className="lock-emoji" aria-hidden="true">
          ⏰
        </div>
        <h2>Time's up!</h2>
        <p>Great drawing today! Ask a grown-up if you'd like to keep going.</p>
        {!entering ? (
          <button
            className="pill-btn lock-unlock"
            onClick={() => {
              setEntering(true);
              setError(null);
            }}
          >
            🔓 Grown-up code
          </button>
        ) : (
          <>
            <p className="lock-prompt">Enter the 4-digit code</p>
            <PinPad onComplete={onComplete} error={error} />
          </>
        )}
      </div>
    </div>
  );
}
