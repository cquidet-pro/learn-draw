import { useState } from "react";
import { useTimeLimit } from "./TimeLimitProvider";
import { PinPad } from "./PinPad";

/** Shown (while staying in fullscreen) when the child double-presses Escape.
 *  The grown-up enters the code to actually leave; "Keep drawing" stays put. */
export function ExitCodePrompt({ onCancel }: { onCancel: () => void }) {
  const { hasPin, verifyPin, setFsLock } = useTimeLimit();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="lock-overlay" role="dialog" aria-modal="true" aria-label="Exit full screen">
      <div className="lock-card">
        <div className="lock-emoji" aria-hidden="true">
          🔒
        </div>
        <h2>Exit full screen?</h2>
        {hasPin ? (
          <>
            <p>Enter the grown-up code to leave.</p>
            <PinPad
              onComplete={(code) =>
                verifyPin(code) ? setFsLock(false) : setError("Wrong code — try again")
              }
              error={error}
            />
          </>
        ) : (
          <button className="pill-btn lock-unlock" onClick={() => setFsLock(false)}>
            🔓 Exit full screen
          </button>
        )}
        <button className="tl-action" onClick={onCancel}>
          ✏️ Keep drawing
        </button>
      </div>
    </div>
  );
}
