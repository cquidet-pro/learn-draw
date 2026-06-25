import { useCallback } from "react";
import type { Animal } from "../data/animals";
import { masterpieces } from "../data/masterpieces";
import { AnimalCard } from "./AnimalCard";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { scrollPage } from "../lib/scroll";
import { heardAny } from "../voice/match";

interface Props {
  onPick: (painting: Animal) => void;
  onHome: () => void;
  completed: Set<string>;
}

export function PaintingsPage({ onPick, onHome, completed }: Props) {
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
      for (const m of masterpieces) {
        const words = [m.name.toLowerCase()];
        if (m.artist) words.push(m.artist.toLowerCase());
        if (heardAny(transcript, words)) {
          onPick(m);
          return true;
        }
      }
      return false;
    },
    [onPick, onHome],
  );
  useVoiceControl(onCommand);

  return (
    <div className="home">
      <header className="player-header">
        <button className="home-btn" onClick={onHome} aria-label="Back to home">
          🏠 Home
        </button>
        <h1>🖼️ Famous Paintings</h1>
      </header>
      <p className="subtitle">Make a masterpiece, one sketch at a time! 🎨</p>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <div className="card-grid">
        {masterpieces.map((m) => (
          <AnimalCard
            key={m.id}
            animal={m}
            done={completed.has(m.id)}
            subtitle={m.artist ? `by ${m.artist}` : undefined}
            onClick={() => onPick(m)}
          />
        ))}
      </div>
    </div>
  );
}
