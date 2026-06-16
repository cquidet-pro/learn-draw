# 🎨 Learn to Draw

A playful website that teaches young children (around 5 years old) to draw simple
pictures — animals, a sun, a house, a rainbow, a family of stick figures, and more —
**step by step**. Each step shows the pen strokes *drawing themselves* in a gentle loop.

## How it works

- Pick something to draw on the home screen (17 drawings to choose from).
- Each step animates the new strokes drawing themselves (~5s loop), with earlier
  strokes faded so the picture builds up. Friendly hints guide each step.
- **Space** (or **▶**) goes to the next step, **← / Backspace** (or **◀**) goes back.
- The 🐢↔🐇 slider controls how fast the strokes draw.
- Finishing pops a **fireworks celebration** 🎉 (one extra Space press past the last
  step — reversible if pressed by mistake), and the drawing earns a **green check** on
  the home screen (progress is saved in the browser).

## 🎙️ Voice control

Tap **"Talk to me"** (bottom-right) to control the app hands-free — great for a
pre-reader. Say a drawing's name (**"dog"**, **"sun"**, **"car"**…) on the home screen,
or **"next"**, **"back"**, **"home"** while drawing. Uses the browser's built-in Web
Speech API (works in **Chrome / Edge / Safari**; not Firefox) and needs a microphone +
an `https://` or `localhost` origin.

## Tech

- React + TypeScript, built with Vite. No backend — it's a static site.
- Drawings are hand-authored SVG paths; the "draws itself" effect animates
  `stroke-dashoffset` from 1 → 0 (`pathLength="1"`). Multi-color drawings use an
  optional per-step `color`.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve the built site locally
```

## Deploy (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys
to GitHub Pages. One-time setup: in the repo **Settings → Pages**, set **Source** to
**GitHub Actions**. The site is served at `https://cquidet-pro.github.io/learn-draw/`.

## Add another drawing

1. Create `src/data/drawings/<name>.ts` exporting an `Animal` (ordered `steps`, each
   with `strokes`, a `hint`, and an optional per-step `color`).
2. Register it in `src/data/animals.ts` (and optionally add voice aliases in
   `src/components/HomePage.tsx`).
