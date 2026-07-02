import { useMemo, useState } from 'react'
import { backend } from '../api/backend'
import PlantArt from '../components/PlantArt'
import PhotoInput from '../components/PhotoInput'
import { BackIcon, SearchIcon, SproutIcon } from '../components/Icons'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

// Inline community-directory submission. Verification is fully
// automatic (see backend.submitSpecies; currently a local stub that
// will become a Claude API call server-side).
function SubmitSpecies({ onVerified }) {
  const [open, setOpen] = useState(false)
  const [commonName, setCommonName] = useState('')
  const [scientificName, setScientificName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit() {
    setBusy(true)
    setError('')
    const res = await backend.submitSpecies({ commonName, scientificName })
    setBusy(false)
    if (res.error) setError(res.error)
    else onVerified(res.species)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-mint-300 py-3 text-[13px] font-semibold text-leaf-700 transition-colors hover:bg-mint-50"
      >
        <SproutIcon size={15} />
        Can't find it? Add it to the directory
      </button>
    )
  }

  return (
    <div className="mt-2 rounded-2xl border border-mint-200 bg-mint-50 p-3.5">
      <p className="text-[13px] font-semibold text-leaf-700">
        Add a species to the directory
      </p>
      <p className="mt-0.5 text-[11px] leading-relaxed text-moss">
        Submissions are verified automatically before they go live.
      </p>
      <div className="mt-3 space-y-2.5">
        <input
          value={commonName}
          onChange={(e) => { setCommonName(e.target.value); setError('') }}
          placeholder="Common name, e.g. Swiss Cheese Vine"
          className="w-full rounded-xl border border-mint-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf-500"
        />
        <input
          value={scientificName}
          onChange={(e) => { setScientificName(e.target.value); setError('') }}
          placeholder="Scientific name, e.g. Monstera adansonii"
          className="w-full rounded-xl border border-mint-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf-500"
        />
        {error && (
          <p className="rounded-xl bg-peach-100 px-3 py-2 text-xs font-medium text-peach-500">
            {error}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={submit}
            disabled={busy}
            className="flex-1 rounded-xl bg-leaf-600 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-leaf-700 disabled:opacity-60"
          >
            Verify and add
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-moss shadow-soft"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AddPlantScreen({ onSave, onCancel }) {
  const [speciesList, setSpeciesList] = useState(() => backend.listSpecies())
  const [query, setQuery] = useState('')
  const [speciesId, setSpeciesId] = useState(null)
  const [nickname, setNickname] = useState('')
  const [acquiredDate, setAcquiredDate] = useState(todayISO())
  const [note, setNote] = useState('')
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [justVerified, setJustVerified] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return speciesList
    return speciesList.filter(
      (s) =>
        s.commonName.toLowerCase().includes(q) ||
        s.scientificName.toLowerCase().includes(q)
    )
  }, [query, speciesList])

  const selected = speciesList.find((s) => s.id === speciesId)
  const canSave = Boolean(speciesId && nickname.trim())

  function handleVerified(species) {
    setSpeciesList(backend.listSpecies())
    setSpeciesId(species.id)
    setJustVerified(true)
  }

  function handleSave() {
    if (!canSave) return
    onSave({
      speciesId,
      nickname: nickname.trim(),
      acquiredDate,
      note: note.trim(),
      coverPhoto,
    })
  }

  return (
    <div className="px-5 pt-6">
      <header className="flex items-center gap-3">
        <button
          onClick={onCancel}
          aria-label="Back to locker"
          className="rounded-full bg-mint-100 p-2 text-leaf-700"
        >
          <BackIcon size={18} />
        </button>
        <h1 className="font-display text-xl font-bold tracking-tight">
          Add a plant
        </h1>
      </header>

      {/* Step 1: species */}
      <section className="mt-6">
        <p className="text-[13px] font-semibold text-leaf-700">
          1. What kind of plant is it?
        </p>

        {selected ? (
          <div className="mt-3">
            <div className="flex items-center gap-3 rounded-2xl border border-peach-300 bg-peach-100/60 p-3">
              <PlantArt
                art={selected.art}
                tint={selected.tint}
                className="h-14 w-14 shrink-0 rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] font-semibold">
                  {selected.commonName}
                </p>
                <p className="truncate text-xs italic text-moss">
                  {selected.scientificName}
                </p>
              </div>
              <button
                onClick={() => { setSpeciesId(null); setJustVerified(false) }}
                className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-peach-500 shadow-soft"
              >
                Change
              </button>
            </div>
            {justVerified && (
              <p className="mt-2 rounded-xl bg-mint-100 px-3 py-2 text-xs font-medium text-leaf-700">
                Verified and added to the directory. It's selectable for
                everyone from now on.
              </p>
            )}
          </div>
        ) : (
          <>
            <label className="mt-3 flex items-center gap-2.5 rounded-2xl border border-mint-200 bg-mint-50 px-4 py-3 focus-within:border-leaf-500">
              <span className="text-moss">
                <SearchIcon size={17} />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by common or scientific name"
                className="w-full bg-transparent text-sm outline-none placeholder:text-moss/60"
                autoFocus
              />
            </label>

            <ul className="mt-2 max-h-64 divide-y divide-mint-100 overflow-y-auto rounded-2xl border border-mint-200">
              {results.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setSpeciesId(s.id)}
                    className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-mint-50"
                  >
                    <PlantArt
                      art={s.art}
                      tint={s.tint}
                      className="h-11 w-11 shrink-0 rounded-lg"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">
                        {s.commonName}
                        {s.custom && (
                          <span className="ml-1.5 rounded-full bg-mint-100 px-2 py-0.5 text-[10px] font-semibold text-leaf-700">
                            community
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-xs italic text-moss">
                        {s.scientificName}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-moss">
                  Nothing matches "{query}". Try another name, or add it below.
                </li>
              )}
            </ul>

            <SubmitSpecies onVerified={handleVerified} />
          </>
        )}
      </section>

      {/* Step 2: details */}
      <section className="mt-6">
        <p className="text-[13px] font-semibold text-leaf-700">
          2. Make it yours
        </p>

        <div className="mt-3 space-y-3.5">
          <div>
            <span className="mb-1 block text-xs font-semibold text-moss">
              Photo <span className="font-normal text-moss/60">(optional)</span>
            </span>
            {coverPhoto ? (
              <div className="relative overflow-hidden rounded-2xl">
                <img src={coverPhoto} alt="Chosen plant" className="aspect-[2/1] w-full object-cover" />
                <button
                  onClick={() => setCoverPhoto(null)}
                  className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-peach-500 shadow-soft"
                >
                  Remove
                </button>
              </div>
            ) : (
              <PhotoInput
                onPhoto={setCoverPhoto}
                className="w-full rounded-2xl border border-dashed border-mint-300 bg-mint-50 py-5 text-center text-[13px] font-semibold text-leaf-700 transition-colors hover:bg-mint-100"
              >
                Add a photo (or keep the illustration)
              </PhotoInput>
            )}
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-moss">
              Nickname
            </span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Something like Delores or Big Bird"
              className="w-full rounded-2xl border border-mint-200 bg-white px-4 py-3 text-sm outline-none focus:border-leaf-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-moss">
              Acquired
            </span>
            <input
              type="date"
              value={acquiredDate}
              max={todayISO()}
              onChange={(e) => setAcquiredDate(e.target.value)}
              className="w-full rounded-2xl border border-mint-200 bg-white px-4 py-3 text-sm outline-none focus:border-leaf-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-moss">
              Note <span className="font-normal text-moss/60">(optional)</span>
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Where it came from, first impressions..."
              className="w-full resize-none rounded-2xl border border-mint-200 bg-white px-4 py-3 text-sm outline-none focus:border-leaf-500"
            />
          </label>
        </div>
      </section>

      <div className="mt-6 pb-8">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full rounded-2xl bg-leaf-600 py-3.5 font-display text-[15px] font-semibold text-white shadow-lift transition-all enabled:hover:bg-leaf-700 disabled:cursor-not-allowed disabled:bg-mint-200 disabled:text-moss/50 disabled:shadow-none"
        >
          {canSave
            ? `Put ${nickname.trim()} on the shelf`
            : 'Pick a species and a nickname'}
        </button>
      </div>
    </div>
  )
}
