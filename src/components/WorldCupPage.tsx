import { useCallback } from "react";
import type { Animal } from "../data/animals";
import { worldCupFlags } from "../data/worldcup";
import { AnimalCard } from "./AnimalCard";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { scrollPage } from "../lib/scroll";
import { heardAny } from "../voice/match";

interface Props {
  onPick: (flag: Animal) => void;
  onHome: () => void;
  completed: Set<string>;
}

// "World Cup Flags" — the 48 countries that qualified for the 2026 FIFA World
// Cup, drawn the same way as the other flags. (We use an original soccer-ball
// icon, not the trademarked tournament emblem.)
export function WorldCupPage({ onPick, onHome, completed }: Props) {
  const onCommand = useCallback(
    (transcript: string): boolean => {
      // Navigation wins over scrolling (a "home" grouped with a "down" the child
      // said while browsing shouldn't be swallowed by the scroll command).
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
      for (const f of worldCupFlags) {
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
        <h1>⚽ World Cup Flags</h1>
      </header>
      <p className="subtitle">Draw a flag from the 2026 World Cup! 🖍️</p>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <div className="card-grid">
        {worldCupFlags.map((f) => (
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
