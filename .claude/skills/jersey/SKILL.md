---
name: jersey
description: >-
  Build (or refine) a step-by-step "draws itself" football jersey — or any
  drawing reconstructed from a sequence of hand-drawn reference step photos — as
  a clickable preview page in Learn 2 Draw. Use when the user provides numbered
  reference drawings (stepN.png) and wants each step reproduced as an animated,
  clickable build-up whose FINAL coloured frame matches their reference exactly.
  Covers extracting what each step adds (inked-line diff, ignoring pencil
  guides), authoring the modular SVG step data, the clickable page, and the
  mandatory per-step compare-and-zoom verification. NEVER report "done" without
  re-verifying the final coloured result against the reference.
---

# Build a clickable, reference-matched jersey

This skill reconstructs a drawing from a set of **numbered hand-drawn reference
photos** (`step1.png … stepN.png`) into an animated, **clickable** step-through
preview. It was created from the MBAPPE #10 jersey. The living example is:

- Data: `public/jersey.steps.js`
- Page: `public/jersey-preview.html` (served at `/jersey-preview`, `noindex`)

Read `CLAUDE.md` first for repo conventions. This is a **standalone preview**
page (not an `Animal` in the app grid) — good for iterating before any
integration. Keep it `noindex`.

> ## The one rule that overrides everything
> **Never tell the user "it's done" until you have re-verified the final
> COLOURED frame against their reference, step by step, zoomed in.** Almost every
> mistake is invisible in the line-art and only shows once filled. Build the
> comparison sheet, look at it, fix what's off, and only then report — always
> describing what you verified.

## 0. Mindset

- A drawing is **data, not code**: a list of steps, each introducing only the
  **new** strokes for that step. Past strokes persist; the current step animates.
- The reference photos contain **faint pencil guides** the artist uses to plan.
  **Ignore the pencil — compare only the darkened (inked) lines.** Confirm with
  the user which lines are "real" if unsure.
- Some reference photos are **re-inking passes** (the artist goes over existing
  lines). They add no new content. Decide with the user how to map them: usually
  keep the same step count but split a big addition (a number, the name) into
  sub-steps so **every click adds something visible**.

## 1. Read every reference step

`Read` each `stepN.png`. For each consecutive pair, work out what was **added**.
Don't eyeball alone — the photos shift between shots. Use a mask-based diff that
keys on inked (dark) pixels only and cancels lines that merely moved:

```python
# venv: python3 -m venv venv && ./venv/bin/pip install pillow numpy
import numpy as np
from PIL import Image
SRC="/path/to/screenshots"; W=560
def mask(n,dark=110):
    im=Image.open(f"{SRC}/step{n}.png").convert("L")
    h=int(im.height*(W/im.width)); g=np.asarray(im.resize((W,h)),np.uint8)
    return g<dark                                   # inked lines only (ignores pencil)
def dilate(m,r):
    o=m.copy()
    for dy in range(-r,r+1):
        for dx in range(-r,r+1): o|=np.roll(np.roll(m,dy,0),dx,1)
    return o
def align(a,b,rng=16):                              # shift b to max overlap with a
    best,bo=(0,0),-1; af=a.astype(np.float32)
    for dy in range(-rng,rng+1,2):
        for dx in range(-rng,rng+1,2):
            ov=np.sum(af*np.roll(np.roll(b,dy,0),dx,1))
            if ov>bo: bo,best=ov,(dy,dx)
    return best
def diff(p,c,dil=7):                                # red = newly added strokes
    a=mask(p); b=mask(c); H=min(a.shape[0],b.shape[0]); a,b=a[:H],b[:H]
    dy,dx=align(b,a); a2=np.roll(np.roll(a,dy,0),dx,1)
    new=b & ~dilate(a2,dil)
    canvas=np.full((H,W,3),255,np.uint8); canvas[b]=[200,200,200]; canvas[new]=[210,20,20]
    Image.fromarray(canvas).save(f"/tmp/d_{p}_{c}.png")
```

`Read` the resulting `d_*.png` (a contact sheet helps) to confirm, step by step,
exactly what each photo introduces. This is the literal "remove the identical
part" method.

## 2. Author the step data — `public/jersey.steps.js`

Mirror the existing file. Key conventions:

- **`viewBox "0 0 200 240"` — taller than wide** (a jersey is a portrait
  rectangle, unlike a square flag). The page sets `aspect-ratio:200/240`.
- `steps[]`: each `{ hint, strokes:[...] }` lists ONLY the `d` strings introduced
  at that step. Build from primitives; circles as
  `M cx-r,cy a r,r 0 1,0 2r,0 a r,r 0 1,0 -2r,0`.
- **Colour happens last, with no new strokes** — the final steps carry
  `{ hint, strokes:[], fills:"<group>" }`. White is paper; only real colours
  animate, revealed in waves (e.g. red, then blue sleeves, then blue body).
- `fills` groups are painted **bottom→top in a fixed z-order**, INDEPENDENT of
  reveal order, so trim sits on top of the base: e.g.
  `["blue-body","blue-sleeves","red","white","name-white"]`. Getting this wrong
  hides the red trim under the blue body — a classic bug.
- A fill entry is either `{ d, color }` (filled region) or
  `{ d, stroke, width }` (a stroke overlay). The **white name** is a stroke
  overlay drawn on top of the navy letter outlines → white letters with a thin
  dark edge. (Single-stroke letters can't be "filled"; the overlay trick gives
  the white-on-blue look the reference has.)
- Keep elements INSIDE the body: a number that pokes past the side seam is wrong.
  Size the "10" to fit between the side stripes; centre it vertically in the back.

## 3. The clickable page — `public/jersey-preview.html`

Reuse the existing page. It must provide:

- **◀ Back / Next ▶ / ↺ Restart / ▶▶ Play-all**, plus `←`/`→`/Space/Backspace.
- A **step counter** (`Step n / N`) and the per-step **hint**.
- Each step's new strokes "draw themselves" (`stroke-dashoffset` via
  `getTotalLength`); colour steps **fade** their freshly-revealed fill group.
- `#N` hash **deep-link** to a step (e.g. `/jersey-preview.html#13`) for refining.
- Honour `prefers-reduced-motion`.

## 4. Verify — per step, against the reference, zoomed (MANDATORY)

This is the heart of the skill. Do NOT skip and do NOT trust the outline.

1. Render each **cumulative** step in isolation with a tiny throwaway
   `public/_one.html?step=N` (same z-order logic as the page, no UI chrome,
   400×480), served via `python3 -m http.server` + headless Chrome
   `--screenshot`. Delete `_one.html`/`_grid.html` before committing — temp files
   in `public/` would deploy.
2. Build a **comparison sheet**: for every step, your render beside the matching
   `stepN.png`, at a size big enough to **zoom**. `Read` it.
3. For each step check: is the **same element added** as the reference? Right
   **position, size, proportion**? Does the **final coloured frame** match —
   colours, trim placement, white number/name, nothing poking outside the body?
4. Fix the data, re-render, rebuild the sheet, repeat until it lines up.
5. Run `npm run build` (type-check + ensures the files copy into `dist/`).
6. Confirm `dist/jersey-preview.html` and `dist/jersey.steps.js` exist.

Only after this passes do you describe the result — stating you compared all
steps against the reference and what you checked.

## 5. Ship (if asked)

Follow the repo's branch → PR → merge → watch-deploy flow (see the auto-PR
workflow). Confirm scope first: a **preview** stays `noindex` and is not wired
into the app grid unless the user explicitly asks to integrate it.
