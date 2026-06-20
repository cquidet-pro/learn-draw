import type { Animal } from "../data/animals";
import { previewFills, previewStrokes } from "../data/animals";

/**
 * The finished-drawing thumbnail used on the home cards and the sticker shelf,
 * so the same picture represents a drawing everywhere. Colour fills sit behind
 * the outline strokes, and each stroke keeps its authored width.
 */
export function DrawingThumb({
  animal,
  className,
}: {
  animal: Animal;
  className?: string;
}) {
  return (
    <svg className={className} viewBox={animal.viewBox} aria-hidden="true">
      {previewFills(animal).map((f, i) => (
        <path key={`fill-${i}`} d={f.d} fill={f.color} stroke="none" />
      ))}
      {previewStrokes(animal).map((s, i) => (
        <path
          key={i}
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth={s.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
