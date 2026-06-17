import type { Level } from "../data/animals";

interface Props {
  level: Level;
  onChange: (level: Level) => void;
}

// Difficulty options. The underlying level values stay 5/7/10 (used by the
// drawing data); these are just the friendly labels shown to the child.
const LEVELS: { level: Level; icon: string; label: string }[] = [
  { level: 5, icon: "🌱", label: "Easy" },
  { level: 7, icon: "🌟", label: "Medium" },
  { level: 10, icon: "🔥", label: "Harder" },
];

/** Difficulty picker. Any drawing can be attempted at any time. */
export function LevelSelector({ level, onChange }: Props) {
  return (
    <div className="level-selector" role="group" aria-label="Choose a difficulty">
      {LEVELS.map((l) => (
        <button
          key={l.level}
          className={l.level === level ? "level-btn active" : "level-btn"}
          onClick={() => onChange(l.level)}
          aria-pressed={l.level === level}
          aria-label={`${l.label} drawings`}
        >
          <span className="level-icon" aria-hidden="true">
            {l.icon}
          </span>
          <span className="level-label">{l.label}</span>
        </button>
      ))}
    </div>
  );
}
