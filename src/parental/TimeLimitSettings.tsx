import { useState } from "react";
import { useTimeLimit } from "./TimeLimitProvider";
import { PinPad } from "./PinPad";

interface Props {
  onClose: () => void;
}

const PRESETS = [0, 15, 30, 45, 60];

/** Grown-up time-limit settings, gated by a 4-digit PIN. First use creates the
 *  PIN (entered twice); after that it's required to open these settings. */
export function TimeLimitSettings({ onClose }: Props) {
  const {
    hasPin,
    setPin,
    verifyPin,
    limitMin,
    setLimit,
    usedSec,
    resetToday,
    fsLock,
    fsSupported,
    setFsLock,
  } = useTimeLimit();
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstEntry, setFirstEntry] = useState<string | null>(null);
  const [changing, setChanging] = useState(false);

  let body: React.ReactNode;

  if (!authed && !hasPin) {
    // Create a new PIN: enter it, then confirm.
    const onCreate = (code: string) => {
      if (firstEntry == null) {
        setFirstEntry(code);
        setError(null);
      } else if (firstEntry === code) {
        setPin(code);
        setAuthed(true);
      } else {
        setFirstEntry(null);
        setError("Codes didn't match — start again");
      }
    };
    body = (
      <>
        <h2>Set a grown-up code 🔒</h2>
        <p>{firstEntry == null ? "Make up a 4-digit code" : "Enter it again to confirm"}</p>
        <PinPad key={firstEntry == null ? "first" : "confirm"} onComplete={onCreate} error={error} />
      </>
    );
  } else if (!authed) {
    // Verify existing PIN.
    body = (
      <>
        <h2>Grown-up code 🔒</h2>
        <p>Enter your 4-digit code to change the time limit</p>
        <PinPad
          onComplete={(c) => (verifyPin(c) ? setAuthed(true) : setError("Wrong code"))}
          error={error}
        />
      </>
    );
  } else {
    // Authenticated: the actual settings.
    body = (
      <>
        <h2>⏱️ Daily time limit</h2>
        <div className="tl-presets">
          {PRESETS.map((m) => (
            <button
              key={m}
              className={m === limitMin ? "tl-preset on" : "tl-preset"}
              onClick={() => setLimit(m)}
            >
              {m === 0 ? "Off" : `${m} min`}
            </button>
          ))}
        </div>
        <p className="tl-used">
          Used today: <b>{Math.floor(usedSec / 60)} min</b>
          {limitMin > 0 ? ` of ${limitMin} min` : " (no limit set)"}
        </p>

        <div className="tl-fs-row">
          <span>🖥️ Keep full screen</span>
          <button
            className={fsLock ? "tl-toggle on" : "tl-toggle"}
            disabled={!fsSupported}
            onClick={() => setFsLock(!fsLock)}
          >
            {fsLock ? "On" : "Off"}
          </button>
        </div>
        {!fsSupported && (
          <p className="tl-note">Full screen isn't supported on this device.</p>
        )}

        <div className="tl-actions">
          <button className="tl-action" onClick={resetToday}>
            ↺ Reset today's timer
          </button>
          <button className="tl-action" onClick={() => setChanging((v) => !v)}>
            🔑 Change code
          </button>
        </div>
        {changing && (
          <>
            <p>Enter a new 4-digit code</p>
            <PinPad
              onComplete={(c) => {
                setPin(c);
                setChanging(false);
              }}
            />
          </>
        )}
        <button className="pill-btn tl-done" onClick={onClose}>
          Done
        </button>
      </>
    );
  }

  return (
    <div className="tl-modal-scrim" onClick={onClose}>
      <div className="tl-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tl-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        {body}
      </div>
    </div>
  );
}
