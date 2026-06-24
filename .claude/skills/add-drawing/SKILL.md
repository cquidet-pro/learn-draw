---
name: add-drawing
description: >-
  Add a new drawing (animal, object, scene, painting, flag, sticker, or
  character) to Learn 2 Draw, following this repo's data-driven conventions,
  and run the checks that keep the animation and layout correct. Use when the
  user asks to "add a drawing", "add a new animal/picture", "create a <subject>
  to draw", add a difficulty level of an existing subject, add a Famous Painting
  or flag. EVERY new drawing ends with the automatic "write the name" step.
  Covers authoring the SVG path data, registering it, and the full verification
  checklist (build, one-pencil animation, no stray dots, solid final picture,
  name/overlap, card preview).
---

# Add a new drawing

A drawing is **data, not code**. Each one is an `Animal` object (the name is
historical — it really means "a drawing"). You author SVG path data; the app
animates it. Read `CLAUDE.md` first — this skill assumes its conventions.

## 1. The data model

Defined in `src/data/animals.ts`:

```ts
interface DrawStep {
  strokes: string[];     // SVG path `d` strings introduced this step (these animate)
  hint: string;          // friendly instruction shown big
  color?: string;        // per-step stroke colour (overrides the base `color`)
  fills?: { d: string; color: string }[]; // solid colour shapes, painted BEHIND the strokes
}
interface Animal {
  id: string;            // unique across ALL drawings (progress + lookups use it)
  name: string;
  emoji: string;
  viewBox: "0 0 200 200";
  color: string;         // base stroke colour
  level?: 5 | 7 | 10;    // default 5. UI labels: Easy / Medium / Harder
  colorReveal?: boolean; // strokes stay pencil-grey until the "color it in" step
  artist?: string;       // Famous Paintings only
  fact?: string;         // shown on completion (paintings)
  image?: string;        // Famous Paintings only — real artwork shown side by side
  steps: DrawStep[];
}
```

**All coordinates live in a 200×200 viewBox and the SVG clips to it — keep every
point inside 0–200 or it vanishes.**

## 2. Steps to add one

1. Create `src/data/drawings/<id>.ts` exporting an `Animal`
   (or `src/data/paintings/<id>.ts` for a masterpiece).
2. Register it:
   - regular drawings → the `animals` array in `src/data/animals.ts`
   - masterpieces → the `masterpieces` array in `src/data/masterpieces.ts`
3. Difficulty: set `level: 7` or `level: 10` and use a distinct `id` (e.g.
   `dog-7`). The same subject at multiple levels lives in separate files.
4. Optional voice aliases (extra spoken words → this drawing) go in the
   `ALIASES` map in `src/components/HomePage.tsx`, keyed by `id`. The spoken
   name already works via fallback without an entry.

## 3. Authoring the paths

- Build from primitives: circle =
  `M cx-r,cy a r,r 0 1,0 2r,0 a r,r 0 1,0 -2r,0`; plus `L`/`Q`/`C` for the rest.
- **One pen-stroke per array entry.** The animator draws the current step's
  strokes ONE AT A TIME and, within a stroke, splits on each absolute `M` into
  separate segments (`splitSubpaths` in `AnimatedDrawing.tsx`). So a stroke with
  two `M` sub-paths (e.g. two arms) draws as two separate pencil strokes — good.
  Use **absolute `M`** for every new sub-path; a relative `m` after the first
  sub-path would be mis-split (none exist in the repo — keep it that way).
- **Order strokes the way a child would draw them**: main outline/body first,
  then features (ears → eyes → nose → mouth → limbs → accessories). Never draw a
  detail before the shape it sits on.
- **Connected limbs — legs, arms, necks, tails, ears, etc. MUST touch the body.**
  Start each appendage a few units *inside* the shape it grows from (overlap by
  ~4–8 units), never with a gap. A floating limb reads as broken. The reliable
  trick: give a body a roughly **flat edge** where limbs attach (a rounded-loaf
  outline like Cat/Dog: `M ... C ... L <flat bottom> C ...`) and start all the
  legs ~2–4 units above that edge, so every leg visibly joins the body. Don't
  hang legs off the bottom of a pure ellipse — the curved sides leave gaps at
  the outer legs. Verify the join after coloring (see §5).
