import type { Level } from "../data/animals";

interface Props {
  level: Level;
  onChange: (level: Level) => void;
}

const LEVELS: { level: Level; icon: string }[] = [
  { level: 5, icon: "🐣" },
  { level: 7, icon: "🦊" },
  { level: 10, icon: "🦉" },
];

/** Small age/difficulty picker. More complex drawings come at higher levels. */
export function LevelSelector({ level, onChange }: Props) {
  return (
    <div className="level-selector" role="group" aria-label="Choose your level">
      {LEVELS.map((l) => (
        <button
          key={l.level}
          className={l.level === level ? "level-btn active" : "level-btn"}
          onClick={() => onChange(l.level)}
          aria-pressed={l.level === level}
          aria-label={`${l.level} years old`}
        >
          <span className="level-icon" aria-hidden="true">
            {l.icon}
          </span>
          <span className="level-age">{l.level}</span>
        </button>
      ))}
    </div>
  );
}
