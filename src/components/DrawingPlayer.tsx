import { useCallback, useState } from "react";
import type { Animal } from "../data/animals";
import { useDrawingPlayer } from "../hooks/useDrawingPlayer";
import { useKeyboard } from "../hooks/useKeyboard";
import { AnimatedDrawing } from "./AnimatedDrawing";
import { Controls } from "./Controls";
import { Celebration } from "./Celebration";
import { useVoiceControl } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  animal: Animal;
  onHome: () => void;
  /** Called when the child finishes the drawing (the celebration fires). */
  onComplete: () => void;
}

export function DrawingPlayer({ animal, onHome, onComplete }: Props) {
  const player = useDrawingPlayer(animal.steps.length);
  const [celebrating, setCelebrating] = useState(false);

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
          {animal.emoji} How to draw a {animal.name}
        </h1>
      </header>

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

      {celebrating && (
        <Celebration
          animalName={animal.name}
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