- A step's strokes share one colour (`step.color`). For multi-colour art, split
  into multiple steps, or use `fills`.
- `fills` are painted behind the outlines, so a final "Now color it all in! 🖍️"
  step (with `strokes: []` and a `fills` list) tints without hiding the lines.
- **How the colouring works (automatic — author ONE colour step).** You author a
  single "color it in" step (`strokes: []` + a `fills` list). At play time
  `expandColorSteps` (in `src/data/expandColor.ts`, applied by `DrawingPlayer`)
  turns it into the real, child-paced colouring sequence — you do **not** create
  the per-colour steps yourself. What it does, and what to author for:
  - **One real step per colour.** The single fills step is split so each colour
    becomes its own navigable step (the step counter grows, e.g. the Dog goes
    6→10). The child fills one crayon's worth, then presses on. The first colour
    keeps your step's `hint`; the rest show "Now the next colour! 🖍️".
  - **Similar colours merge AND flatten to one shade.** Fills that read as the
    same colour are grouped into one step and painted a single flat colour (the
    group's largest region wins), so subtle shading doesn't add steps or look
    muddy. "Same colour" = near-identical (RGB ≤ 36) **or** same colour family
    (hue within 25°) and not too far apart (RGB < 80). So two greens or two pinks
    become one; but a different hue (pink cheek on a tan face) or a far shade
    (brown ear on a tan head, RGB ~100) stays its own colour. Tune the constants
    (`RGB_SAME`, `HUE_SAME`, `RGB_FAMILY`) in `src/data/expandColor.ts`. Don't
    rely on subtle same-family shade differences to read as distinct — they'll be
    flattened; use a clearly different hue or a big lightness gap instead.
  - **Order is automatic, by geometry.** Colour steps run **bottom-to-top** (each
    group by its lowest on-screen region, so the big body/background colours
    first). **Within** a step the regions fade in **one at a time**, bottom-to-top
    then left-to-right (e.g. nose → left eye → right eye; left cheek → right
    cheek). You don't order anything — it's measured from the path bounds.
  - **Colours fill AROUND not-yet-coloured regions.** Any region whose colour
    step hasn't been reached yet (a later colour, or a not-yet-reached region of
    the current step) is shown as a paper hole, so a base colour never bleeds
    *under* the features painted later — the big head fills around the ears, eyes
    and nose, which then fill on their own turn. So you can safely author a base
    as one big overlapping shape (e.g. a full head circle) with the features as
    separate fills on top; the engine reserves each as paper until its turn. The
    final picture is unchanged; only the in-progress steps colour around.
  - **White is paper, never a colour step.** The child draws on a white sheet,
    so you never colour white on top of another colour — you colour *around* it.
    Any near-white fill (≤16 from `#ffffff`) is treated as paper: an overlay
    white (the Swiss cross over red, an eye sparkle over the dark eye) becomes a
    paper-coloured hole drawn on top of the colour beneath it (revealed with that
    colour's step, so the colour fills around it), and a background white (a
    flag's white field) is dropped — the canvas already is the paper. **Still
    author the white fills** as normal `#ffffff` fills in stacking order; the
    engine converts them. Don't invent a "colour it white" step.
  - **Document order still controls stacking** (later fills paint on top),
    independent of reveal order — author base/background fills first, details
    after. Reveal order never changes the final picture.
  - Pace follows the speed slider; it runs once and holds the finished picture.
    Reduced-motion and the celebration show every fill solid at once.
  - **So: author the fills in stacking order with honest per-region colours, and
    let the engine split/merge/sequence.** Don't pre-split colours into separate
    authored steps — that would double up the splitting.
- `colorReveal: true` keeps strokes pencil-grey until the coloring step — only
  for drawings whose colour comes from stroke colour (e.g. the stick-figure
  Family, the Rainbow). The animator reveals colour from the coloring step
  onward (see `afterReveal` in `AnimatedDrawing.tsx`).

### Standard motifs — draw these the same way every time

- **Sun ☀️** — a filled disc with **eight short rays** evenly around it (N, NE,
  E, SE, S, SW, W, NW), like the emoji — never a bare circle or a 4-spoke cross.
  Recipe for centre `cx,cy`, disc radius `r`, rays from `r+3` out to `r+10`
  (diagonals use the `0.71` factor). Draw the disc as one stroke and the eight
  rays as one stroke (eight `M…L` sub-paths), then fill the disc `#ffd23f` /
  rays `#f4a300`. Example at `cx=170, cy=34, r=12`:
  ```
  // disc
  "M 158,34 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0"
  // 8 rays (N,S,E,W then the four diagonals)
  "M 170,19 L 170,12 M 170,49 L 170,56 M 185,34 L 192,34 M 155,34 L 148,34 \
   M 181,23 L 186,18 M 159,23 L 154,18 M 181,45 L 186,50 M 159,45 L 154,50"
  ```

### Flags — match a reference, and avoid these specific pitfalls

Flags live in `src/data/flags.ts` (not `drawings/`). They share helpers and a
fixed **3:2 box** (`L,T,R,B` / `RECT`). Every flag we ship has been wrong at
least once; this checklist is the hard-won fix list.

**Prefer authoritative NUMERIC data over your own eyes.** You cannot reliably
judge geometry from a screenshot — hand-placing/eyeballing stars, crescents, and
leaves failed repeatedly here, while pulling exact data worked first try. So when
positions, sizes, point-counts, or a shape matter, **`curl` the official flag SVG
from Wikimedia and read the coordinates** (`<use x= y=>`, `transform`, `scale`,
the path `d`), then compute the mapping into our box (by fraction:
`x = L + fracX*W`, `y = T + fracY*H`; scale radii by height). This is how Canada's
leaf and Australia's Southern Cross were finally right.

**Then still verify against an authoritative reference — never ship from memory.**
If the user gives a reference image, compare to it; otherwise fetch one. Render
the flag from the real data, put it **side-by-side** with the reference, and
treat the render as a sanity check on the data — not as the source of truth.

**Check explicit properties of every emblem, one by one — "looks roughly right"
is how the Singapore crescent shipped flipped *and* with the stars overlapping
the moon.** For each emblem write down and confirm, by zooming into a crop (not
the thumbnail): **orientation** (which way does the crescent/swirl/leaf face?),
**no overlap** between separate elements, **symmetry**, **count** (50 stars? 5
stars? 13 stripes?), and **colours**. Tick each one against the reference.

**Rendering a flag to compare (the build trick that actually works):**
`npm run build` fails locally at `tsc` (a pre-existing `vite.config.ts` node
types error), so it never produces `dist`. To see a flag, bundle just the data
with esbuild and render the *final* state (all `fills`, then the outline
`strokes` at their `strokeWidth`):
```bash
npx esbuild src/data/flags.ts --bundle --format=esm --outfile=/tmp/flags.mjs
# tiny node script: import {flags}, build an <svg> = fills (stroke none) + strokes
# (fill none, stroke=step.color, stroke-width=step.strokeWidth??4), screenshot
# with headless Chrome, then put it next to the user's reference at equal size.
```
For a UI/preview build use `npx vite build` (skips tsc) + `npm run preview`.

**Pitfalls — each of these shipped wrong once:**
- **Colour fills a shape the child already DREW — it never conjures new shapes.**
  Every coloured region should have its outline drawn in an earlier guide step, so
  the colour step just fills it in. If a shape exists *only* as a fill (no guide
  stroke), it pops into existence at colour time, which reads as "the crayon is
  adding a shape, not colouring" (shipped wrong on Portugal's sphere rings and the
  whole UK Union Jack — both formed entirely during colouring). Fix: draw the
  emblem's structure as line-art in the badge/detail step. Guide strokes that
  shouldn't show as dark lines use the vanishing-colour trick below (Portugal's
  sphere is dark line-art around the shield; the UK's red cross + saltire are drawn
  as **red** strokes that vanish into the red fills). White regions are the
  exception — they can't be drawn on the white box, so the white saltire/cross
  still form as the navy fills around them; that's fine, it's the *coloured* shapes
  that must be pre-drawn.
