# Plant Locker

A front-end-only mobile web app: your personal shelf of named plants,
now with browser-local accounts, persistence, photo uploads, and a
community species directory. No server yet: everything runs on a
localStorage backend shaped like the Supabase backend that will
replace it (see `src/api/backend.js`). The whole UI is constrained to
a centered ~430px column so it reads as a phone app in a desktop
browser.

**Live demo:** https://crossfiber.github.io/plant-locker/

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

1. **Login / signup**: browser-local accounts (salted + hashed, but
   demo-grade; real auth arrives with Supabase). Sessions persist.
2. **Locker**: your shelf as a grid with the newest plant featured
   wide at the top, plus collection stats written as a sentence.
   Empty shelves get a designed empty state with an example-shelf
   loader. Tap any plant to open it.
3. **Add Plant** (center + button): searchable species picker (18
   seeded species plus community submissions), optional real photo
   (downscaled in the browser), nickname, acquired date, note.
   Can't find the species? Submit it to the directory and it's
   auto-verified on the spot (local stub for the future Claude call).
4. **Plant page**: photo or illustrated cover, identity, working
   Public / Friends / Private toggle, dated growth timeline,
   keeper's notes, and the species care block.

## Roadmap (next milestones)

Feed, explore, and the follower system are stubbed in
`src/api/backend.js` and land once the Supabase project exists.

## Mock data

All seed data lives in clearly labeled files under `src/data/`:

- `species.js`: 18 real species with accurate basic care info
- `plants.js`: the 5 starter plants and their timelines

Edit either file freely; shapes are documented at the top of each file.

See `BUILD_NOTES.md` for what's real, what's stubbed, and every
decision and TODO.
