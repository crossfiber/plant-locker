// ============================================================
// MOCK DATA: Seeded locker plants (edit freely)
// Each plant: id, speciesId, nickname, acquiredDate, coverImage,
// notes, privacy ('public' | 'friends' | 'private'),
// timeline: array of { date, image, note } oldest first.
//
// "coverImage" and timeline "image" are illustration descriptors,
// not URLs: { stage: 'sprout' | 'young' | 'full', tint: string }.
// PlantArt.jsx renders them as inline SVG so nothing ever 404s.
// ============================================================

export const SEED_PLANTS = [
  {
    id: 'plant-delores',
    speciesId: 'monstera-deliciosa',
    nickname: 'Delores',
    acquiredDate: '2024-11-03',
    coverImage: { stage: 'full', tint: 'mint' },
    privacy: 'public',
    notes:
      'Lives by the east window. Threw her first fenestrated leaf in March and has not slowed down since. Needs a moss pole soon.',
    timeline: [
      {
        date: '2024-11-03',
        image: { stage: 'sprout', tint: 'sand' },
        note: 'Shelf day one. Four little leaves, no splits yet.',
      },
      {
        date: '2025-03-22',
        image: { stage: 'young', tint: 'mint' },
        note: 'First fenestration! One clean split on the newest leaf.',
      },
      {
        date: '2026-04-18',
        image: { stage: 'full', tint: 'mint' },
        note: 'Repotted into a 10 inch pot. She is officially a monster.',
      },
    ],
  },
  {
    id: 'plant-sid',
    speciesId: 'snake-plant',
    nickname: 'Sid',
    acquiredDate: '2023-06-14',
    coverImage: { stage: 'full', tint: 'sage' },
    privacy: 'private',
    notes:
      'The survivor. Went a full month without water during vacation and did not care. Corner of the bedroom, low light.',
    timeline: [
      {
        date: '2023-06-14',
        image: { stage: 'young', tint: 'sage' },
        note: 'Rescue from the grocery store clearance rack.',
      },
      {
        date: '2025-08-02',
        image: { stage: 'full', tint: 'sage' },
        note: 'Two new pups popped up at the base. Family growing.',
      },
    ],
  },
  {
    id: 'plant-goldie',
    speciesId: 'golden-pothos',
    nickname: 'Goldie',
    acquiredDate: '2025-02-21',
    coverImage: { stage: 'full', tint: 'mint' },
    privacy: 'friends',
    notes:
      'Started as a single cutting from a friend. Now trailing halfway down the bookshelf. Propagating two more cuttings in water.',
    timeline: [
      {
        date: '2025-02-21',
        image: { stage: 'sprout', tint: 'mint' },
        note: 'One rooted cutting in a tiny terracotta pot.',
      },
      {
        date: '2025-09-30',
        image: { stage: 'young', tint: 'mint' },
        note: 'Vines reached the second shelf. Growth is nonstop.',
      },
      {
        date: '2026-05-11',
        image: { stage: 'full', tint: 'sage' },
        note: 'Trimmed and propagated. The variegation is beautiful this year.',
      },
    ],
  },
  {
    id: 'plant-pearl',
    speciesId: 'string-of-pearls',
    nickname: 'Pearl',
    acquiredDate: '2025-09-08',
    coverImage: { stage: 'young', tint: 'sage' },
    privacy: 'public',
    notes:
      'Hanging in the brightest window. Learned the hard way that she hates wet feet. Watering every third week now and she is thriving.',
    timeline: [
      {
        date: '2025-09-08',
        image: { stage: 'sprout', tint: 'sand' },
        note: 'Small 4 inch hanging pot from the plant fair.',
      },
      {
        date: '2026-03-02',
        image: { stage: 'young', tint: 'sage' },
        note: 'Strands doubled in length. First tiny blooms appeared.',
      },
    ],
  },
  {
    id: 'plant-bigbird',
    speciesId: 'bird-of-paradise',
    nickname: 'Big Bird',
    acquiredDate: '2026-01-17',
    coverImage: { stage: 'full', tint: 'peach' },
    privacy: 'friends',
    notes:
      'The statement piece. Takes up the whole south corner and drinks more than every other plant combined. Worth it.',
    timeline: [
      {
        date: '2026-01-17',
        image: { stage: 'young', tint: 'peach' },
        note: 'Arrived huge. Two leaves cracked in transit but new growth already showing.',
      },
      {
        date: '2026-06-09',
        image: { stage: 'full', tint: 'peach' },
        note: 'Unfurled a leaf bigger than my head. The corner is officially a jungle.',
      },
    ],
  },
]
