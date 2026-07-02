# Plant Locker

A front-end-only mobile web app: your personal shelf of named plants.
Single user, no backend, no auth, no database, no persistence. The whole
UI is constrained to a centered ~430px column so it reads as a phone
app in a desktop browser.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

`npm run build` and `npm run preview` also work if you want a
production bundle.

## What's inside

- React 18 + Vite 5, plain JavaScript
- Tailwind CSS 3 for styling (config in `tailwind.config.js`)
- Google Fonts: Sora (display) + Hanken Grotesk (body)
- Zero image files: every plant "photo" is an inline SVG illustration
  (`src/components/PlantArt.jsx`), so nothing can ever look broken

## Screens

1. **Locker**: your shelf as a grid with the newest plant featured
   wide at the top, plus collection stats written as a sentence.
   Tap any plant to open it.
2. **Add Plant** (center + button): searchable species picker (18
   seeded species), nickname, acquired date, optional note. Saving
   drops the plant into the locker (in-session state only).
3. **Plant page**: large cover, identity, working Public / Friends /
   Private toggle, dated growth timeline, keeper's notes, and the
   species care block.

## Mock data

All seed data lives in clearly labeled files under `src/data/`:

- `species.js`: 18 real species with accurate basic care info
- `plants.js`: the 5 starter plants and their timelines

Edit either file freely; shapes are documented at the top of each file.

See `BUILD_NOTES.md` for what's real, what's stubbed, and every
decision and TODO.
