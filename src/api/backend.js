// ============================================================
// LocalBackend: the working skeleton of the future Supabase backend.
//
// Everything here runs on localStorage so the app is fully usable
// with zero services, but every function is shaped like the
// Supabase call that will replace it. Each section carries a
// SUPABASE: note showing the swap. When the Supabase project
// exists, this file is the only one that should need surgery.
//
// SECURITY NOTE: this is a demo skeleton. Passwords are salted and
// hashed with WebCrypto so nothing is stored in plain text, but a
// browser-side account system is not real security. Real auth
// arrives with Supabase Auth (or any server), not here.
// ============================================================

import { SPECIES } from '../data/species'

const KEY = 'plant-locker:v1'

const MOTIFS = [
  'monstera', 'snake', 'trailing', 'palm', 'zz', 'fiddle', 'rubber',
  'spider', 'lily', 'aloe', 'pilea', 'pearls', 'bop', 'calathea',
  'jade', 'fern', 'plumeria',
]
const TINTS = ['mint', 'sage', 'sand', 'peach']

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // corrupted storage: start fresh rather than crash
  }
  return {
    users: [],          // { id, handle, email, passwordHash, salt, createdAt }
    session: null,      // userId of the signed-in user
    plants: {},         // userId -> [plant]
    customSpecies: [],  // community directory additions
    follows: [],        // { followerId, followedId }  (milestone 2)
    posts: [],          // feed entries                (milestone 2)
  }
}

function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db))
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function publicUser(u) {
  return { id: u.id, handle: u.handle, email: u.email }
}

// Deterministic art assignment for community species, so every
// submission gets a stable illustration and tint.
function assignArt(name) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return { art: MOTIFS[h % MOTIFS.length], tint: TINTS[h % TINTS.length] }
}

