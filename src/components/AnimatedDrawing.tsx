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

  // The "color it in" step paints ONE COLOUR at a time, like a child reaching
  // for one crayon and using it everywhere before swapping. All regions sharing
  // a colour fill together as a single step; the colour groups go bottom-to-top
  // (the group whose lowest region sits lowest on screen colours first), so the
  // big body/background fills before the little features stacked on top.
  const colorFills = coloringNow && current?.fills ? current.fills : [];
  const animatingFills = colorFills.length > 0 && !reduce;
  // For each fill index, which colour-group turn it belongs to; plus the group
  // count and one "leader" fill per group used to advance the sequence once.
  const [fillPlan, setFillPlan] = useState<{
    pos: number[];
    count: number;
    leaders: number[];
  }>({ pos: [], count: 0, leaders: [] });
  useLayoutEffect(() => {
    const p = measureRef.current;
    const fills = coloringNow && current?.fills ? current.fills : [];
    if (!p || fills.length === 0) {
      setFillPlan({ pos: [], count: 0, leaders: [] });
      return;
    }
    const bottoms = fills.map((f) => {
      p.setAttribute("d", f.d);
      try {
        const b = p.getBBox();
        return b.y + b.height;
      } catch {
        return 0;
      }
    });
    // Group fill indices by colour (first-seen order within a colour preserved).
    const byColor = new Map<string, number[]>();
    fills.forEach((f, i) => {
      const arr = byColor.get(f.color);
      if (arr) arr.push(i);
      else byColor.set(f.color, [i]);
    });
    // Order the colour groups bottom-to-top by their lowest-on-screen region.
    const groups = [...byColor.values()];
    const groupBottom = (g: number[]) => Math.max(...g.map((i) => bottoms[i]));
    groups.sort((a, b) => groupBottom(b) - groupBottom(a) || a[0] - b[0]);
    const pos = new Array(fills.length).fill(0);
    const leaders: number[] = [];
    groups.forEach((g, gi) => {
      leaders.push(Math.min(...g));
      g.forEach((i) => {
        pos[i] = gi;
      });
    });
    setFillPlan({ pos, count: groups.length, leaders });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal.id, stepIndex]);

  // Which colour group is being painted now (0..count). Each group's fade scales
  // with the speed slider. Unlike the looping stroke steps, colouring runs once
  // and holds the finished picture — it's the finale, and replaying it would
  // make the colours flash away and rebuild.
  const [groupSeq, setGroupSeq] = useState(0);
  const fillDuration = Math.min(Math.max(duration * 0.3, 0.4), 1.1);

  // Restart both sequences whenever the step (or drawing) changes.
  useEffect(() => {
    setSeq(0);
    setGroupSeq(0);
  }, [stepIndex, animal.id]);

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

      {/* Pass 1: color fills, behind everything. The current "color it in" step
          reveals its fills one at a time (bottom-to-top); other steps' fills
          (and the frozen celebration) show solid. */}
      {visible.map(({ step, si }) =>
        step.fills?.map((f, fi) => {
          let className = si === stepIndex || frozen ? "fill-current" : "fill-done";
          let style: React.CSSProperties | undefined;
          let onAnimationEnd: (() => void) | undefined;
          let key = `fill-${si}-${fi}`;

          if (animatingFills && si === stepIndex) {
            const gp = fillPlan.pos[fi] ?? 0;
            if (gp < groupSeq) {
              className = "fill-seq-done";
            } else if (gp === groupSeq) {
              className = "fill-seq-active";
              style = {
                "--fill-dur": `${fillDuration}s`,
                animationPlayState: paused ? "paused" : "running",
              } as React.CSSProperties;
              // Advance once per colour group, driven by the group's leader fill.
              if (fillPlan.leaders[gp] === fi) {
                onAnimationEnd = () => setGroupSeq((s) => (s === gp ? s + 1 : s));
              }
              // Remount when this group (re)becomes active so the fade restarts.
              key = `fill-${si}-${fi}-a${groupSeq}`;
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
