# CLAUDE.md

Guidance for working in this repo. Read this first — it captures the architecture
and conventions so you can make changes quickly and safely.

## What this is

**Learn 2 Draw** — a playful, no-backend static website that teaches young
children to draw, step by step. Each step animates its strokes "drawing
themselves" on a loop. There are three difficulty levels and a "Famous Paintings"
section, plus optional hands-free voice control.

Stack: **React 18 + TypeScript + Vite**. Pure client-side; deployed as static
files to GitHub Pages.

## Commands

```bash
npm install
npm run dev      # local dev server (hot reload)
npm run build    # tsc -b && vite build  → dist/  (always run this to type-check)
npm run preview  # serve the built dist/ locally
```

Node is installed via Homebrew; if `npm` isn't found, prepend
`export PATH="/opt/homebrew/bin:$PATH"`.

## How a drawing works (the core idea)

A drawing is data, not code. Every drawing is an `Animal` object (the type name is
historical — it really means "a drawing": animal, object, scene, painting, or
character). Defined in `src/data/animals.ts`:

```ts
interface DrawStep {
  strokes: string[];   // SVG path `d` strings introduced at this step (these animate)
  hint: string;        // friendly instruction shown big
  color?: string;      // optional per-step stroke colour (overrides the base color)
}
interface Animal {
  id: string;          // unique across ALL drawings (completed-progress + lookups use it)
  name: string;
  emoji: string;
  viewBox: string;     // always "0 0 200 200"
  color: string;       // base stroke colour
  level?: Level;       // 5 | 7 | 10 (default 5). UI labels: Easy / Medium / Harder
  artist?: string;     // "Famous Paintings" only
  fact?: string;       // shown on completion (paintings)
  image?: string;      // "Famous Paintings" only — real artwork shown side by side
  steps: DrawStep[];
}
```

The "draws itself" effect: each `<path>` has `pathLength="1"`, and CSS animates
`stroke-dashoffset` from 1 → 0 (`.stroke-drawing` in `src/index.css`). The current
step animates and loops; past steps are shown faded (`.stroke-done`); the finished
drawing freezes solid during the celebration (`.stroke-final`). See
`src/components/AnimatedDrawing.tsx`.

**All coordinates live in a 200×200 viewBox. The SVG clips to it — keep paths
inside 0–200 or they vanish.**

## Adding or editing a drawing

1. Create `src/data/drawings/<id>.ts` exporting an `Animal` (or
   `src/data/paintings/<id>.ts` for a masterpiece).
2. Register it in the relevant array:
   - regular drawings → `animals` in `src/data/animals.ts`
   - masterpieces → `masterpieces` in `src/data/masterpieces.ts`
3. For higher difficulty, set `level: 7` or `level: 10` and use a distinct `id`
   (e.g. `dog-7`). The same subject exists at multiple levels as separate files;
   levels 5/7/10 each currently have a full set of subjects.
4. Optional voice aliases (extra spoken words → this drawing) go in the `ALIASES`
   map in `src/components/HomePage.tsx`, keyed by `id`. Without an entry, the
   spoken name still works via fallback.

### Authoring tips (important — you can't see while you type)

- Build paths from simple primitives: circles as
  `M cx-r,cy a r,r 0 1,0 2r,0 a r,r 0 1,0 -2r,0`, plus `L`/`Q`/`C` for the rest.
- A step's strokes all share one colour. For multi-colour drawings, split into
  multiple steps (e.g. rainbow = one colour per step).
- **Always visually verify.** The fast way (used throughout this project): write a
  tiny throwaway Node script that reads the drawing file(s), strips the
  `import type` line and the `: Animal` annotation, evals the object, and emits an
  HTML page of preview cards linking the built CSS; screenshot it with headless
  Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
  --headless=new --screenshot=...`), then Read the PNG. Recreate the script as
  needed — it lives in `/tmp` and is not committed.

## App structure & flow

- `src/App.tsx` — top-level state machine: shows `HomePage`, `DrawingPlayer`,
  `FactsPage`, or `PaintingsPage`. Owns `completed` (Set of finished ids, persisted
  to `localStorage`) and `level` (persisted). Computes the auto-advance `pool`
  (same-level drawings, or the masterpieces) and passes it to the player.
- `src/components/`
  - `HomePage.tsx` — difficulty selector, grid filtered by level, fixed left-side
    ▲/▼ scroll buttons, voice command routing, links to Facts/Paintings.
  - `DrawingPlayer.tsx` — owns step index + speed; Space/▶ = next, ←/Backspace/◀ =
    prev. On the last step, one extra Space pops the celebration (reversible).
  - `AnimatedDrawing.tsx` — renders the SVG; honours per-step colour and `frozen`.
  - `Controls.tsx` — ◀ ▶ buttons, step indicator, speed slider.
  - `Celebration.tsx` — fireworks + 10s countdown that auto-advances to the next
    drawing in the pool; shows the painting `fact` if present.
  - `LevelSelector.tsx` — Easy/Medium/Harder. **Underlying values stay 5/7/10**
    (so drawing data is untouched); only labels/icons changed.
  - `AnimalCard.tsx`, `FactsPage.tsx`, `PaintingsPage.tsx`.
- `src/voice/` — `VoiceProvider` (context + mic toggle + status toast),
  `useSpeechRecognition` (Web Speech API wrapper, auto-restart), `match.ts`
  (`heardAny` whole-word matcher). Screens register a command handler via
  `useVoiceControl`. Works in Chrome/Edge/Safari only; needs https or localhost.

## Conventions

- Kid-friendly UI: big rounded buttons, high contrast, generous hit targets.
- Honour `prefers-reduced-motion` (animations already gate on it).
- Keep new code matching the existing style (small components, data-driven).

## Copyright (important)

Only original artwork or **public-domain** works. Do **not** trace or recreate
copyrighted characters/paintings/tutorials, even redrawn as SVG (e.g. Spider-Man,
Picasso paintings, KPop Demon Hunters, third-party coloring pages). When asked for
those, build an **original** drawing in the same spirit instead (see the original
"Superhero" and "Pop Star"). Bundled painting images (`src/assets/paintings/`) are
public domain from Wikimedia Commons. The Cubist Face / Picasso Portrait are
labelled "Picasso style" and are our own designs, with no real image.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and deploys to GitHub Pages.
Pages **Source must be "GitHub Actions"** (already configured). Live at
`https://cquidet-pro.github.io/learn-draw/`. `tsconfig.tsbuildinfo` is gitignored —
if it ever gets staged, `git rm --cached` it before committing.

**Standing workflow:** after every merge to `main`, automatically watch the
deploy (`watch-deploy` skill) and tell the user once it's live and ready to
check — don't wait to be asked. Develop each new feature/fix on a fresh branch
cut from the latest `main` (avoids the repeated merge conflicts a long-lived
branch causes).
