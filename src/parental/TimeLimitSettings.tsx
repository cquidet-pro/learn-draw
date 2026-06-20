import { useState } from "react";
import { useTimeLimit } from "./TimeLimitProvider";
import { PinPad } from "./PinPad";

interface Props {
  onClose: () => void;
}

const PRESETS = [0, 15, 30, 45, 60];

/**
 * Grown-up time-limit settings. By default the panel opens straight away — no
 * code needed. The grown-up can tick "Lock settings with a code" to protect it;
 * the code is only asked for when they press Done. A code is also required (and
 * so requested on Done) whenever a time limit or the full-screen lock is on,
 * since those unlock screens ask for it. Re-opening asks for the code only when
 * there's something to protect — i.e. a time limit or full-screen lock is
 * active; otherwise the panel opens straight away even if a code is set.
 */
export function TimeLimitSettings({ onClose }: Props) {
  const {
    hasPin,
    setPin,
    clearPin,
    verifyPin,
    limitMin,
    setLimit,
    usedSec,
    resetToday,
    fsLock,
    fsSupported,
    setFsLock,
    fewScreen,
    setFewScreen,
  } = useTimeLimit();

  // "verify" → enter existing code to open; "settings" → the panel; "create" →
  // set a (new) code, confirmed on Done.
  // We only gate opening with the code when there's actually something to
  // protect — an active time limit or full-screen lock. With neither on (even
  // if "lock with a code" is ticked), the panel holds nothing a child could
  // misuse, so there's no point asking for the code each time.
  const guardOpen = hasPin && (limitMin > 0 || fsLock);
  const [mode, setMode] = useState<"verify" | "settings" | "create">(
    guardOpen ? "verify" : "settings",
  );
  const [error, setError] = useState<string | null>(null);
  const [firstEntry, setFirstEntry] = useState<string | null>(null);
  // The grown-up's intent for the "lock settings" toggle (starts from reality).
  const [lockChecked, setLockChecked] = useState(hasPin);
  const [changeCode, setChangeCode] = useState(false);

  // The "lock settings with a code" toggle is entirely optional — a time limit
  // or full-screen lock works without one (those screens just unlock with a
  // plain grown-up button when no code is set).
  const lockOn = lockChecked;

  // Leaving the settings: capture a new code if one is now needed (which keeps
  // a time limit / full-screen lock from being un-unlockable), drop the code if
  // the lock was switched off, otherwise just close.
  const commitAndClose = () => {
    if (lockOn && (!hasPin || changeCode)) {
      setFirstEntry(null);
      setError(null);
      setMode("create");
      return;
    }
    if (!lockOn && hasPin) clearPin();
    onClose();
  };

  // The ✕ and tapping outside: in "create" step back to the settings (so you
  // can't slip out leaving a lock with no code); in "verify" just close (no
  // changes were made); in "settings" reconcile like Done.
  const dismiss = () => {
    if (mode === "create") {
      setMode("settings");
      setFirstEntry(null);
      setError(null);
    } else if (mode === "verify") {
      onClose();
    } else {
      commitAndClose();
    }
  };

  let body: React.ReactNode;

  if (mode === "verify") {
    body = (
      <>
        <h2>Grown-up code 🔒</h2>
        <p>Enter your 4-digit code to open the settings</p>
        <PinPad
          onComplete={(c) =>
            verifyPin(c) ? setMode("settings") : setError("Wrong code")
          }
          error={error}
        />
      </>
    );
  } else if (mode === "create") {
    // Set a new code: enter it, then confirm. Saved code is used everywhere
    // a grown-up code is asked for (settings, time's-up, exit full screen).
    const onCreate = (code: string) => {
      if (firstEntry == null) {
        setFirstEntry(code);
        setError(null);
      } else if (firstEntry === code) {
        setPin(code);
        onClose();
      } else {
        setFirstEntry(null);
        setError("Codes didn't match — start again");
      }
    };
    body = (
      <>
        <h2>Set a grown-up code 🔒</h2>
        <p>{firstEntry == null ? "Make up a 4-digit code" : "Enter it again to confirm"}</p>
        <PinPad
          key={firstEntry == null ? "first" : "confirm"}
          onComplete={onCreate}
          error={error}
        />
      </>
    );
  } else {
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

        <div className="tl-fs-row">
          <span>🙈 Fewer distractions</span>
          <button
            className={fewScreen ? "tl-toggle on" : "tl-toggle"}
            onClick={() => setFewScreen(!fewScreen)}
            aria-pressed={fewScreen}
          >
            {fewScreen ? "On" : "Off"}
          </button>
        </div>
        <p className="tl-note">
          Hides the footer links and “Print to color”. On automatically while a
          time limit or full screen is set.
        </p>

        <div className="tl-fs-row">
          <span>🔒 Lock settings with a code</span>
          <button
            className={lockOn ? "tl-toggle on" : "tl-toggle"}
            onClick={() => setLockChecked((v) => !v)}
            aria-pressed={lockOn}
          >
            {lockOn ? "On" : "Off"}
          </button>
        </div>

        <div className="tl-actions">
          <button className="tl-action" onClick={resetToday}>
            ↺ Reset today's timer
          </button>
          {hasPin && lockOn && (
            <button
              className={changeCode ? "tl-action on" : "tl-action"}
              onClick={() => setChangeCode((v) => !v)}
            >
              🔑 {changeCode ? "New code on Done" : "Change code"}
            </button>
          )}
        </div>

        <button className="pill-btn tl-done" onClick={commitAndClose}>
          Done
        </button>
      </>
    );
  }

  return (
    <div className="tl-modal-scrim" onClick={dismiss}>
      <div className="tl-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tl-close" onClick={dismiss} aria-label="Close">
          ✕
        </button>
        {body}
      </div>
    </div>
  );
}
