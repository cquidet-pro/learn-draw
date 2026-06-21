import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  /** Called with the 4-digit code once four digits are entered. */
  onComplete: (code: string) => void;
  error?: string | null;
}

/** A simple 4-digit PIN entry: four dots + a number pad. You can tap the
 *  on-screen keys or type on a physical keyboard (top-row digits or the
 *  numpad — the numpad works even with Num Lock off). Backspace deletes. */
export function PinPad({ onComplete, error }: Props) {
  const [code, setCode] = useState("");
  // Refs so the keydown handler can stay stable yet always see the latest code
  // and callback (without re-binding the listener on every keystroke).
  const codeRef = useRef("");
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const update = useCallback((next: string) => {
    codeRef.current = next;
    setCode(next);
  }, []);

  // Holds the short delay between the 4th digit landing and submitting, so the
  // last dot is actually seen filled before the code clears.
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const press = useCallback(
    (d: string) => {
      if (codeRef.current.length >= 4) return;
      const next = codeRef.current + d;
      update(next); // fill the dot — including the fourth one
      if (next.length === 4) {
        // Let the fourth dot paint, then submit and clear. Further presses are
        // ignored meanwhile (code is already length 4).
        submitTimer.current = setTimeout(() => {
          submitTimer.current = null;
          update("");
          onCompleteRef.current(next);
        }, 200);
      }
    },
    [update],
  );

  const del = useCallback(() => update(codeRef.current.slice(0, -1)), [update]);

  // Don't let the pending submit fire after the pad is gone.
  useEffect(() => {
    return () => {
      if (submitTimer.current) clearTimeout(submitTimer.current);
    };
  }, []);

  // Physical keyboard support, including the laptop numpad.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      // Ignore auto-repeat: holding a key a moment too long would otherwise
      // insert several digits from one press and complete the code early.
      if (e.repeat) return;
      let digit: string | null = null;
      if (/^[0-9]$/.test(e.key)) {
        digit = e.key; // top-row digits, or numpad with Num Lock on
      } else {
        const m = e.code.match(/^Numpad([0-9])$/);
        if (m) digit = m[1]; // numpad even with Num Lock off
      }
      if (digit !== null) {
        e.preventDefault();
        press(digit);
        return;
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        del();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press, del]);

  return (
    <div className="pinpad">
      <div className="pin-dots" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i < code.length ? "pin-dot filled" : "pin-dot"} />
        ))}
      </div>
      {error && <p className="pin-error">{error}</p>}
      <div className="pin-keys">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button key={d} className="pin-key" onClick={() => press(d)}>
            {d}
          </button>
        ))}
        <button
          className="pin-key pin-key-del"
          onClick={del}
          aria-label="Delete"
        >
          ⌫
        </button>
        <button className="pin-key" onClick={() => press("0")}>
          0
        </button>
      </div>
      <p className="pin-hint">⌨️ You can use your keyboard or numpad too</p>
    </div>
  );
}
