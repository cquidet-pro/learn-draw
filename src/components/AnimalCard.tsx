import type { Animal } from "../data/animals";
import { DrawingThumb } from "./DrawingThumb";

interface Props {
  animal: Animal;
  /** Whether the child has already finished this drawing. */
  done: boolean;
  /** Optional small line under the name (e.g. "by Van Gogh"). */
  subtitle?: string;
  onClick: () => void;
}

/** A big tappable card showing the finished drawing + name. */
export function AnimalCard({ animal, done, subtitle, onClick }: Props) {
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
      <DrawingThumb animal={animal} className="card-preview" />
      <span className="card-name">
        {animal.emoji} {animal.name}
      </span>
      {subtitle && <span className="card-sub">{subtitle}</span>}
    </button>
  );
}
