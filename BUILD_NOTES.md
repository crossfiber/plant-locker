# Plant Locker: Build Notes

Built 2026-07-02. Two milestones so far: the personal locker, then
the social-foundation skeleton (accounts, persistence, photos,
community directory). Everything below is so you can pick this up
cold in the morning.

## Milestone 2: social foundation (added same day)

Direction from kickoff: no Supabase account yet, so build the
skeleton that will plug into it; foundation first; real photos now;
species verification fully automatic.

**What's real:**

- Login / signup / sign out with persistent sessions. Multiple
  accounts per browser, each with its own locker.
- Full persistence: plants, privacy changes, photos, and community
  species all survive refresh (localStorage under `plant-locker:v1`).
- Real photo uploads, downscaled in-browser to ~900px JPEG before
  storing. SVG illustrations remain the fallback everywhere.
- Community species submissions with fully automatic verification:
  binomial-name sanity check + directory dedupe, then instantly
  published and selectable, labeled "community" in the picker.
- Designed empty state with an example-shelf loader for new accounts.

**What's stubbed (and where the real thing goes):**

- `src/api/backend.js` is the single seam. Every function carries a
  SUPABASE: note with the call that replaces it. Feed, explore, and
  follows exist as stubs returning empty results.
- The species verifier is a local stand-in. The real one is a
  Supabase Edge Function calling the Claude API to confirm the
  species exists, normalize the name, dedupe, and draft care info.
  Submitted species meanwhile get "care details pending" placeholders,
  never invented care facts.
- Browser-local auth is honest about itself (the auth screen says so).
  Passwords are salted + SHA-256 hashed, but this is not real
  security; Supabase Auth is.
- localStorage holds ~5MB: roughly 30 to 60 photos. Fine for the
  skeleton, another reason storage moves server-side.

**New TODOs in code:**

- `src/api/backend.js` submitSpecies: swap stub for Claude edge
  function; draft real care info.
- `src/components/PhotoInput.jsx`: hand blobs to Supabase Storage
  instead of data URLs.

**To go live with the real backend you will need:** a Supabase
account (free tier), an Anthropic API key for verification, and a
privacy policy + moderation story before strangers sign up.

## What's real (working now)

- All three screens, navigable end to end on seeded mock data
- Locker grid with newest-plant featured card and live stats
  (plant count, species count, first year) that update when you add
- Add Plant: search filters 18 species by common or scientific name,
  species selection, nickname, date (defaults to today, capped at
  today), optional note; save button is disabled until species +
  nickname exist and labels itself with the nickname
- Plant page: cover, identity, dated growth timeline, keeper's notes,
  species care block, and a working 3-way privacy toggle. The toggle
  updates the plant in state, swaps the caption, updates the chip on
  the locker card, and rewords the timeline visibility note
- 17 SVG plant motifs x 4 background tints x 3 growth stages
  (sprout / young / full), plus the locker-sprout logo, all inline SVG
- Verified end to end in a real headless browser: added a plant,
  toggled privacy, navigated all screens (see `screenshots/`)

## What's stubbed / intentionally not real

- **No persistence.** Refresh resets to seed data. Spec said
  in-session React state only.
- **Privacy is state, not enforcement.** There are no other users, so
  Public / Friends / Private only changes the stored value, the visible
  UI state, and the timeline visibility note.
- **Timeline is display-only** (your call in kickoff). Entries come
  from seed data; adding a plant seeds exactly one entry dated to the
  acquired date.
- **Care info is honest but general** one-line guidance per species,
  written for typical indoor conditions. Not a horticulture database.
- **"Photos" are illustrations.** By design: no AI images, no stock,
  no external image requests at all.

## Every TODO in the code

- `src/App.jsx`: new plants default to `privacy: 'private'`. The add
  form has no privacy field (kept lean); change it on the plant page
  after saving. Marked with `// TODO:`.

## Decisions (and why)

- **State-based navigation instead of react-router.** Three screens,
  one of them parameterized by id. A router would be dead weight.
- **Tailwind 3 (not 4)** for the boring, known-stable config format.
- **Type**: Sora for display, Hanken Grotesk for body ("fresh +
  modern" direction you picked). Loaded from Google Fonts CDN; if
  you're offline it falls back to system sans and nothing breaks.
- **Palette**: leaf green `#3E9B5F/#2F8050` primary, mint surfaces
  `#E6F4EB/#F3FAF5`, ink `#1D3527`, moss `#5F7A6A` for muted text.
  One warm accent, peach `#F0A17D/#E98B62`, reserved for
  active/selected states only: the active privacy segment, the
  selected species card, the NEWEST tag, and the Change button.
- **Stats as a sentence** ("5 plants across 5 species, growing with
  you since 2023") instead of the big-number stat bar.
- **Newest plant featured wide** at the top of the grid; the rest sit
  in a 2-up grid. Gives the add flow a visible payoff.
- **Custom stroked SVG icon set** (`src/components/Icons.jsx`) instead
  of an icon font: sun, drop, mist, gauge, globe, people, lock,
  sprout, calendar, back, search, plus. Drawn for this app.
- **Illustration scaling**: covers use `preserveAspectRatio:
  xMidYMax meet` with a background that bleeds far past the viewBox,
  so wide (2:1) and 4:3 crops stay filled edge to edge but the plant
  is never decapitated. String of Pearls renders in front of its pot
  (hanging plant) and is scaled up to fill square cards.
- **Tab bar**: Locker tab + raised center Add button per spec. The
  right slot is a non-interactive "N on the shelf" caption to balance
  the bar without inventing fake tabs.
- **Tab bar hides on the Add screen** so the form reads as a focused
  flow with its own back button.
- **Timeline order**: oldest first, top to bottom, so the growth story
  reads downward to "now".
- **Add screen seeds the timeline** with one sprout-stage entry using
  the acquired date and note, so a brand-new plant's page is never
  empty.

## Anti-slop self-check (adapted from the website builder prompt)

- Em dash sweep: zero em dash characters or HTML entities anywhere in
  src, docs, or data (verified by grep before handoff)
- No icon-font comfort icons; every icon is purpose-drawn inline SVG
- No SaaS stat bar; stats are woven into a sentence
- Sections are structurally varied: featured-wide + grid locker,
  overlap identity card on the plant page (cover bleeds full width,
  card pulls up over it), segmented control, vertical timeline,
  stacked care rows. No two adjacent blocks share a structure
- No purple gradients, no glassmorphism-as-default, no particle
  backgrounds, no fade-in-on-every-section, no sticky bottom CTA bar
  beyond the spec'd tab nav
- Palette discipline: green primary + mint neutrals + one peach accent
  used only for selected/highlight states
- Data honesty: all care info is real basic guidance; seeded plants
  are clearly fictional examples in a clearly labeled mock-data file

## Nice-to-haves if you continue (not built, per scope)

- Persistence (localStorage or a backend)
- Adding timeline entries from the plant page
- Editing nickname / notes, deleting plants
- The social layer the privacy values are clearly pointing at

## Housekeeping

- `screenshots/` holds real captures from the verification pass
- Git history is in logical commits (scaffold, data, screens, art
  fixe