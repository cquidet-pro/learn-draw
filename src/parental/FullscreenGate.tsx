import { useState } from "react";
import { useTimeLimit } from "./TimeLimitProvider";
import { PinPad } from "./PinPad";

/** Shown when the "keep full screen" lock is on but the app is not fullscreen
 *  (e.g. the child pressed Escape). Tapping returns to fullscreen; a grown-up
 *  can enter the PIN to turn the lock off and leave. */
export function FullscreenGate() {
  const { enterFullscreen, verifyPin, setFsLock } = useTimeLimit();
  const [entering, setEntering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="lock-overlay" role="dialog" aria-modal="true" aria-label="Full screen">
      <div className="lock-card">
        <div className="lock-emoji" aria-hidden="true">
          🖍️
        </div>
        <h2>Keep drawing!</h2>
        <p>Tap the button to go back to full screen.</p>
        <button className="pill-btn" onClick={enterFullscreen}>
          ▶ Back to full screen
        </button>
        {!entering ? (
          <button
            className="tl-action fsg-exit"
            onClick={() => {
              setEntering(true);
              setError(null);
            }}
          >
            Grown-up: exit
          </button>
        ) : (
          <>
            <p className="lock-prompt">Enter the 4-digit code to exit</p>
            <PinPad
              onComplete={(code) =>
                verifyPin(code) ? setFsLock(false) : setError("Wrong code — try again")
              }
              error={error}
            />
          </>
        )}
      </div>
    </div>
  );
}
