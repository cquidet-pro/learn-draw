import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

// `duration` is the seconds to draw this many path units, so the pen moves at a
// steady speed: a long outline takes longer than a tiny detail (a constant time
// per stroke made big shapes like a car body whip by even on the slowest speed).
const REF_LEN = 200;
// Keep tiny strokes from being instant and huge ones from dragging forever.
const MIN_FACTOR = 0.4;
const MAX_FACTOR = 2.5;

/**
 * Split a path `d` into its separate pen-down sub-paths so the animator can
 * draw each one on its own (one pencil at a time). A stroke like a stick
 * figure's two arms is authored as "M..L.. M..L.." — a single <path> with two
 * sub-paths that would otherwise animate together. We split on absolute `M`
 * (every drawing uses absolute movetos for new sub-paths; a relative `m` would
 * depend on the previous sub-path's end point, and none are used).
 */
function splitSubpaths(d: string): string[] {
  return d
    .split(/(?=M)/)
    .map((s) => s.trim())
    .filter(Boolean);
}

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
  // Some drawings finish with extra steps after the "color it in" reveal (e.g.
  // writing the name). Once we're past that reveal the picture is complete, so
  // its colours stay shown and earlier steps render solid rather than faded.
  const revealIndex = animal.steps.findIndex((s) => s.strokes.length === 0);
  const afterReveal = revealIndex >= 0 && stepIndex > revealIndex;
  // Earlier (non-current) steps render solid once the picture is "done".
  const pastSolid = frozen || coloringNow || afterReveal || reduce;
  // The current step animates one sub-path at a time, so expand any bundled
  // sub-paths (e.g. two arms in one stroke) into separate segments.
  const currentSegments = current ? current.strokes.flatMap(splitSubpaths) : [];
  // Sequence the current step's segments only when we're actually animating.
  const sequencing = !allSolid && !reduce && currentSegments.length > 0;
  const strokeCount = currentSegments.length;

  // Which stroke of the current step is drawing now (0..strokeCount). When it
  // reaches strokeCount the whole step is drawn; we hold, then loop back to 0.
  const [seq, setSeq] = useState(0);
  const holdRef = useRef<number | undefined>(undefined);

  // Measure each current segment's real length (via the browser) so we can make
  // its draw time proportional to how far the pen travels.
  const measureRef = useRef<SVGPathElement | null>(null);
  const [segLengths, setSegLengths] = useState<number[]>([]);
  useLayoutEffect(() => {
    const p = measureRef.current;
    if (!p) return;
    const segs = current ? current.strokes.flatMap(splitSubpaths) : [];
    setSegLengths(
      segs.map((d) => {
        p.setAttribute("d", d);
        try {
          const len = p.getTotalLength();
          return Number.isFinite(len) && len > 0 ? len : REF_LEN;
        } catch {
          return REF_LEN;
        }
      }),
    );
    // currentSegments is derived from (animal.id, stepIndex); re-measure on those.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal.id, stepIndex]);

  const segDuration = (ki: number): number => {
    const len = segLengths[ki];
    if (!len) return duration;
    const scaled = duration * (len / REF_LEN);
    return Math.min(
      Math.max(scaled, duration * MIN_FACTOR),
      duration * MAX_FACTOR,
    );
  };

  // Each colour is its own "color it in" step (see expandColorSteps). Within a
  // step the matching regions fill ONE AT A TIME — bottom-to-top, then
  // left-to-right — so e.g. the two cheeks fill one then the other, and the
  // nose + eyes step paints nose, one eye, the other eye.
  const colorFills = coloringNow && current?.fills ? current.fills : [];
  const animatingFills = colorFills.length > 0 && !reduce;
  const [fillOrder, setFillOrder] = useState<number[]>([]);
  useLayoutEffect(() => {
    const p = measureRef.current;
    const fills = coloringNow && current?.fills ? current.fills : [];
    if (!p || fills.length === 0) {
      setFillOrder([]);
      return;
    }
    const geo = fills.map((f) => {
      p.setAttribute("d", f.d);
      try {
        const b = p.getBBox();
        return { bottom: b.y + b.height, cx: b.x + b.width / 2 };
      } catch {
        return { bottom: 0, cx: 0 };
      }
    });
    const order = fills.map((_, i) => i);
    // Lowest region first (bottom-to-top); ties go left-to-right.
    order.sort((a, b) => geo[b].bottom - geo[a].bottom || geo[a].cx - geo[b].cx);
    setFillOrder(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal.id, stepIndex]);

  // How many regions of the current colour step are painted (0..count); the one
  // at `fillSeq` is fading in. Runs once and holds (the child advances steps).
  const [fillSeq, setFillSeq] = useState(0);
  const fillDuration = Math.min(Math.max(duration * 0.3, 0.4), 1);

  // Reset both sequences the instant the step (or drawing) changes — during
  // render, NOT in an effect. An effect runs after paint, so the new step would
  // briefly paint one frame using the previous step's progress (e.g. showing it
  // already fully coloured) before resetting — that was the colouring flash.
  const stepKey = `${animal.id}#${stepIndex}`;
  const stepKeyRef = useRef(stepKey);
  if (stepKeyRef.current !== stepKey) {
    stepKeyRef.current = stepKey;
    if (seq !== 0) setSeq(0);
    if (fillSeq !== 0) setFillSeq(0);
  }

  // Once every stroke is drawn, hold briefly then loop back to the first.
  useEffect(() => {
    if (!sequencing || paused) return;
    if (seq >= strokeCount) {
      holdRef.current = window.setTimeout(() => setSeq(0), 700);
      return () => window.clearTimeout(holdRef.current);
    }
  }, [seq, sequencing, paused, strokeCount]);

  const revealColors = !animal.colorReveal || coloringNow || frozen || afterReveal;

  return (
    <svg
      className="drawing"
      viewBox={animal.viewBox}
      role="img"
      aria-label={`How to draw a ${animal.name}, step ${stepIndex + 1}`}
    >
      {/* Invisible helper path used only to measure stroke lengths. */}
      <path ref={measureRef} fill="none" stroke="none" aria-hidden="true" />

      {/* Pass 1: color fills, behind everything. The current step's regions fade
          in one at a time (see fillOrder); earlier steps' fills stay solid. */}
      {visible.map(({ step, si }) =>
        step.fills?.map((f, fi) => {
          // Frozen (finished/celebration) shows every fill solid with NO fade:
          // using fill-current here re-ran the fade-in on all fills at once, so
          // pressing next on the last colour step flashed every colour away for
          // a moment. fill-done is opacity 1 with no animation.
          let className = frozen
            ? "fill-done"
            : si === stepIndex
              ? "fill-current"
              : "fill-done";
          let style: React.CSSProperties | undefined;
          let onAnimationEnd: (() => void) | undefined;
          let key = `fill-${si}-${fi}`;

          // Sequence the current colour step's regions once they're measured.
          if (
            animatingFills &&
            si === stepIndex &&
            fillOrder.length === colorFills.length
          ) {
            const pos = fillOrder.indexOf(fi);
            if (pos < fillSeq) {
              className = "fill-seq-done";
            } else if (pos === fillSeq) {
              className = "fill-seq-active";
              style = {
                "--fill-dur": `${fillDuration}s`,
                animationPlayState: paused ? "paused" : "running",
              } as React.CSSProperties;
              onAnimationEnd = () => setFillSeq((s) => (s === pos ? s + 1 : s));
              // Remount when (re)activated so the fade restarts cleanly.
              key = `fill-${si}-${fi}-a${fillSeq}`;
            } else {
              className = "fill-seq-pending";
            }
          }

          return (
            <path
              key={key}
              d={f.d}
              fill={f.color}
              stroke="none"
              className={className}
              style={style}
              onAnimationEnd={onAnimationEnd}
            />
          );
        }),
      )}

      {/* Pass 2: outline strokes, on top of the fills. */}
      {visible.map(({ step, si }) => {
        const isCurrent = si === stepIndex;
        const strokeColor = revealColors ? step.color ?? animal.color : PENCIL;
        // While this step is animating we draw its sub-paths one at a time;
        // other steps (and frozen/coloring states) render their strokes whole.
        const paths = isCurrent && sequencing ? currentSegments : step.strokes;

        return paths.map((d, ki) => {
          // Decide how this particular stroke renders.
          let className: string;
          let style: React.CSSProperties | undefined;
          let onAnimationEnd: (() => void) | undefined;

          if (!isCurrent) {
            // Earlier step: solid once the picture is complete (final reveal,
            // celebration, a post-reveal step like writing the name, or reduced
            // motion), otherwise faded to highlight the current step. Solid
            // matters for pictures whose colour comes from strokes (paintings,
            // family, rainbow) — they'd look washed out faded.
            className = pastSolid ? "stroke-final" : "stroke-done";
          } else if (allSolid || reduce) {
            className = "stroke-final";
          } else if (ki < seq) {
            className = "stroke-seq-drawn"; // already drawn this loop
          } else if (ki === seq) {
            className = "stroke-seq-active"; // the one being drawn now
            style = {
              "--seg": `${segDuration(ki)}s`,
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
              strokeWidth={step.strokeWidth ?? 4}
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
