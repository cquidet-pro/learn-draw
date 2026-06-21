---
name: add-drawing
description: >-
  Add a new drawing (animal, object, scene, painting, flag, sticker, or
  character) to Learn to Draw, following this repo's data-driven conventions,
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
  - **Near-identical colours merge into one step.** Fills are clustered by RGB
    distance (≤ 36), so visually-the-same shades share a step (e.g. the Dog's dark
    eyes `#3a2a20` and dark nose `#42301f` colour together) while each region
    keeps its own exact shade. To force two regions into the **same** step give
    them the same/very close colour; to keep them **separate** make the colours
    differ by clearly more than ~36 in RGB.
  - **Order is automatic, by geometry.** Colour steps run **bottom-to-top** (each
    group by its lowest on-screen region, so the big body/background colours
    first). **Within** a step the regions fade in **one at a time**, bottom-to-top
    then left-to-right (e.g. nose → left eye → right eye; left cheek → right
    cheek). You don't order anything — it's measured from the path bounds.
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

Run `npm run build` first (it's `tsc -b && vite build`, so it type-checks).

Then verify **visually with headless Chromium** — you cannot judge SVG by
reading it. Recipe used throughout this repo:

```bash
# 1. Build with relative paths so file:// / a tiny static server works
npx vite build --base ./ --outDir /tmp/relbuild
# 2. playwright-core is pruned by the SessionStart hook — reinstall each run
npm install --no-save playwright-core@1.56.1
# 3. Drive it: chromium at /opt/pw-browsers/chromium-1194/chrome-linux/chrome,
#    env PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers, serve /tmp/relbuild over http.
#    Use context { reducedMotion: "no-preference" } to SEE animation;
#    "reduce" renders every step instantly solid (handy for final-state shots).
#    Advance with the "Next step" button until the ".step-indicator" reads X / X.
#    Screenshot the ".drawing" element and Read the PNG.
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
