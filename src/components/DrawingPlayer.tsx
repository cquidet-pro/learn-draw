import { useCallback, useMemo, useState } from "react";
import type { Animal } from "../data/animals";
import { chooseNext } from "../data/animals";
import { useDrawingPlayer } from "../hooks/useDrawingPlayer";
import { useKeyboard } from "../hooks/useKeyboard";
import { AnimatedDrawing } from "./AnimatedDrawing";
import { Controls } from "./Controls";
import { Celebration } from "./Celebration";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  animal: Animal;
  /** The sibling drawings to auto-advance among (same collection/level). */
  pool: Animal[];
  /** Drawings already finished — used to pick the next one to auto-advance to. */
  completed: Set<string>;
  onHome: () => void;
  /** Called when the child finishes the drawing (the celebration fires). */
  onComplete: () => void;
  /** Navigate to another drawing (used by the celebration's auto-advance). */
  onGoTo: (animal: Animal) => void;
}

export function DrawingPlayer({
  animal,
  pool,
  completed,
  onHome,
  onComplete,
  onGoTo,
}: Props) {
  const player = useDrawingPlayer(animal.steps.length);
  const [celebrating, setCelebrating] = useState(false);

  // Decided once when the celebration appears, so the countdown target is stable.
  const nextTarget = useMemo(
    () => (celebrating ? chooseNext(pool, animal.id, completed) : null),
    [celebrating, pool, animal.id, completed],
  );

  // Space/▶ on the last step doesn't auto-celebrate — it takes one more,
  // deliberate press to pop the fireworks (avoids ending by accident).
  const handleNext = useCallback(() => {
    if (celebrating) return;
    if (player.isLast) {
      setCelebrating(true);
      onComplete();
    } else {
      player.next();
    }
  }, [celebrating, player, onComplete]);

  // Back from the celebration just returns to the last step, so a mistaken
  // press is fully recoverable.
  const handlePrev = useCallback(() => {
    if (celebrating) setCelebrating(false);
    else player.prev();
  }, [celebrating, player]);

  useKeyboard({ onNext: handleNext, onPrev: handlePrev, onHome });

  // Voice commands. Check "back" before "next" so "go back" isn't read as "go".
  const onCommand = useCallback(
    (transcript: string) => {
      if (heardAny(transcript, ["home", "menu", "exit"])) onHome();
      else if (heardAny(transcript, ["back", "previous"])) handlePrev();
      else if (heardAny(transcript, ["next", "go", "forward", "more"]))
        handleNext();
    },
    [onHome, handlePrev, handleNext],
  );
  useVoiceControl(onCommand);

  const step = animal.steps[player.stepIndex];

  return (
    <div className="player">
      <header className="player-header">
        <button className="home-btn" onClick={onHome} aria-label="Back to home">
          🏠 Home
        </button>
        <h1>
          {animal.artist
            ? `${animal.emoji} ${animal.name}`
            : `${animal.emoji} How to draw a ${animal.name}`}
        </h1>
        {animal.artist && <span className="artist-line">by {animal.artist}</span>}
      </header>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <p className="hint">
        {player.isLast && !celebrating ? "All done? Press Space! 🎉" : step.hint}
      </p>

      <AnimatedDrawing
        animal={animal}
        stepIndex={player.stepIndex}
        duration={player.duration}
        frozen={celebrating}
      />

      <Controls
        stepIndex={player.stepIndex}
        stepCount={animal.steps.length}
        prevDisabled={player.isFirst && !celebrating}
        nextDisabled={celebrating}
        duration={player.duration}
        onPrev={handlePrev}
        onNext={handleNext}
        onSpeedChange={player.setDuration}
      />

      {celebrating && nextTarget && (
        <Celebration
          animalName={animal.name}
          fact={animal.fact}
          nextName={nextTarget.name}
          nextEmoji={nextTarget.emoji}
          onAutoNext={() => onGoTo(nextTarget)}
          onAgain={onHome}
          onWatchAgain={() => {
            setCelebrating(false);
            player.reset();
          }}
          onBack={handlePrev}
        />
      )}
    </div>
  );
}
