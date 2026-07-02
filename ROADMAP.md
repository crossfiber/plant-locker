# Plant Locker: Roadmap

The destination: you open the app and land in a full-screen feed of
people's plants (reels-style), with an explore page for browsing
collections, a follower system, and the locker as your own corner of
it. This is the build order that gets there without throwing away
anything already working.

The guiding trick stays the same as milestone 2: every feature ships
first against the localStorage backend with seeded community data, so
the experience is real and testable BEFORE Supabase exists. The
backend swap then turns fake neighbors into real ones.

---

## Milestone 3: The new front door (buildable now, no accounts needed)

The app stops opening into your locker and starts opening into the
community.

- **Home feed, reels-style.** Full-viewport vertical scroll-snap
  cards, one plant post per screen: big photo (or illustration),
  nickname, species, keeper handle, caption, like button, follow
  button. Thumb-driven, snap per card, exactly the muscle memory
  people bring from reels.
- **Explore page.** A browsable grid of public plants and
  collections: trending species chips, keeper search, "biggest
  shelves" and "newest arrivals" rails. Tapping anything opens a
  read-only view of that plant or that keeper's public shelf.
- **Public profile view.** A keeper page: handle, shelf stats
  sentence, grid of their public plants only.
- **New tab bar:** Home (feed) / Explore / center Add / Locker.
  The locker becomes your tab, not the front door.
- **Seeded community.** A handful of fictional keepers with public
  plants (clearly labeled mock data, same pattern as the current
  example shelf) so the feed and explore pages are full on day one.
  Their posts come from the same plant + timeline shapes you already
  have.
- **Privacy enforcement begins here:** feed and explore only ever
  read public plants; friends-only stays hidden until follows are
  real.

Everything in this milestone runs on the existing skeleton. No new
accounts or keys needed.

## Milestone 4: Supabase switch-on (needs: your Supabase account)

The one-file swap `src/api/backend.js` was built for.

- Supabase project + Postgres schema: profiles, plants, timeline
  entries, species, follows, likes.
- Real auth (email + optional Google), replacing browser-local
  accounts. The demo account becomes a real seeded demo user.
- Row-level security implementing public / friends / private at the
  database level, not just the UI.
- Photos move from localStorage data URLs to Supabase Storage + CDN.
- Migration path: "import my browser locker" for anything you added
  before the switch.
- Free tier covers all of this until real traffic shows up.

## Milestone 5: Real social

- Follower system for real: follow from feed, explore, or profiles;
  followers/following lists; "friends" = mutual follow (decision to
  confirm when we get here).
- Feed becomes personal: people you follow first, then discovery
  posts. New timeline entries from followed keepers appear as posts.
- Likes persist and count; optional comments (decision: comments
  bring moderation duty with them).
- Share links: any public plant or shelf gets a URL you can text
  someone.
- Basics that arrive with strangers: report button, block, a privacy
  policy and terms page.

## Milestone 6: Claude verification, for real (needs: Anthropic API key)

- The species-submission stub becomes a Supabase Edge Function
  calling Claude: confirms the species exists, normalizes the
  scientific name, catches synonyms and dupes, drafts the care info
  that's currently "pending."
- Backfill: Claude drafts care entries for community species
  submitted during the stub era.
- Stretch: photo-based suggestions ("this looks like a Hoya
  carnosa") on upload, and a care question box on plant pages.
  Costs stay in pennies per call at hobby scale.

## Milestone 7: Growth and polish

- Timeline posting from the plant page (growth updates are the
  natural content engine for the feed).
- PWA install (home screen icon, offline shell) so it feels like a
  real phone app without app stores.
- Custom domain, og:image share cards, basic analytics.
- Notifications (new follower, friend posted an update).

---

## Decisions already made (kickoff answers, still honored)

- Supabase-shaped skeleton first, real Supabase when the account
  exists. Foundation before social. Real photos with SVG fallback.
  Species verification fully automatic.

## Decisions to make when we get there

- "Friends" definition: mutual follow vs. approved follow requests.
- Comments: yes/no (moderation cost comes with them).
- Feed ranking: pure recency first; anything smarter comes later.

## What each milestone needs from you

- **M3: nothing.** Say go.
- **M4: a free Supabase account** (supabase.com) and its project keys.
- **M5: nothing new**, rides on M4.
- **M6: an Anthropic API key** (console.anthropic.com).
- **M7: ~$12/yr** if you want a custom domain.