- **Outline strokes are drawn ON TOP of the fills in the final picture** (pass 2).
  Any dark guide line you add for the animation stays visible over the colours.
  - For a border it's fine. For *internal* guide lines that shouldn't appear in
    the design (e.g. the UK saltire/cross construction lines), give the stroke
    **the flag's own colour** (red) so it vanishes into the matching coloured
    band — don't use the dark `OUTLINE`. Black diagonal/cross lines over the
    Union Jack are the classic bug.
  - Same trick for a **guide step that draws small emblems** (e.g. the USA's 50
    stars): draw them in the colour of the region they sit in (the canton navy),
    NOT the dark `OUTLINE`. They're clearly visible on the still-white region as
    the child draws them, then vanish into that region's fill in the finished
    flag, leaving the clean white star shapes. A heavy dark `OUTLINE` stroke over
    a tiny star swallows the white and leaves dark blobs.
  - `flag()` already thins every flag's strokes to **1.5px** (flat colour
    regions read cleanest crisp, not bold). Don't override unless needed.
- **Crosses: draw ONE plus-shaped outline, never two overlapping rectangles.**
  Two bar rectangles each get outlined, leaving a black-outlined **square where
  they cross** (hit Switzerland, Denmark, the Greek canton). Use `plusOutline(…)`
  for the stroke; the fills can stay as two rects.
