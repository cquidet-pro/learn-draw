import { useState } from "react";

interface Props {
  /** Called with the 4-digit code once four digits are entered. */
  onComplete: (code: string) => void;
  error?: string | null;
}

/** A simple 4-digit PIN entry: four dots + a number pad. */
export function PinPad({ onComplete, error }: Props) {
  const [code, setCode] = useState("");

  const press = (d: string) => {
    if (code.length >= 4) return;
    const next = code + d;
    if (next.length === 4) {
      setCode("");
      onComplete(next);
    } else {
      setCode(next);
    }
  };

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
          onClick={() => setCode((c) => c.slice(0, -1))}
          aria-label="Delete"
        >
          ⌫
        </button>
        <button className="pin-key" onClick={() => press("0")}>
          0
        </button>
      </div>
    </div>
  );
}
