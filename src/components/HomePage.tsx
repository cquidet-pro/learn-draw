import { useCallback } from "react";
import { animals } from "../data/animals";
import type { Animal } from "../data/animals";
import { AnimalCard } from "./AnimalCard";
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
}

export function HomePage({ onPick, completed }: Props) {
  const onCommand = useCallback(
    (transcript: string) => {
      if (heardAny(transcript, ["up"])) return scrollPage(-1);
      if (heardAny(transcript, ["down"])) return scrollPage(1);
      for (const animal of animals) {
        const words = ALIASES[animal.id] ?? [animal.name.toLowerCase()];
        if (heardAny(transcript, words)) {
          onPick(animal);
          return;
        }
      }
    },
    [onPick],
  );
  useVoiceControl(onCommand);

  return (
    <div className="home">
      <h1 className="title">🎨 Let's Learn to Draw!</h1>
      <p className="subtitle">Pick something to draw 👇</p>
      <div className="control-bar">
        <VoiceButton />
        <div className="scroll-btns">
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
      </div>
      <div className="card-grid">
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            done={completed.has(animal.id)}
            onClick={() => onPick(animal)}
          />
        ))}
      </div>
    </div>
  );
}