- **Same 3:2 box for every flag.** Don't give one its own proportions
  (Switzerland was square and stuck out). Use `frame()`/`RECT`.
- **Stripe step hints state the COUNT** — "Add 13 stripes across" / "Add 3
  stripes up and down", never a vague "add the stripes across". Use the number of
  colour bands the child ends up with (13 for the USA, 3 for a tricolour, 9 for
  Greece). The `striped()` helper does this from `bands.length`; match it in any
  hand-written striped flag.
- **An enclosed sub-region (canton, badge box) is drawn right after the frame,
  then the divisions are drawn AROUND it — never the other way round.** Two things
  go wrong if you draw all the stripes/divisions first and the box last:
  (1) the dividers that pass under the box show as **stray lines** over it
  (Greece), and (2) the **animation order is illogical** — a child draws the
  outer rectangle, then the corner box, then fills the stripes in around it; they
  don't rule every line across the whole flag and *then* discover a square in the
  corner (USA, fixed June 2026). So order the steps `frame → box → divisions`,
  and start each divider that would cross the box at the **box's edge**, not `L`
  (the divider that coincides with the box's far edge can stay full-width). The
  USA flag (`usa` in `flags.ts`) and Greece both follow this pattern — copy it.
- **Taegeuk (South Korea) is easy to get rotated 90° or mirrored.** Correct:
  red **on top**, blue on the bottom, split by a **horizontal** S — red dips
  down on the **left**, blue rises up on the **right**. Render candidate
  sweep-flag combos and compare to the reference; don't trust the arc flags by
  eye. Its four trigrams sit on the diagonals **tilted 45°** (bars point at the
  centre), not as flat horizontal bars.
- **Crescents (Singapore): use a real lune path** (`crescent(…)`), not a white
  circle with a field-colour "bite" circle — fill ordering paints the bite under
  the moon and you see a **full circle**. SVG arc flags are *ambiguous*: the same
  two endpoints admit two circle centres, so the wrong `large-arc`/`sweep` combo
  silently **flips the crescent** (opens left instead of right) — which shipped
  once. Don't reason the flags out by eye; render the four flag combos in a grid
  and pick the one matching the reference (the working combo is in `crescent()`;
  re-verify if you touch it). Singapore's crescent opens **right** (toward the
  fly) and its five stars sit in a pentagon **clear of** the moon, not on it.
- **Complex official emblems (Canada maple leaf, coats of arms): don't hand-trace
  them.** Hand-drawn maple leaves came out as snowflakes/stars over many
  attempts. Instead **fetch the official public-domain flag SVG** (e.g.
  `curl` the Wikimedia "Flag of X.svg"), pull out the emblem's path, and
  **parse → convert to absolute → uniform-scale/translate** it into our box (a
  ~30-line node script; keep its arcs). That's how Canada's leaf was finally
  right — it *is* the official path. For a genuinely simple shape you may author
  by hand, but render it **big** and compare to the reference.
- **Constellations/star groups: use the OFFICIAL positions, never scatter by
  hand.** Hand-placing Brazil's stars looked random and "wrong/too many".
  Pull the real `<use x= y=>` coordinates and sizes from the official SVG and map
  them in (point-count, position, and relative size all come from the data).
