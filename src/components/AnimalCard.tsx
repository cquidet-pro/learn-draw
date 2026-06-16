import type { Animal } from "../data/animals";
import { previewStrokes } from "../data/animals";

interface Props {
  animal: Animal;
  /** Whether the child has already finished this drawing. */
  done: boolean;
  onClick: () => void;
}

/** A big tappable card showing the finished drawing + name. */
export function AnimalCard({ animal, done, onClick }: Props) {
  return (
    <button
      className={done ? "card done" : "card"}
      onClick={onClick}
      aria-label={done ? `Draw a ${animal.name} (done!)` : `Draw a ${animal.name}`}
    >
      {done && (
        <span className="card-check" aria-hidden="true">
          ✓
        </span>
      )}
      <svg className="card-preview" viewBox={animal.viewBox} aria-hidden="true">
        {previewStrokes(animal).map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke={s.color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <span className="card-name">
        {animal.emoji} {animal.name}
      </span>
    </button>
  );
}
