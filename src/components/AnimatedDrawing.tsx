import type { Animal } from "../data/animals";

interface Props {
  animal: Animal;
  /** Index of the step currently being taught. */
  stepIndex: number;
  /** Seconds for one draw loop of the current step's strokes. */
  duration: number;
  /** When true, the current step's strokes are shown solid/finished instead of
   *  looping — used during the end-of-drawing celebration. */
  frozen?: boolean;
}

/**
 * Renders the animal as an SVG. Strokes from earlier steps are shown static and
 * faded; strokes of the current step "draw themselves" on a loop.
 *
 * The drawing effect uses pathLength="1" + animating stroke-dashoffset 1 -> 0,
 * driven by the CSS animation in index.css. The `key` on current-step paths
 * includes the step index so React remounts them and the animation restarts
 * cleanly each time the step changes.
 */
export function AnimatedDrawing({ animal, stepIndex, duration, frozen }: Props) {
  return (
    <svg
      className="drawing"
      viewBox={animal.viewBox}
      role="img"
      aria-label={`How to draw a ${animal.name}, step ${stepIndex + 1}`}
    >
      {animal.steps.map((step, si) => {
        const isCurrent = si === stepIndex;
        const isPast = si < stepIndex;
        if (!isCurrent && !isPast) return null; // future steps hidden

        // Current step animates ("stroke-drawing"), unless frozen for the
        // celebration ("stroke-final" = solid). Past steps stay faded.
        const className = isCurrent
          ? frozen
            ? "stroke-final"
            : "stroke-drawing"
          : "stroke-done";
        const strokeColor = step.color ?? animal.color;

        return step.strokes.map((d, ki) => (
          <path
            key={`${si}-${ki}-${isCurrent ? stepIndex : "done"}`}
            d={d}
            pathLength={1}
            fill="none"
            stroke={strokeColor}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={
              isCurrent && !frozen
                ? ({ "--draw-duration": `${duration}s` } as React.CSSProperties)
                : undefined
            }
          />
        ));
      })}
    </svg>
  );
}
