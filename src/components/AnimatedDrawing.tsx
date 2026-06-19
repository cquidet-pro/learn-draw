import { useEffect, useRef, useState } from "react";
import type { Animal } from "../data/animals";

interface Props {
  animal: Animal;
  /** Index of the step currently being taught. */
  stepIndex: number;
  /** Seconds to draw ONE stroke of the current step. A step with several
   *  strokes draws them one after another, so it takes proportionally longer. */
  duration: number;
  /** When true, the current step's strokes are shown solid/finished instead of
   *  looping — used during the end-of-drawing celebration. */
  frozen?: boolean;
  /** When true, freeze the current step's draw where it is (pause button). */
  paused?: boolean;
}

const PENCIL = "#bdb6a8";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Renders the animal as an SVG. Strokes from earlier steps are shown static and
 * faded; the current step's strokes "draw themselves" — but only ONE at a time,
 * like a single pencil: each stroke draws in the order it's authored, the next
 * starts when the previous finishes, and the whole step loops after a short
 * pause. All color fills are painted behind the outlines so a final "color it
 * in" step tints the picture without covering the line art.
 */
export function AnimatedDrawing({ animal, stepIndex, duration, frozen, paused }: Props) {
  const visible = animal.steps
    .map((step, si) => ({ step, si }))
    .filter(({ si }) => si <= stepIndex);

  const current = animal.steps[stepIndex];
  const coloringNow = !frozen && !!current && current.strokes.length === 0;
  const allSolid = frozen || coloringNow;
  const reduce = prefersReducedMotion();
  // Sequence the current step's strokes only when we're actually animating.
  const sequencing = !allSolid && !reduce && !!current && current.strokes.length > 0;
  const strokeCount = current?.strokes.length ?? 0;

  // Which stroke of the current step is drawing now (0..strokeCount). When it
  // reaches strokeCount the whole step is drawn; we hold, then loop back to 0.
  const [seq, setSeq] = useState(0);
  const holdRef = useRef<number | undefined>(undefined);

  // Restart the sequence whenever the step (or drawing) changes.
  useEffect(() => {
    setSeq(0);
  }, [stepIndex, animal.id]);

  // Once every stroke is drawn, hold briefly then loop back to the first.
  useEffect(() => {
    if (!sequencing || paused) return;
    if (seq >= strokeCount) {
      holdRef.current = window.setTimeout(() => setSeq(0), 700);
      return () => window.clearTimeout(holdRef.current);
    }
  }, [seq, sequencing, paused, strokeCount]);

  const revealColors = !animal.colorReveal || coloringNow || frozen;

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
        const strokeColor = revealColors ? step.color ?? animal.color : PENCIL;

        return step.strokes.map((d, ki) => {
          // Decide how this particular stroke renders.
          let className: string;
          let style: React.CSSProperties | undefined;
          let onAnimationEnd: (() => void) | undefined;

          if (!isCurrent) {
            className = "stroke-done"; // earlier step: faded
          } else if (allSolid || reduce) {
            className = "stroke-final"; // coloring / celebration / reduced motion
          } else if (ki < seq) {
            className = "stroke-seq-drawn"; // already drawn this loop
          } else if (ki === seq) {
            className = "stroke-seq-active"; // the one being drawn now
            style = {
              "--seg": `${duration}s`,
              animationPlayState: paused ? "paused" : "running",
            } as React.CSSProperties;
            onAnimationEnd = () => setSeq((s) => (s === ki ? s + 1 : s));
          } else {
            className = "stroke-seq-pending"; // not drawn yet (invisible)
          }

          return (
            <path
              // Include seq in the active stroke's key so it remounts and the
              // animation restarts cleanly each loop.
              key={`${si}-${ki}-${isCurrent ? `c${ki === seq ? seq : "x"}` : "done"}`}
              d={d}
              pathLength={1}
              fill="none"
              stroke={strokeColor}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={className}
              style={style}
              onAnimationEnd={onAnimationEnd}
            />
          );
        });
      })}
    </svg>
  );
}
