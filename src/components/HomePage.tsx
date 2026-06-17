import { useCallback, useState } from "react";
import { drawingsForLevel } from "../data/animals";
import type { Animal, Level } from "../data/animals";
import { downloadColoringPdf } from "../lib/coloringPdf";
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
  const [printing, setPrinting] = useState(false);

  const handlePrint = useCallback(async () => {
    if (printing || visible.length === 0) return;
    setPrinting(true);
    try {
      await downloadColoringPdf(visible, level);
    } finally {
      setPrinting(false);
    }
  }, [printing, visible, level]);

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
      if (heardAny(transcript, ["facts", "fun facts"])) {
        onOpenFacts();
        return true;
      }
      if (heardAny(transcript, ["paintings", "painting", "art", "famous"])) {
        onOpenPaintings();
        return true;
      }
      if (heardAny(transcript, ["print", "coloring", "color me"])) {
        handlePrint();
        return true;
      }
      for (const animal of visible) {
        const words = ALIASES[animal.id] ?? [animal.name.toLowerCase()];
        if (heardAny(transcript, words)) {
          onPick(animal);
          return true;
        }
      }
      return false;
    },
    [onPick, onOpenFacts, onOpenPaintings, visible, handlePrint],
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
        <button
          className="facts-btn"
          onClick={handlePrint}
          disabled={printing || visible.length === 0}
        >
          {printing ? "⏳ Making PDF…" : "🖨️ Print to color"}
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
