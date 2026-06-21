import { useCallback, useMemo, useRef, useState } from "react";
import type { Animal } from "../data/animals";
import { chooseNext, chooseNextInLevels } from "../data/animals";
import { isMasterpiece } from "../data/masterpieces";
import { isFlag } from "../data/flags";
import { isFriendOnly } from "../data/friends";
import { rewardJustUnlocked } from "../data/rewards";
import { useDrawingPlayer } from "../hooks/useDrawingPlayer";
import { useKeyboard } from "../hooks/useKeyboard";
import { useWakeLock } from "../hooks/useWakeLock";
import { AnimatedDrawing } from "./AnimatedDrawing";
import { Controls } from "./Controls";
import { Celebration } from "./Celebration";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { usePlaySound, SoundButton } from "../sound/SoundProvider";
import { heardAny } from "../voice/match";

interface Props {
  animal: Animal;
  /** The sibling drawings to auto-advance among (same collection/level). */
  pool: Animal[];
  /** Drawings already finished — used to pick the next one to auto-advance to. */
  completed: Set<string>;
  onHome: () => void;
  /** Label for the back button — defaults to the home button, but paintings
   *  return to the paintings gallery, so it's labelled for that destination. */
  homeLabel?: string;
  homeAria?: string;
  /** Called when the child finishes the drawing (the celebration fires). */
  onComplete: () => void;
  /** Navigate to another drawing (used by the celebration's auto-advance). */
  onGoTo: (animal: Animal) => void;
}

// Twinkly stars shown around the finished picture (before the celebration).
// Positions are relative to a box inset slightly outside the drawing.
const FINISH_STARS: { char: string; style: React.CSSProperties }[] = [
  { char: "✨", style: { top: "0%", left: "0%" } },
  { char: "⭐", style: { top: "-5%", left: "45%" } },
  { char: "✨", style: { top: "0%", right: "0%" } },
  { char: "⭐", style: { top: "42%", right: "-5%" } },
  { char: "✨", style: { bottom: "0%", right: "2%" } },
  { char: "🌟", style: { bottom: "-5%", left: "45%" } },
  { char: "✨", style: { bottom: "0%", left: "2%" } },
  { char: "⭐", style: { top: "42%", left: "-5%" } },
];

