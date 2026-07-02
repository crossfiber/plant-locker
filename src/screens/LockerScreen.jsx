import Logo from '../components/Logo'
import PlantArt from '../components/PlantArt'
import { backend } from '../api/backend'
import { GlobeIcon, PeopleIcon, LockIcon, PlusIcon } from '../components/Icons'

const PRIVACY_ICON = {
  public: GlobeIcon,
  friends: PeopleIcon,
  private: LockIcon,
}

function yearOf(dateStr) {
  return new Date(dateStr + 'T00:00:00').getFullYear()
}

function PrivacyChip({ privacy }) {
  const Icon = PRIVACY_ICON[privacy] || LockIcon
  return (
    <span className="absolute right-2.5 top-2.5 rounded-full bg-white/85 p-1.5 text-moss shadow-soft backdrop-blur">
      <Icon size={13} />
    </span>
  )
}

function Cover({ plant, species }) {
  if (plant.coverPhoto) {
    return (
      <img
        src={plant.coverPhoto}
        alt={`${plant.nickname}, a ${species?.commonName || 'plant'}`}
        className="h-full w-full object-cover"
      />
    )
  }
  return (
    <PlantArt
      art={species?.art}
      stage={plant.coverImage?.stage}
      tint={plant.coverImage?.tint}
      className="h-full w-full"
    />
  )
}

function PlantCard({ plant, onOpen, wide = false }) {
  const species = backend.getSpecies(plant.speciesId)
  return (
    <button
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-2xl bg-white text-left shadow-soft ring-1 ring-mint-200 transition-shadow hover:shadow-lift ${
        wide ? 'col-span-2' : ''
      }`}
    >
      <div className={`relative ${wide ? 'aspect-[2/1]' : 'aspect-square'}`}>
        <Cover plant={plant} species={species} />
        <PrivacyChip privacy={plant.privacy} />
        {wide && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-peach-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-peach-500">
            Newest
          </span>
        )}
      </div>
      <div className={`px-3.5 pb-3.5 pt-2.5 ${wide ? 'flex items-baseline justify-between' : ''}`}>
        <h3 className="font-display text-[15px] font-semibold leading-tight">
          {plant.nickname}
        </h3>
        <p className="mt-0.5 text-xs text-moss">{species?.commonName}</p>
      </div>
    </button>
  )
}

function EmptyShelf({ onAdd, onLoadExamples }) {
  return (
    <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-mint-300 bg-mint-50 px-6 py-10 text-center">
      <PlantArt art="monstera" stage="sprout" tint="sand" className="h-28 w-28 rounded-2xl" />
      <h2 className="mt-4 font-display text-lg font-bold">Nothing on the shelf yet</h2>
      <p className="mt-1 max-w-[240px] text-[13px] leading-relaxed text-moss">
        Every collection starts with one plant. Add yours, or look around
        with the example shelf first.
      </p>
      <button
        onClick={onAdd}
        className="mt-5 flex items-center gap-1.5 rounded-2xl bg-leaf-600 px-5 py-3 font-display text-sm font-semibold text-white shadow-lift transition-colors hover:bg-leaf-700"
      >
        <PlusIcon size={16} />
        Add your first plant
      </button>
      <button
        onClick={onLoadExamples}
        className="mt-2.5 rounded-2xl px-4 py-2 text-[13px] font-semibold text-leaf-700 underline decoration-mint-300 underline-offset-4"
      >
        Load the example shelf
      </button>
    </div>
  )
}

export default function LockerScreen({
  user,
  plants,
  onOpenPlant,
  onAdd,
  onLoadExamples,
  onSignOut,
}) {
  const speciesCount = new Set(plants.map((p) => p.speciesId)).size
  const firstYear = plants.length
    ? Math.min(...plants.map((p) => yearOf(p.acquiredDate)))
    : null
  const newest = plants[plants.length - 1]
  const rest = plants.slice(0, -1)

  return (
    <div className="px-5 pt-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo size={34} />
          <span className="font-display text-lg font-bold tracking-tight">
            Plant Locker
          </span>
        </div>
        <button
          onClick={onSignOut}
          className="rounded-full bg-mint-100 px-3.5 py-1.5 text-xs font-semibold text-leaf-700 transition-colors hover:bg-mint-200"
          title="Sign out"
        >
          @{user.handle} &middot; out
        </button>
      </header>

      {/* Collection stats, written as a sentence instead of a stat bar */}
      <div className="mt-6">
        <h1 className="font-display text-[26px] font-bold leading-snug tracking-tight">
          Your shelf
        </h1>
        {plants.length > 0 && (
          <p className="mt-1 text-sm leading-relaxed text-moss">
            <span className="font-semibold text-leaf-700">
              {plants.length} {plants.length === 1 ? 'plant' : 'plants'}
            </span>{' '}
            across{' '}
            <span className="font-semibold text-leaf-700">
              {speciesCount} species
            </span>
            , growing with you since {firstYear}.
          </p>
        )}
      </div>

      {plants.length === 0 ? (
        <EmptyShelf onAdd={onAdd} onLoadExamples={onLoadExamples} />
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3.5">
          {newest && (
            <PlantCard
              key={newest.id}
              plant={newest}
              wide
              onOpen={() => onOpenPlant(newest.id)}
            />
          )}
          {rest.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onOpen={() => onOpenPlant(plant.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
