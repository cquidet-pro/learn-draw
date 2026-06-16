import { useCallback } from "react";
import { animals } from "../data/animals";
import type { Animal } from "../data/animals";
import { AnimalCard } from "./AnimalCard";
import { useVoiceControl } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

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
