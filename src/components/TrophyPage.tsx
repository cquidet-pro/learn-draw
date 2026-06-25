import { useCallback, useMemo, useState } from "react";
import type { Animal } from "../data/animals";
import { drawingsForLevel } from "../data/animals";
import { masterpieces } from "../data/masterpieces";
import { flags } from "../data/flags";
import { newWorldCupFlags, FOOTBALL_CUPS, worldCupDone } from "../data/worldcup";
import { rewardTiers } from "../data/rewards";
import { FRIEND_DRAWINGS } from "../data/friends";
import { DrawingThumb } from "./DrawingThumb";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { scrollPage } from "../lib/scroll";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
  /** Ids of drawings the child has finished (flags included). */
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

// Every sticker section — the leveled drawings, paintings AND flags. Flags now
// count toward the trophies like any other drawing, so they're a full group.
const GROUPS: { title: string; items: Animal[] }[] = [
  { title: "🌱 Easy", items: bySubject(drawingsForLevel(5)) },
  { title: "🌳 Medium", items: bySubject(drawingsForLevel(7)) },
  { title: "⭐ Harder", items: bySubject(drawingsForLevel(10)) },
  { title: "🖼️ Paintings", items: masterpieces },
  { title: "🏳️ Flags", items: flags },
  // Only the NEW World Cup countries — the 18 already in "Flags" aren't repeated,
  // so nothing is double-counted in the tally or reward shelf.
  { title: "⚽ World Cup", items: newWorldCupFlags },
];

export function TrophyPage({ onHome, completed, onReset, onPick }: Props) {
  const [confirming, setConfirming] = useState(false);

  const groups = useMemo(
    () => GROUPS.map((g) => ({ ...g, done: completed })),
    [completed],
  );

  const onCommand = useCallback(
    (transcript: string): boolean => {
      // Navigation wins over scrolling, so a "home" grouped with a "down" the
      // child said while browsing isn't swallowed by the scroll command.
      if (heardAny(transcript, ["home", "back", "menu"])) {
        onHome();
        return true;
      }
      if (heardAny(transcript, ["up"])) {
        scrollPage(-1);
        return true;
      }
      if (heardAny(transcript, ["down"])) {
        scrollPage(1);
        return true;
      }
      // Saying a drawing's name starts it — but only for ones not done yet.
      for (const g of groups) {
        for (const a of g.items) {
          if (g.done.has(a.id)) continue;
          if (heardAny(transcript, [a.name.toLowerCase()])) {
            onPick(a);
            return true;
          }
        }
      }
      return false;
    },
    [onHome, onPick, groups],
  );
  useVoiceControl(onCommand);

  // Sticker tally across every section (flags included) — and the same totals
  // drive the "animal friend" reward shelf, since flags now count toward it.
  const totalDone = groups.reduce(
    (n, g) => n + g.items.filter((a) => g.done.has(a.id)).length,
    0,
  );
  const totalAll = groups.reduce((n, g) => n + g.items.length, 0);
  const allDone = totalAll > 0 && totalDone === totalAll;

  const rewards = rewardTiers(totalAll);
  const rewardsEarned = rewards.filter((r) => totalDone >= r.need).length;
  const nextReward = rewards.find((r) => totalDone < r.need);

  // Football cups — won only by finishing World Cup flags.
  const wcDone = worldCupDone(completed);
  const cupsEarned = FOOTBALL_CUPS.filter((c) => wcDone >= c.need).length;
  const nextCup = FOOTBALL_CUPS.find((c) => wcDone < c.need);

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

      <section className="trophy-group reward-group">
        <div className="trophy-group-head">
          <h2>🎁 Animal Friends</h2>
          <span className="trophy-count">
            {rewardsEarned} / {rewards.length} 🏅
          </span>
        </div>
        <p className="reward-blurb">
          {nextReward
            ? `A new animal friend every 5 drawings — ${
                nextReward.need - totalDone
              } more to unlock the ${nextReward.name}! ${nextReward.emoji}`
            : "Wow! You collected every animal friend! 🦕🎉"}
        </p>
        {rewardsEarned > 0 && (
          <p className="reward-blurb reward-draw-hint">
            Tap a friend to draw it! ✏️
          </p>
        )}
        <div className="reward-grid">
          {rewards.map((r) => {
            const earned = totalDone >= r.need;
            const inner = (
              <>
                <span
                  className="reward-emoji"
                  aria-hidden="true"
                  style={{ fontSize: `${r.size}rem` }}
                >
                  {earned ? r.emoji : "❓"}
                </span>
                <span className="reward-name">
                  {earned ? r.name : `${r.need} drawings`}
                </span>
              </>
            );
            // Earned friends are tappable to draw them; locked ones are teasers.
            const drawing = FRIEND_DRAWINGS[r.name];
            return earned && drawing ? (
              <button
                className="reward earned"
                key={r.name}
                onClick={() => onPick(drawing)}
                aria-label={`Draw the ${r.name}`}
                title={`Draw the ${r.name}! ✏️`}
              >
                {inner}
              </button>
            ) : (
              <div
                className="reward locked"
                key={r.name}
                title={`${r.name} — draw ${r.need} to unlock`}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="trophy-group reward-group">
        <div className="trophy-group-head">
          <h2>⚽ Football Cups</h2>
          <span className="trophy-count">
            {cupsEarned} / {FOOTBALL_CUPS.length} 🏆
          </span>
        </div>
        <p className="reward-blurb">
          {nextCup
            ? `Win a cup for drawing World Cup flags — ${
                nextCup.need - wcDone
              } more for the ${nextCup.name}! ${nextCup.emoji}`
            : "Champion! You won every football cup! 🏆🎉"}
        </p>
        <div className="reward-grid">
          {FOOTBALL_CUPS.map((c, i) => {
            const earned = wcDone >= c.need;
            return (
              <div
                className={earned ? "reward earned" : "reward locked"}
                key={c.name}
                title={
                  earned ? c.name : `${c.name} — draw ${c.need} World Cup flags to win`
                }
              >
                <span
                  className="reward-emoji"
                  aria-hidden="true"
                  style={{ fontSize: `${1.8 + i * 0.2}rem` }}
                >
                  {earned ? c.emoji : "❓"}
                </span>
                <span className="reward-name">
                  {earned ? c.name : `${c.need} flags`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {groups.map((g) => {
        const done = g.items.filter((a) => g.done.has(a.id)).length;
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
                const earned = g.done.has(a.id);
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
