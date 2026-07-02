import PlantArt from '../components/PlantArt'
import { getSpecies } from '../data/species'
import {
  BackIcon,
  SunIcon,
  DropIcon,
  MistIcon,
  GaugeIcon,
  GlobeIcon,
  PeopleIcon,
  LockIcon,
  CalendarIcon,
  SproutIcon,
} from '../components/Icons'

const PRIVACY_OPTIONS = [
  { value: 'public', label: 'Public', Icon: GlobeIcon, caption: 'Anyone can see this plant.' },
  { value: 'friends', label: 'Friends', Icon: PeopleIcon, caption: 'Only friends can see this plant.' },
  { value: 'private', label: 'Private', Icon: LockIcon, caption: 'Just for you.' },
]

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function PrivacyToggle({ privacy, onChange }) {
  const active = PRIVACY_OPTIONS.find((o) => o.value === privacy)
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Who can see this plant"
        className="grid grid-cols-3 gap-1 rounded-2xl bg-mint-100 p-1"
      >
        {PRIVACY_OPTIONS.map(({ value, label, Icon }) => {
          const isActive = value === privacy
          return (
            <button
              key={value}
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(value)}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-[13px] font-semibold transition-all ${
                isActive
                  ? 'bg-peach-100 text-peach-500 shadow-soft ring-1 ring-peach-300'
                  : 'text-moss hover:text-leaf-700'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          )
        })}
      </div>
      <p className="mt-1.5 pl-1 text-xs text-moss">{active?.caption}</p>
    </div>
  )
}

function TimelineEntry({ entry, isLast }) {
  return (
    <li className="relative flex gap-4 pb-6">
      {!isLast && (
        <span className="absolute left-[7px] top-5 h-full w-px bg-mint-300" aria-hidden />
      )}
      <span className="relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-leaf-500 bg-white" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-moss">
          {formatDate(entry.date)}
        </p>
        <div className="mt-2 flex gap-3 rounded-2xl bg-white p-2.5 shadow-soft ring-1 ring-mint-200">
          <PlantArt
            art={entry.art}
            stage={entry.image.stage}
            tint={entry.image.tint}
            className="h-20 w-20 shrink-0 rounded-xl"
          />
          <p className="self-center text-[13px] leading-relaxed text-ink/85">
            {entry.note}
          </p>
        </div>
      </div>
    </li>
  )
}

export default function PlantScreen({ plant, onBack, onSetPrivacy }) {
  const species = getSpecies(plant.speciesId)

  return (
    <div>
      {/* Cover bleeds to the column edges; header floats over it */}
      <div className="relative">
        <PlantArt
          art={species?.art}
          stage={plant.coverImage.stage}
          tint={plant.coverImage.tint}
          className="aspect-[4/3] w-full"
        />
        <button
          onClick={onBack}
          aria-label="Back to locker"
          className="absolute left-4 top-5 rounded-full bg-white/90 p-2 text-leaf-700 shadow-soft backdrop-blur"
        >
          <BackIcon size={18} />
        </button>
      </div>

      <div className="px-5">
        {/* Identity card overlaps the cover */}
        <section className="-mt-10 rounded-3xl border border-mint-200 bg-white/95 p-5 shadow-lift backdrop-blur">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {plant.nickname}
          </h1>
          <p className="mt-0.5 text-sm text-moss">
            {species?.commonName}{' '}
            <span className="italic">({species?.scientificName})</span>
          </p>
          <p className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-leaf-700">
            <CalendarIcon size="14" />
            On the shelf since {formatDate(plant.acquiredDate)}
          </p>

          <div className="mt-4">
            <PrivacyToggle privacy={plant.privacy} onChange={onSetPrivacy} />
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-7">
          <h2 className="font-display text-lg font-bold tracking-tight">
            Growth timeline
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-moss">
            Progression photos follow this plant's visibility setting, so this
            timeline is {plant.privacy === 'public' ? 'visible to anyone' : plant.privacy === 'friends' ? 'visible to friends only' : 'visible only to you'}.
          </p>
          <ul className="mt-4">
            {plant.timeline.map((entry, i) => (
              <TimelineEntry
                key={entry.date + i}
                entry={{ ...entry, art: species?.art }}
                isLast={i === plant.timeline.length - 1}
              />
            ))}
          </ul>
        </section>

        {/* Notes */}
        {plant.notes && (
          <section className="mt-2 rounded-2xl bg-mint-50 p-4 ring-1 ring-mint-200">
            <h2 className="flex items-center gap-1.5 font-display text-sm font-bold">
              <span className="text-leaf-600">
                <SproutIcon size={16} />
              </span>
              Keeper's notes
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/85">
              {plant.notes}
            </p>
          </section>
        )}

        {/* Species care info */}
        <section className="mt-5 pb-8">
          <h2 className="font-display text-lg font-bold tracking-tight">
            Keeping a {species?.commonName} happy
          </h2>
          <div className="mt-3 space-y-2.5">
            {[
              { Icon: SunIcon, label: 'Light', text: species?.careInfo.light },
              { Icon: DropIcon, label: 'Water', text: species?.careInfo.water },
              { Icon: MistIcon, label: 'Humidity', text: species?.careInfo.humidity },
              { Icon: GaugeIcon, label: 'Difficulty', text: species?.careInfo.difficulty },
            ].map(({ Icon, label, text }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-soft ring-1 ring-mint-200"
              >
                <span className="mt-0.5 rounded-xl bg-mint-100 p-2 text-leaf-700">
                  <Icon size={17} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-moss">
                    {label}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink/85">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