- **Reducing a busy emblem: cut the COUNT, keep the SPREAD.** When the faithful
  version is too dense for our small flag, drop stars but **sample across the
  whole region — the brightest one from each cluster** — keeping each at its
  official position. Do NOT take a spatially-contiguous subset (e.g. only the
  Southern Cross): nearby stars clump into a tiny blob and stop reading as the
  flag. Bump a size multiplier so the survivors are visible.
- **How simplified is a user preference — ask, don't keep guessing.** "How many
  stars / how much detail" has no single right answer for the kid version. If a
  reference is faithful but the user calls it "too busy", and you've guessed
  wrong once, ask which density they want (e.g. ~9 / ~14 / all) rather than
  iterating blind.
- New stars/circles/crosses already have helpers: `star` (pass `points` for
  7-pointed etc.), `circle`, `rectPath`, `plusOutline`, `crescent`, and
  `clipPoly` for clipping a band/region to a shape. Reuse them.

### You can't see while you type — always verify visually (see §5).

## 4. The "write the name" finale — ALWAYS add it

**Every drawing ends with a step that writes its name** one pen-stroke at a
time, so kids learn to write the word too. This is now the default for **all
categories** — animals (every level, not just hard mode), flags, paintings, and
stickers/friend drawings. Never ship a new drawing without it. Use the helper:

```ts
import { nameStep } from "../handwriting";
// ...as the LAST entry of `steps`, AFTER the "color it in" step:
nameStep("DOG", { baseline: 192, height: 20 }),     // centred caption
nameStep("BUTTERFLY", { baseline: 26, height: 15 }), // up top where the bottom is busy
```

`nameStep(word, opts)` (in `src/data/handwriting.ts`) lays the word out as
capital-letter strokes. Options: `cx` (default 100), `baseline` (bottom of the
letters, default 192), `height`, `maxWidth` (default 184, auto-shrinks), `color`
(default blue `#118ab2`), `hint`. Only the letters A–Z used by current names are
defined — **add a glyph to `GLYPHS` if a new name needs a missing letter**
(then verify it visually like everything else).

Place the word in the drawing's **clear band** — usually a caption just below
the art; move it to the top (small baseline) when the bottom is busy. It must
clear any ground/grass line (see the overlap check in §5).

### Per-category: where the name step comes from

- **Animals / objects / scenes** (`src/data/drawings/*.ts`): add the `nameStep`
  yourself as the last entry of `steps`, at **every** level (5/7/10).
- **Flags** (`src/data/flags.ts`): added **automatically** — the `withName`
  mapper appends `nameStep(name, …)` to every flag in the exported array, so a
  new flag added to that array gets its name for free. Don't add a second one.
