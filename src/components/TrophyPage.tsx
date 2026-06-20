import { useCallback, useState } from "react";
import type { Animal } from "../data/animals";
import { drawingsForLevel } from "../data/animals";
import { masterpieces } from "../data/masterpieces";
import { DrawingThumb } from "./DrawingThumb";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
  /** Ids of drawings the child has finished. */
  completed: Set<string>;
  /** Clear every earned sticker and start the shelf over. */
  onReset: () => void;
  /** Start drawing one of the not-yet-done pictures. */
  onPick: (animal: Animal) => void;
}

// Show the same subjects in the same order across Easy/Medium/Harder so the
// shelves line up (the underlying per-level arrays aren't in the same order).
const SUBJECT_ORDER = drawingsForLevel(5).map((a) => a.name);
const bySubject = (items: Animal[]): Animal[] =>
  [...items].sort((a, b) => {
    const ia = SUBJECT_ORDER.indexOf(a.name);
    const ib = SUBJECT_ORDER.indexOf(b.name);
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
  });

// The sticker shelf is grouped the same way the child browses drawings.
const GROUPS: { title: string; items: Animal[] }[] = [
  { title: "🌱 Easy", items: bySubject(drawingsForLevel(5)) },
  { title: "🌳 Medium", items: bySubject(drawingsForLevel(7)) },
  { title: "⭐ Harder", items: bySubject(drawingsForLevel(10)) },
  { title: "🖼️ Paintings", items: masterpieces },
];

export function TrophyPage({ onHome, completed, onReset, onPick }: Props) {
  const [confirming, setConfirming] = useState(false);

  const onCommand = useCallback(
    (transcript: string): boolean => {
      if (heardAny(transcript, ["home", "back", "menu"])) {
        onHome();
        return true;
      }
      // Saying a drawing's name starts it — but only for ones not done yet.
      for (const g of GROUPS) {
        for (const a of g.items) {
          if (completed.has(a.id)) continue;
          if (heardAny(transcript, [a.name.toLowerCase()])) {
            onPick(a);
            return true;
          }
        }
      }
      return false;
    },
    [onHome, onPick, completed],
  );
  useVoiceControl(onCommand);

  const doneIn = (items: Animal[]) =>
    items.filter((a) => completed.has(a.id)).length;
  const totalDone = GROUPS.reduce((n, g) => n + doneIn(g.items), 0);
  const totalAll = GROUPS.reduce((n, g) => n + g.items.length, 0);
  const allDone = totalAll > 0 && totalDone === totalAll;

  return (
    <div className="facts-page trophy-page">
      <header className="player-header">
        <button className="home-btn" onClick={onHome} aria-label="Back to home">
          🏠 Home
        </button>
        <h1>🏆 My Sticker Shelf</h1>
      </header>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <p className="trophy-tally">
        You've earned <strong>{totalDone}</strong> of {totalAll} stickers!{" "}
        {allDone ? "🎉 You drew them all!" : "Keep drawing to collect them! ✨"}
      </p>
      {!allDone && (
        <p className="trophy-hint">
          Tap a faded one (or say its name) to draw it! ✏️
        </p>
      )}

      {allDone && (
        <div className="trophy-reset">
          {confirming ? (
            <div className="trophy-reset-confirm" role="alertdialog" aria-live="polite">
              <p>Clear all your stickers and start over?</p>
              <div className="trophy-reset-actions">
                <button
                  className="trophy-reset-yes"
                  onClick={() => {
                    onReset();
                    setConfirming(false);
                  }}
                >
                  Yes, reset
                </button>
                <button
                  className="trophy-reset-no"
                  onClick={() => setConfirming(false)}
                >
                  Keep them
                </button>
              </div>
            </div>
          ) : (
            <button
              className="trophy-reset-btn"
              onClick={() => setConfirming(true)}
            >
              🔄 Start over
            </button>
          )}
        </div>
      )}

      {GROUPS.map((g) => {
        const done = doneIn(g.items);
        const pct = g.items.length ? Math.round((done / g.items.length) * 100) : 0;
        return (
          <section className="trophy-group" key={g.title}>
            <div className="trophy-group-head">
              <h2>{g.title}</h2>
              <span className="trophy-count">
                {done} / {g.items.length} ⭐
              </span>
            </div>
            <div
              className="trophy-bar"
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={g.items.length}
            >
              <span className="trophy-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="sticker-grid">
              {g.items.map((a) => {
                const earned = completed.has(a.id);
                const inner = (
                  <>
                    <DrawingThumb animal={a} className="sticker-art" />
                    <span className="sticker-name">
                      {a.emoji} {a.name}
                    </span>
                  </>
                );
                // Done ones are just shown; not-done ones are tappable to draw.
                return earned ? (
                  <div className="sticker earned" key={a.id} title={`${a.name} — done!`}>
                    {inner}
                    <span className="sticker-check" aria-hidden="true">
                      ✓
                    </span>
                  </div>
                ) : (
                  <button
                    className="sticker locked"
                    key={a.id}
                    onClick={() => onPick(a)}
                    aria-label={`Draw a ${a.name} — not done yet`}
                  >
                    {inner}
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
