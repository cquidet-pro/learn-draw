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
 * All color fills are painted in a first pass *behind* every outline stroke, so
 * a final "color it in" step (a step with fills but no strokes) tints the
 * picture without covering the line art. While that coloring step is active —
 * or when frozen for the celebration — every outline is shown solid.
 *
 * The drawing effect uses pathLength="1" + animating stroke-dashoffset 1 -> 0,
 * driven by the CSS animation in index.css. The `key` on current-step paths
 * includes the step index so React remounts them and the animation restarts
 * cleanly each time the step changes.
 */
export function AnimatedDrawing({ animal, stepIndex, duration, frozen }: Props) {
  const visible = animal.steps
    .map((step, si) => ({ step, si }))
    .filter(({ si }) => si <= stepIndex);

  // A "coloring" step has fills but no strokes of its own. While it's the
  // current step we keep all the outlines solid (the line art is finished — we
  // are just filling it in).
  const current = animal.steps[stepIndex];
  const coloringNow =
    !frozen && !!current?.fills?.length && !current?.strokes?.length;
  const allSolid = frozen || coloringNow;

  return (
    <svg
      className="drawing"
      viewBox={animal.viewBox}
      role="img"
      aria-label={`How to draw a ${animal.name}, step ${stepIndex + 1}`}
    >
      {/* Pass 1: color fills, behind everything. */}
      {visible.map(({ step, si }) =>
        step.fills?.map((f, fi) => (
          <path
            key={`fill-${si}-${fi}`}
            d={f.d}
            fill={f.color}
            stroke="none"
            className={si === stepIndex || frozen ? "fill-current" : "fill-done"}
          />
        )),
      )}

      {/* Pass 2: outline strokes, on top of the fills. */}
      {visible.map(({ step, si }) => {
        const isCurrent = si === stepIndex;
        const className = allSolid
          ? "stroke-final"
          : isCurrent
            ? "stroke-drawing"
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
              isCurrent && !allSolid
                ? ({ "--draw-duration": `${duration}s` } as React.CSSProperties)
                : undefined
            }
          />
        ));
      })}
    </svg>
  );
}