- **Paintings** (`src/data/paintings/*.ts`): add a `nameStep` with the work's
  title as the last step (keep it short so it fits beside the side-by-side
  image; nudge `cx`/`baseline` so it doesn't cover the sketch).
- **Stickers / friend drawings** (`src/data/friends.ts` and any reused drawing):
  add the `nameStep` so the reward animal's name is written too.

If you build a whole new collection (like flags), prefer the same centralized
`withName`-style mapper over hand-adding the step to each item — one place to
get right, impossible to forget.

## 5. Verification checklist — DO ALL OF THESE

**Type-check:** run `npx tsc -b`. On this macOS checkout it also reports two
pre-existing `vite.config.ts` "Cannot find module 'node:fs'" errors (missing
`@types/node`) — those are environmental; only care about errors in the file you
touched. `npm run build` chains `tsc -b && vite build`, so it stops at those tsc
errors and never builds `dist` locally — use **`npx vite build`** when you need a
real build (it skips tsc).

Then verify **visually with headless Chrome** — you cannot judge SVG by reading
it. Two methods (no playwright in this env; use the system Chrome at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`):

```bash
# A. Render just the data (fast; the workhorse all over this repo). Bundle the
#    data module with esbuild, then a tiny node script builds an <svg> from the
#    fills/strokes and screenshots it; Read the PNG.
npx esbuild src/data/flags.ts --bundle --format=esm --outfile=/tmp/x.mjs
#    ...node script imports {flags}, emits <svg>, then:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --screenshot=/tmp/out.png --window-size=400,400 /tmp/x.svg

# B. Drive the real app / run logic that needs the DOM (e.g. expandColorSteps,
#    getBBox). `npx vite build` then `python3 -m http.server` an HTML page that
#    imports the bundle; capture results with --dump-dom or --screenshot and
#    --virtual-time-budget for async work. (This is how the A/B colour-stacking
#    sweep runs — see the "Overlapping layers" check below.)
```

Check each of these:

- [ ] **Builds clean** — `npm run build` has no type errors.
- [ ] **Inside the frame** — nothing clipped; all points within 0–200.
- [ ] **One pencil at a time** — at any instant during a step exactly one
  segment is mid-draw. Assert in-page: `.drawing path.stroke-seq-active`
  length is `1`, never more.
- [ ] **No stray dots at a step's start** — not-yet-drawn segments are hidden
  (`.stroke-seq-pending { visibility: hidden }`). With `stroke-linecap: round`,
  a dash-hidden path otherwise paints a dot at its start. At a step's first
  frame only the active stroke should be visible.
- [ ] **Logical stroke order** — watch a full step; it should draw the way a
  child would.
- [ ] **Final picture is fully solid & coloured** — on the last step and the
  celebration every stroke is `stroke-final` (not faded) and `fills` show. This
  matters most for fill-less art (paintings, Family, Rainbow).
- [ ] **Colouring splits sensibly** — step through the auto-generated colour
  steps: the counter should grow (one step per colour), each step should add one
  colour bottom-to-top, regions within a step fill one-at-a-time, and visually
  identical shades should land in the **same** step (tune the authored colours if
  two that look alike split, or two distinct ones merge).
- [ ] **Overlapping layers keep their stacking — A/B sweep vs the colour-step
  expansion.** `expandColorSteps` splits a colour step into ONE STEP PER COLOUR;
  it now preserves authored stacking (contiguous-by-overlap clustering +
  topological order + geometry-based paper attachment), so a small emblem over a
  big background no longer gets painted over. Still verify — it's the bug that
  silently hid Brazil's band text, Spain's arms, Portugal's shield, and even the
  princess's hair: for each drawing render (a) the colour step's fills in
  **authored order** and (b) `expandColorSteps(drawing)`'s steps in **expanded
  order** (in a real browser — it needs `getBBox`), rasterise both and pixel-diff.
  A diff that *moves/hides* a shape is a stacking bug to chase in `expandColor.ts`;
  a diff that only shifts a *shade* is the intentional same-colour flatten (fine).
  Keep "one step per colour" — don't lump colours into one step to dodge this.
- [ ] **No colour flashes anywhere** — the picture must never blank or re-fade
  as colours appear. Watch three transitions in particular: moving between two
  colour steps, and pressing next on the **last** colour step so the finish
  stars (and then the celebration) appear — the colours must stay solid, not
  disappear and fade back. (These are handled by `AnimatedDrawing`: sequence
  resets happen during render, and frozen fills use `fill-done`, not the
  fading `fill-current` — don't reintroduce a fade there.)
- [ ] **The written name is present and doesn't overlap the drawing** — confirm
  the final `nameStep` actually renders (every new drawing must have one), then
  rasterize the name layer and the art layer separately from the same SVG DOM
  and count where they coincide; aim for ~0%. (Don't diff two different steps — a
  fade-in animation and sub-pixel shift give false positives.) Identify name
  paths as the trailing run of stroke `#118ab2` paths. Nudge
  `baseline`/`cx`/`height` until clear; mind the ground/grass line. If the name
  uses a letter with no glyph yet, add it to `GLYPHS` and re-verify.
- [ ] **Home card isn't doubled** — the card preview stops at the coloring step
  (`previewSteps` in `animals.ts`), so the written name must NOT show in the
  thumbnail, only the drawing + its text label.
- [ ] **Voice** — the spoken name opens it (add an `ALIASES` entry if it has
  common alternate names).

## 6. Copyright (do not skip)

Only original artwork or **public-domain** works. Never trace or recreate
copyrighted characters/paintings/tutorials, even redrawn as SVG. When asked for
those, build an **original** in the same spirit (see the original "Superhero"
and "Pop Star"). Bundled painting images are public domain from Wikimedia
Commons.

## 7. Ship it

`npm run build` once more, commit, push. A push to `main` triggers
`.github/workflows/deploy.yml` → GitHub Pages. Use the **watch-deploy** skill to
follow the deploy and notify when it's live at
`https://cquidet-pro.github.io/learn-draw/`.
