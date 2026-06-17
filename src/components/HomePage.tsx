import { useCallback } from "react";
import { drawingsForLevel } from "../data/animals";
import type { Animal, Level } from "../data/animals";
import { AnimalCard } from "./AnimalCard";
import { LevelSelector } from "./LevelSelector";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

/** Smoothly scroll the page up (-1) or down (+1) by most of a screenful. */
function scrollPage(dir: 1 | -1) {
  window.scrollBy({ top: dir * Math.round(window.innerHeight * 0.7), behavior: "smooth" });
}

// Spoken words (beyond each drawing's own name) that select it.
const ALIASES: Record<string, string[]> = {
  dog: ["dog", "puppy", "doggy", "doggie"],
  cat: ["cat", "kitty", "kitten"],
  hedgehog: ["hedgehog", "hedge hog", "porcupine"],
  fish: ["fish", "fishy"],
  dinosaur: ["dinosaur", "dino", "rex", "t rex"],
  butterfly: ["butterfly", "butter fly"],
  flower: ["flower", "flowers"],
  tree: ["tree"],
  sun: ["sun", "sunshine"],
  rainbow: ["rainbow"],
  cloud: ["cloud", "rain", "rain cloud", "clouds"],
  star: ["star"],
  heart: ["heart", "love"],
  house: ["house", "home house"],
  car: ["car", "truck", "vehicle"],
  family: ["family", "people"],
  princess: ["princess"],
};

interface Props {
  onPick: (animal: Animal) => void;
  /** Ids of animals already finished — shown with a green check. */
  completed: Set<string>;
  level: Level;
  onLevelChange: (level: Level) => void;
  onOpenFacts: () => void;
  onOpenPaintings: () => void;
}

export function HomePage({
  onPick,
  completed,
  level,
  onLevelChange,
  onOpenFacts,
  onOpenPaintings,
}: Props) {
  const visible = drawingsForLevel(level);

  const onCommand = useCallback(
    (transcript: string) => {
      if (heardAny(transcript, ["up"])) return scrollPage(-1);
      if (heardAny(transcript, ["down"])) return scrollPage(1);
      if (heardAny(transcript, ["facts", "fun facts"])) return onOpenFacts();
      if (heardAny(transcript, ["paintings", "painting", "art", "famous"]))
        return onOpenPaintings();
      for (const animal of visible) {
        const words = ALIASES[animal.id] ?? [animal.name.toLowerCase()];
        if (heardAny(transcript, words)) {
          onPick(animal);
          return;
        }
      }
    },
    [onPick, onOpenFacts, onOpenPaintings, visible],
  );
  useVoiceControl(onCommand);

  return (
    <div className="home">
      <h1 className="title">🎨 Let's Learn to Draw!</h1>
      <p className="subtitle">Pick something to draw 👇</p>

      <LevelSelector level={level} onChange={onLevelChange} />

      <div className="control-bar">
        <VoiceButton />
        <button className="facts-btn" onClick={onOpenPaintings}>
          🖼️ Famous Paintings
        </button>
        <button className="facts-btn" onClick={onOpenFacts}>
          💡 Fun Facts
        </button>
      </div>

      {/* Up/down scroll controls on the left, centred at the drawing level. */}
      <div className="side-scroll">
        <button
          className="scroll-btn"
          onClick={() => scrollPage(-1)}
          aria-label="Scroll up"
        >
          ▲
        </button>
        <button
          className="scroll-btn"
          onClick={() => scrollPage(1)}
          aria-label="Scroll down"
        >
          ▼
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="empty-state">
          More drawings for this level are coming soon! 🎨✨
          <br />
          Try the 🌱 Easy level for now.
        </p>
      ) : (
        <div className="card-grid">
          {visible.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              done={completed.has(animal.id)}
              onClick={() => onPick(animal)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
