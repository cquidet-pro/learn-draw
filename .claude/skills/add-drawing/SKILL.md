---
name: add-drawing
description: >-
  Add a new drawing (animal, object, scene, painting, or character) to Learn to
  Draw, following this repo's data-driven conventions, and run the checks that
  keep the animation and layout correct. Use when the user asks to "add a
  drawing", "add a new animal/picture", "create a <subject> to draw", add a
  difficulty level of an existing subject, add a Famous Painting, or wants the
  "write the name" finale on a hard-mode drawing. Covers authoring the SVG path
  data, registering it, and the full verification checklist (build, one-pencil
  animation, no stray dots, solid final picture, name/overlap, card preview).
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
- A step's strokes share one colour (`step.color`). For multi-colour art, split
  into multiple steps, or use `fills`.
- `fills` are painted behind the outlines, so a final "Now color it all in! 🖍️"
  step (with `strokes: []` and a `fills` list) tints without hiding the lines.
- `colorReveal: true` keeps strokes pencil-grey until the coloring step — only
  for drawings whose colour comes from stroke colour (e.g. the stick-figure
  Family, the Rainbow). The animator reveals colour from the coloring step
  onward (see `afterReveal` in `AnimatedDrawing.tsx`).

### You can't see while you type — always verify visually (see §5).

## 4. Hard-mode "write the name" finale (level 10)

Every level-10 drawing ends with a step where its name is written one
pen-stroke at a time, so kids learn to write it. Use the helper:

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
defined — add a glyph to `GLYPHS` if a new name needs a missing letter.

Place the word in the drawing's **clear band** — usually a caption just below
the art; move it to the top (small baseline) when the bottom is busy. It must
clear any ground/grass line (see the overlap check in §5).

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
- [ ] **Hard-mode name doesn't overlap the drawing** — rasterize the name layer
  and the art layer separately from the same SVG DOM and count where they
  coincide; aim for ~0%. (Don't diff two different steps — a fade-in animation
  and sub-pixel shift give false positives.) Identify name paths as the trailing
  run of stroke `#118ab2` paths. Nudge `baseline`/`cx`/`height` until clear; mind
  the ground/grass line.
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