export const backend = {
  // ---------- AUTH ----------
  // SUPABASE: supabase.auth.signUp({ email, password }) plus a
  // `profiles` row for the handle (unique index on handle).
  async signUp({ handle, email, password }) {
    const db = load()
    handle = (handle || '').trim().toLowerCase().replace(/^@/, '')
    email = (email || '').trim().toLowerCase()
    if (!/^[a-z0-9_]{3,20}$/.test(handle)) {
      return { error: 'Handles are 3 to 20 characters: letters, numbers, underscores.' }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { error: 'That email looks incomplete. Try something like you@email.com.' }
    }
    if ((password || '').length < 8) {
      return { error: 'Passwords need at least 8 characters.' }
    }
    if (db.users.some((u) => u.handle === handle)) {
      return { error: `@${handle} is taken. Try another handle.` }
    }
    if (db.users.some((u) => u.email === email)) {
      return { error: 'That email already has a locker. Log in instead.' }
    }
    const salt = uid('salt')
    const user = {
      id: uid('user'),
      handle,
      email,
      salt,
      passwordHash: await hashPassword(password, salt),
      createdAt: new Date().toISOString(),
    }
    db.users.push(user)
    db.plants[user.id] = []
    db.session = user.id
    save(db)
    return { user: publicUser(user) }
  },

  // SUPABASE: supabase.auth.signInWithPassword({ email, password })
  async signIn({ email, password }) {
    const db = load()
    email = (email || '').trim().toLowerCase()
    const user = db.users.find((u) => u.email === email)
    if (!user) return { error: 'No locker under that email yet. Create an account first.' }
    const attempt = await hashPassword(password, user.salt)
    if (attempt !== user.passwordHash) return { error: 'That password does not match.' }
    db.session = user.id
    save(db)
    return { user: publicUser(user) }
  },

  // SUPABASE: supabase.auth.signOut()
  signOut() {
    const db = load()
    db.session = null
    save(db)
  },

  // SUPABASE: supabase.auth.getSession() / onAuthStateChange
  currentUser() {
    const db = load()
    if (!db.session) return null
    const user = db.users.find((u) => u.id === db.session)
    return user ? publicUser(user) : null
  },

  // ---------- PLANTS ----------
  // SUPABASE: from('plants').select() with RLS scoping to the owner
  // (and later to followers when privacy = 'friends').
  listPlants(userId) {
    const db = load()
    return db.plants[userId] || []
  },

  // SUPABASE: from('plants').insert(plant); cover photos move from
  // data URLs to supabase.storage uploads and store the public URL.
  addPlant(userId, plant) {
    const db = load()
    const full = { ...plant, id: uid('plant'), ownerId: userId }
    db.plants[userId] = [...(db.plants[userId] || []), full]
    save(db)
    return full
  },

  // SUPABASE: from('plants').update(patch).eq('id', plantId)
  updatePlant(userId, plantId, patch) {
    const db = load()
    db.plants[userId] = (db.plants[userId] || []).map((p) =>
      p.id === plantId ? { ...p, ...patch } : p
    )
    save(db)
  },

  // SUPABASE: from('plants').delete().eq('id', plantId)
  deletePlant(userId, plantId) {
    const db = load()
    db.plants[userId] = (db.plants[userId] || []).filter((p) => p.id !== plantId)
    save(db)
  },

  // ---------- SPECIES DIRECTORY ----------
  // SUPABASE: from('species').select().eq('status', 'verified')
  listSpecies() {
    const db = load()
    return [...SPECIES, ...db.customSpecies]
  },

  getSpecies(id) {
    return this.listSpecies().find((s) => s.id === id)
  },

  // Community species submission, FULLY AUTOMATIC verification.
  //
  // TODO: the checks below are a local stand-in for the real
  // verifier: a Supabase Edge Function that calls the Claude API to
  // (1) confirm the species exists, (2) normalize the scientific
  // name, (3) dedupe against the directory, and (4) draft accurate
  // care info. The function signature and returned shape are already
  // what that edge function will return, so the UI won't change.
  async submitSpecies({ commonName, scientificName }) {
    const db = load()
    commonName = (commonName || '').trim()
    scientificName = (scientificName || '').trim()
    if (commonName.length < 2) {
      return { error: 'Give it the common name people actually use.' }
    }
    if (!/^[A-Z][a-z-]+ [a-z][a-z-]+(?: [a-z.'-]+)*$/.test(scientificName)) {
      return { error: "Scientific names look like 'Genus species', e.g. Monstera adansonii." }
    }
    const dupe = this.listSpecies().find(
      (s) =>
        s.commonName.toLowerCase() === commonName.toLowerCase() ||
        s.scientificName.toLowerCase() === scientificName.toLowerCase()
    )
    if (dupe) {
      return { error: `Already in the directory as ${dupe.commonName} (${dupe.scientificName}).` }
    }
    const { art, tint } = assignArt(scientificName)
    const species = {
      id: uid('species'),
      commonName,
      scientificName,
      art,
      tint,
      custom: true,
      status: 'verified',
      verifiedBy: 'auto-check (stub for Claude verification)',
      careInfo: {
        // TODO: Claude drafts real care info here once the API is wired.
        light: 'Care details pending: community submitted species.',
        water: 'Care details pending: community submitted species.',
        humidity: 'Care details pending: community submitted species.',
        difficulty: 'Unrated',
      },
    }
    db.customSpecies.push(species)
    save(db)
    return { species }
  },

  // ---------- SOCIAL (milestone 2 stubs) ----------
  // SUPABASE: from('follows').insert({ follower_id, followed_id })
  followUser(followerId, followedId) {
    const db = load()
    if (!db.follows.some((f) => f.followerId === followerId && f.followedId === followedId)) {
      db.follows.push({ followerId, followedId })
      save(db)
    }
  },

  // SUPABASE: from('follows').delete().match(...)
  unfollowUser(followerId, followedId) {
    const db = load()
    db.follows = db.follows.filter(
      (f) => !(f.followerId === followerId && f.followedId === followedId)
    )
    save(db)
  },

  // SUPABASE: a view joining follows -> plants/posts, respecting
  // privacy via RLS. Returns [] until the feed milestone lands.
  listFeed() {
    return []
  },

  // SUPABASE: public plants + trending species + keeper search.
  // Returns [] until the explore milestone lands.
  explore() {
    return []
  },
}
