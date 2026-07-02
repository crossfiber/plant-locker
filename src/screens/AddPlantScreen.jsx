import { useMemo, useState } from 'react'
import { SPECIES } from '../data/species'
import PlantArt from '../components/PlantArt'
import { BackIcon, SearchIcon } from '../components/Icons'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function AddPlantScreen({ onSave, onCancel }) {
  const [query, setQuery] = useState('')
  const [speciesId, setSpeciesId] = useState(null)
  const [nickname, setNickname] = useState('')
  const [acquiredDate, setAcquiredDate] = useState(todayISO())
  const [note, setNote] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SPECIES
    return SPECIES.filter(
      (s) =>
        s.commonName.toLowerCase().includes(q) ||
        s.scientificName.toLowerCase().includes(q)
    )
  }, [query])

  const selected = SPECIES.find((s) => s.id === speciesId)
  const canSave = Boolean(speciesId && nickname.trim())

  function handleSave() {
    if (!canSave) return
    onSave({
      speciesId,
      nickname: nickname.trim(),
      acquiredDate,
      note: note.trim(),
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
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-peach-300 bg-peach-100/60 p-3">
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
              onClick={() => setSpeciesId(null)}
              className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-peach-500 shadow-soft"
            >
              Change
            </button>
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

            <ul className="mt-2 max-h-72 divide-y divide-mint-100 overflow-y-auto rounded-2xl border border-mint-200">
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
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {s.commonName}
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
                  Nothing matches "{query}". Try another name.
                </li>
              )}
            </ul>
          </>
        )}
      </section>

      {/* Step 2: details */}
      <section className="mt-6">
        <p className="text-[13px] font-semibold text-leaf-700">
          2. Make it yours
        </p>

        <div className="mt-3 space-y-3.5">
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
