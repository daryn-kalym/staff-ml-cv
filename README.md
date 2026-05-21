# Dan Kalym — Web CV (2026)

Dashboard-style, single-page web CV. Each section fits a full viewport — designed for clean screenshots that drop straight into a PPTX deck.

## Run locally

Just open `index.html` in any modern browser. No build step.

```bash
# optional: serve via a static server (better for fonts / scroll snap)
python3 -m http.server 8000 --directory web_based_cv
# then open http://localhost:8000
```

## Deploy on GitHub Pages

1. Push this folder to a repo (e.g. `web-cv`).
2. In **Settings → Pages**, set the source to your default branch and root (or `/web_based_cv`).
3. Your CV will be live at `https://<username>.github.io/<repo>/`.

If you put the contents at repo root, link to `/`. If the folder is `web_based_cv/`, link to `/web_based_cv/`.

## Sections (each = 1 fullscreen screenshot)

1. **Hero** — Identity, headline stats
2. **Snapshot** — Profile + worked-with logos
3. **Key Achievements** — 6 dashboard cards
4. **Patent Spotlight** — Animated badge
5. **Engagements** — Mastercard client work table
6. **Experience** — Timeline
7. **Stack & Capabilities**
8. **Published Work**
9. **Contact**

## Screenshotting for PPTX

- Use **Cmd + Shift + 4** (macOS) → Space → click window for clean full-section captures.
- Or use Chrome DevTools → Cmd+Shift+P → "Capture full size screenshot" per section.
- Recommended viewport for capture: **1440×900** or **1920×1080**.

## Customize

- Colors: edit `:root` in `styles.css` (`--accent`, `--bg`, etc.).
- Content: edit `index.html` directly.
- Animations honor `prefers-reduced-motion`.
