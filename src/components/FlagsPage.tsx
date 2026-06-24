import { useCallback } from "react";
import type { Animal } from "../data/animals";
import { flags } from "../data/flags";
import { AnimalCard } from "./AnimalCard";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { scrollPage } from "../lib/scroll";
import { heardAny } from "../voice/match";

interface Props {
  onPick: (flag: Animal) => void;
  onHome: () => void;
  completed: Set<string>;
}

export function FlagsPage({ onPick, onHome, completed }: Props) {
  const onCommand = useCallback(
    (transcript: string): boolean => {
      if (heardAny(transcript, ["up"])) {
        scrollPage(-1);
        return true;
      }
      if (heardAny(transcript, ["down"])) {
        scrollPage(1);
        return true;
      }
      if (heardAny(transcript, ["home", "back", "menu"])) {
        onHome();
        return true;
      }
      for (const f of flags) {
        if (heardAny(transcript, [f.name.toLowerCase()])) {
          onPick(f);
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
        <h1>🏳️ Flags of the World</h1>
      </header>
      <p className="subtitle">Draw a flag, one shape at a time! 🖍️</p>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <div className="card-grid">
        {flags.map((f) => (
          <AnimalCard
            key={f.id}
            animal={f}
            done={completed.has(f.id)}
            onClick={() => onPick(f)}
          />
        ))}
      </div>
    </div>
  );
}