export function DrawingPlayer({
  animal,
  pool,
  completed,
  onHome,
  homeLabel = "🏠 Home",
  homeAria = "Back to home",
  onComplete,
  onGoTo,
}: Props) {
  const playSound = usePlaySound();
  const player = useDrawingPlayer(animal.steps.length);
  // After the last step, the picture first "finishes" (shown static with stars
  // around it); pressing next once more pops the celebration.
  const [finished, setFinished] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  // Decided once when the celebration appears, so the countdown target is stable.
  // Paintings cycle among themselves; the leveled drawings stay within their
  // level until it's cleared, then graduate to the next level.
  const nextUp = useMemo(() => {
    if (!celebrating) return null;
    // Paintings and reward "friends" cycle within their own pool; the leveled
    // drawings graduate level by level.
    if (isMasterpiece(animal.id) || isFlag(animal.id) || isFriendOnly(animal.id)) {
      return { animal: chooseNext(pool, animal.id, completed) };
    }
    return chooseNextInLevels(animal, completed);
  }, [celebrating, pool, animal, completed]);

  // Whether this drawing was already finished when we opened it. Captured once
  // at mount (the player remounts per drawing via its key), so replaying an
  // already-earned sticker doesn't re-trigger the milestone reward.
  const wasDoneBefore = useRef(completed.has(animal.id));

  // If *newly* finishing this drawing landed on a 5-drawing milestone, surface
  // the earned animal friend right here in the celebration — no trip to the
  // sticker shelf needed. `completed` already includes the drawing just done.
  // Skipped on replays, so it only fires the moment a milestone is crossed.
  const reward = useMemo(
    () =>
      celebrating &&
      !wasDoneBefore.current &&
      !isFriendOnly(animal.id) &&
      !isFlag(animal.id)
        ? rewardJustUnlocked(completed.size)
        : undefined,
    [celebrating, completed, animal.id],
  );

  // Last step → first press shows the finished picture with stars (no pop-up);
  // a second press pops the celebration. Every transition is one deliberate
  // press, so finishing by accident is easy to undo.
  const handleNext = useCallback(() => {
    if (celebrating) return;
    if (finished) {
      setCelebrating(true);
      playSound("celebrate");
    } else if (player.isLast) {
      setFinished(true);
      playSound("finish");
      onComplete();
    } else {
      player.next();
      playSound("step");
    }
  }, [celebrating, finished, player, onComplete, playSound]);

  // Back steps out one stage at a time: celebration → finished → last step,
  // so a mistaken press is fully recoverable.
  const handlePrev = useCallback(() => {
    if (celebrating) setCelebrating(false);
    else if (finished) setFinished(false);
    else player.prev();
  }, [celebrating, finished, player]);

  useKeyboard({ onNext: handleNext, onPrev: handlePrev, onHome });

  // Keep the screen awake while watching a drawing animate (like a video app),
  // so the laptop doesn't dim or sleep during hands-free viewing.
  useWakeLock(true);

  // Voice commands on the drawing page are kept to just three simple words:
  // "next", "back" and "home". Check "back" before "next" so "go back" isn't
  // misread as "go" → next.
  const onCommand = useCallback(
    (transcript: string): boolean => {
      if (heardAny(transcript, ["home"])) {
        onHome();
        return true;
      }
      if (heardAny(transcript, ["back"])) {
        handlePrev();
        return true;
      }
      if (heardAny(transcript, ["next"])) {
        handleNext();
        return true;
      }
      return false;
    },
    [onHome, handlePrev, handleNext],
  );
  useVoiceControl(onCommand);

  const step = animal.steps[player.stepIndex];

  // The instruction describing the current action — shown in the controls,
  // between the step nav and the pause button.
  const hint = celebrating
    ? ""
    : finished
      ? "Yay, all done! ⭐ Press ▶ for a surprise! 🎉"
      : player.isLast && step.strokes.length === 0
        ? "All done? Press Space! 🎉"
        : step.hint;

  return (
    <div className="player">
      <header className="player-header">
        <button className="home-btn" onClick={onHome} aria-label={homeAria}>
          {homeLabel}
        </button>
        <h1>
          {animal.artist
            ? `${animal.emoji} ${animal.name}`
            : `${animal.emoji} How to draw a ${animal.name}`}
        </h1>
        {animal.artist && <span className="artist-line">by {animal.artist}</span>}
      </header>

      <div className="control-bar">
        <VoiceButton
          hint={
            <>
              <b>next</b> · <b>back</b> · <b>home</b>
            </>
          }
        />
        <SoundButton />
      </div>

      <div className="art-stage">
        {animal.image ? (
          <div className="art-compare">
            <figure className="art-pane">
              <AnimatedDrawing
                animal={animal}
                stepIndex={player.stepIndex}
                duration={player.duration}
                frozen={finished || celebrating}
                paused={player.paused}
              />
              <figcaption className="art-label">Your sketch ✏️</figcaption>
            </figure>
            <figure className="art-pane">
              <img
                className="original-art"
                src={animal.image}
                alt={`${animal.name} by ${animal.artist}`}
              />
              <figcaption className="art-label">The real painting 🖼️</figcaption>
            </figure>
          </div>
        ) : (
          <AnimatedDrawing
            animal={animal}
            stepIndex={player.stepIndex}
            duration={player.duration}
            frozen={finished || celebrating}
            paused={player.paused}
          />
        )}

        {finished && (
          <div className="finish-stars" aria-hidden="true">
            {FINISH_STARS.map((s, i) => (
              <span
                key={i}
                className="finish-star"
                style={{ ...s.style, animationDelay: `${i * 0.15}s` }}
              >
                {s.char}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="hint">{hint}</p>

      <Controls
        stepIndex={player.stepIndex}
        stepCount={animal.steps.length}
        prevDisabled={player.isFirst && !finished && !celebrating}
        nextDisabled={celebrating}
        duration={player.duration}
        paused={player.paused}
        pauseDisabled={finished || celebrating}
        onPrev={handlePrev}
        onNext={handleNext}
        onSpeedChange={player.setDuration}
        onTogglePause={player.togglePause}
      />

      {celebrating && nextUp && (
        <Celebration
          animalName={animal.name}
          fact={animal.fact}
          reward={reward}
          levelUp={nextUp.levelUp}
          nextName={nextUp.animal.name}
          nextEmoji={nextUp.animal.emoji}
          onAutoNext={() => onGoTo(nextUp.animal)}
          onAgain={onHome}
          onWatchAgain={() => {
            setCelebrating(false);
            setFinished(false);
            player.reset();
          }}
          onBack={handlePrev}
        />
      )}
    </div>
  );
}
