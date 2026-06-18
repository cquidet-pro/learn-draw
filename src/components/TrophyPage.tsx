import { useCallback } from "react";
import type { Animal } from "../data/animals";
import { drawingsForLevel } from "../data/animals";
import { masterpieces } from "../data/masterpieces";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
  /** Ids of drawings the child has finished. */
  completed: Set<string>;
}

// The sticker shelf is grouped the same way the child browses drawings.
const GROUPS: { title: string; items: Animal[] }[] = [
  { title: "🌱 Easy", items: drawingsForLevel(5) },
  { title: "🌳 Medium", items: drawingsForLevel(7) },
  { title: "⭐ Harder", items: drawingsForLevel(10) },
  { title: "🖼️ Paintings", items: masterpieces },
];

export function TrophyPage({ onHome, completed }: Props) {
  const onCommand = useCallback(
    (transcript: string): boolean => {
      if (heardAny(transcript, ["home", "back", "menu"])) {
        onHome();
        return true;
      }
      return false;
    },
    [onHome],
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
                return (
                  <div
                    className={earned ? "sticker earned" : "sticker locked"}
                    key={a.id}
                    title={
                      earned ? `${a.name} — done!` : `${a.name} — not drawn yet`
                    }
                  >
                    <span className="sticker-emoji" aria-hidden="true">
                      {a.emoji}
                    </span>
                    <span className="sticker-name">{a.name}</span>
                    {earned && (
                      <span className="sticker-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
