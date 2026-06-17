# 🎨 Learn to Draw

A playful website that teaches young children to draw, **step by step**. Each step
shows the pen strokes *drawing themselves* in a gentle loop. No backend — it's a
static site.

**Live:** https://cquidet-pro.github.io/learn-draw/

## Features

- **Lots of drawings** — animals, a sun, house, rainbow, tree, car, a family of
  stick figures, a princess, an original superhero, a pop star, and more.
- **Three difficulty levels** — 🌱 Easy / 🌟 Medium / 🔥 Harder. The same subjects
  get more detailed (and more steps) as the level goes up.
- **Step-by-step player** — new strokes animate (~5s loop), earlier strokes fade so
  the picture builds up. **Space / ▶** = next, **← / Backspace / ◀** = back, and a
  🐢↔🐇 slider controls drawing speed.
- **Celebration** — finishing pops fireworks 🎉 with a 10-second countdown that
  auto-advances to another drawing, and the drawing earns a **green check** on the
  home screen (progress saved in the browser).
- **Famous Paintings** 🖼️ — recreate simple sketches inspired by Starry Night,
  The Great Wave, and Picasso-style portraits, shown **side by side** with the real
  (public-domain) artwork, with a fun fact on completion.
- **Fun Facts** 💡 — a picture-first page of short facts about drawing.
- **Voice control** 🎙️ — say a drawing's name, or "next" / "back" / "up" / "down".
  Uses the browser's Web Speech API (Chrome / Edge / Safari; needs a mic + https).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve the built site locally
```

## Add a drawing

1. Create `src/data/drawings/<id>.ts` exporting an `Animal` (ordered `steps`, each
   with `strokes`, a `hint`, and an optional per-step `color`). Use `level: 7` /
   `level: 10` for the harder tiers.
2. Register it in `src/data/animals.ts` (paintings go in `src/data/masterpieces.ts`).

See **CLAUDE.md** for the architecture, the drawing-data format, authoring tips,
and copyright rules.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys
to GitHub Pages (Source = GitHub Actions).
