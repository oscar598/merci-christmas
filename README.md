# merci. landing pages

Static marketing site for merci., the animated holiday card app for iMessage.
No build step: plain HTML, CSS and ES modules.

| Page | Path |
| --- | --- |
| Main landing page: Christmas edition, aimed at Christmas card senders | `index.html` |
| Thanksgiving collection page | `thanksgiving/index.html` |

## Run locally

```bash
python3 -m http.server 5190
```

Then open http://localhost:5190 and http://localhost:5190/thanksgiving/.

## Before you deploy

Edit `assets/js/config.js`:

- `LINKS.webApp`: the merci. web app (editor).
- `LINKS.getApp`: the App Store listing, or the app's `/get` page until the listing is live.
- `SIGNUP_ENDPOINT`: where the Christmas early-access form POSTs `{ email, source }` as JSON.
  While it's empty, the form stays hidden and the page shows the app buttons instead.

All asset paths are relative, so the folder works on any static host (GitHub Pages, Netlify, Vercel, S3).

## How the card previews work

The cards in the phone mockups and the design rails are rendered live with the app's own card renderer,
copied into `assets/js/shared/` (`render.js`, `templates.js`, `art.js`, `fonts.js`, plus `assets/css/cards.css`).
Re-copy those files from the app's `public/shared/` when the app's templates change.

The Christmas designs and illustrations live in `assets/js/christmas.js`. They use the same template
format as the app's `templates.js`, so they can be moved into the app when the Christmas collection ships.

## AI-readable pages

Plain-Markdown copies of the key pages, published next to the HTML so people and AI assistants read the same content:

| Markdown (source of truth) | HTML |
| --- | --- |
| `index.md`, `thanksgiving.md` | hand-written `index.html`, `thanksgiving/index.html` (linked with `rel="alternate" type="text/markdown"`) |
| `ai-info.md` | `ai-info/index.html` (generated) |
| `compare/<slug>.md` | `compare/<slug>/index.html` and the `compare/` hub (generated) |

Also `llms.txt`, `robots.txt` (allows all crawlers) and `sitemap.xml` (generated).

After editing any of those `.md` files, run:

```bash
python3 tools/build-ai-pages.py
```

It lists every `[CONFIRM]` placeholder still left (pricing, contact address, gift-card availability). Clear them before deploying. Recheck the competitor facts in `compare/` monthly and update each page's "Last updated" line.

## Assets

- `assets/img/hero-christmas.jpg`: Christmas hero photo (fireplace, stockings and a lit tree).
- `assets/img/hero.jpg`: Thanksgiving hero photo (lake view).
- `assets/fonts/instrumentserif-*.woff2`: Instrument Serif, SIL Open Font License 1.1
  (https://github.com/google/fonts/tree/main/ofl/instrumentserif).
