# Learn 2 Draw — follow-ups to revisit

Notes for later. None of these are blockers; the site is live and working at
https://cquidet-pro.github.io/learn-draw/

## Search / AI discovery (done, plus open items)

Done (shipped 2026-06-18):
- Rich `<head>`: descriptive title, meta description, keywords, canonical,
  robots directives.
- Open Graph + Twitter card tags + a 1200×630 `public/og-image.png` preview.
- JSON-LD structured data in `index.html`: `WebSite`,
  `WebApplication`/`EducationalApplication`, and a `FAQPage`.
- `<noscript>` static content fallback inside `#root` for crawlers / AI agents
  that don't run JavaScript.
- `public/robots.txt` welcoming AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, Applebot, CCBot, …) + `public/sitemap.xml`.

Open items:
- **Custom domain** (biggest unlock). On `…github.io/learn-draw/`, the
  authoritative `robots.txt` / `sitemap.xml` must live at the *domain root*,
  which this repo can't control. A domain (e.g. `learntodraw.app`) fixes that
  and gives a cleaner URL. When we have one: add a `CNAME` file and update all
  absolute URLs (canonical, og:url, og:image, sitemap `loc`, robots `Sitemap:`).
- **Google Search Console**: verify the site and submit the sitemap so Google
  indexes it quickly. (Need account access / draft step-by-step.)
- **Bing Webmaster Tools**: same idea; also feeds some AI engines.
- **Decision to revisit**: Open Graph / Twitter tags were added for search + AI
  discovery and link previews, even though social sharing was earlier declined.
  Confirm we're happy to keep them.

## Other nice-to-haves (from earlier)

- **Privacy-friendly analytics** (e.g. Plausible/Umami) — optional, no cookies.
- **Automated tests + CI** — a small test suite and a GitHub Actions check on
  PRs, for a cleaner handoff.

## Kid-friendly ideas not yet built

- **Read-aloud hints** (text-to-speech) — biggest win for pre-readers: speak
  each step's hint and the drawing name aloud, with a speaker toggle.
- **Tap-to-color the finished picture** — let the child tap regions to color
  the drawing themselves from a crayon palette (uses existing `fills` data).
