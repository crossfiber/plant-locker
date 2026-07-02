import Logo from '../components/Logo'
import PlantArt from '../components/PlantArt'
import { getSpecies } from '../data/species'
import { GlobeIcon, PeopleIcon, LockIcon } from '../components/Icons'

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

function PlantCard({ plant, onOpen, wide = false }) {
  const species = getSpecies(plant.speciesId)
  return (
    <button
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-2xl bg-white text-left shadow-soft ring-1 ring-mint-200 transition-shadow hover:shadow-lift ${
        wide ? 'col-span-2' : ''
      }`}
    >
      <div className={`relative ${wide ? 'aspect-[2/1]' : 'aspect-square'}`}>
        <PlantArt
          art={species?.art}
          stage={plant.coverImage.stage}
          tint={plant.coverImage.tint}
          className="h-full w-full"
        />
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

export default function LockerScreen({ plants, onOpenPlant }) {
  const speciesCount = new Set(plants.map((p) => p.speciesId)).size
  const firstYear = Math.min(...plants.map((p) => yearOf(p.acquiredDate)))
  const newest = plants[plants.length - 1]
  const rest = plants.slice(0, -1)

  return (
    <div className="px-5 pt-6">
      <header className="flex items-center gap-2.5">
        <Logo size={34} />
        <span className="font-display text-lg font-bold tracking-tight">
          Plant Locker
        </span>
      </header>

      {/* Collection stats, written as a sentence instead of a stat bar */}
      <div className="mt-6">
        <h1 className="font-display text-[26px] font-bold leading-snug tracking-tight">
          Your shelf
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-moss">
          <span className="font-semibold text-leaf-700">{plants.length} plants</span>{' '}
          across{' '}
          <span className="font-semibold text-leaf-700">
            {speciesCount} species
          </span>
          , growing with you since {firstYear}.
        </p>
      </div>

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
    </div>
  )
}
