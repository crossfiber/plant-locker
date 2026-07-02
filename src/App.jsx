import { useState } from 'react'
import { SEED_PLANTS } from './data/plants'
import { getSpecies } from './data/species'
import LockerScreen from './screens/LockerScreen'
import AddPlantScreen from './screens/AddPlantScreen'
import PlantScreen from './screens/PlantScreen'
import TabBar from './components/TabBar'

// Navigation is plain React state (three screens, no router needed):
//   { name: 'locker' } | { name: 'add' } | { name: 'plant', id }
export default function App() {
  const [plants, setPlants] = useState(SEED_PLANTS)
  const [view, setView] = useState({ name: 'locker' })

  function addPlant(draft) {
    const species = getSpecies(draft.speciesId)
    const plant = {
      id: `plant-${Date.now()}`,
      speciesId: draft.speciesId,
      nickname: draft.nickname,
      acquiredDate: draft.acquiredDate,
      coverImage: { stage: 'young', tint: species?.tint || 'mint' },
      notes: draft.note || '',
      // TODO: new plants default to private; no privacy field on the
      // add form to keep it lean. Change on the plant page after saving.
      privacy: 'private',
      timeline: [
        {
          date: draft.acquiredDate,
          image: { stage: 'sprout', tint: 'sand' },
          note: draft.note || 'Joined the locker.',
        },
      ],
    }
    setPlants((prev) => [...prev, plant])
    setView({ name: 'locker' })
  }

  function setPrivacy(id, privacy) {
    setPlants((prev) => prev.map((p) => (p.id === id ? { ...p, privacy } : p)))
  }

  const activePlant =
    view.name === 'plant' ? plants.find((p) => p.id === view.id) : null

  return (
    <div className="flex min-h-dvh justify-center">
      {/* Phone column: the whole app lives in a centered ~430px frame */}
      <div className="relative flex min-h-dvh w-full max-w-[430px] flex-col bg-white shadow-glass">
        <main className="flex-1 pb-28">
          {view.name === 'locker' && (
            <LockerScreen
              plants={plants}
              onOpenPlant={(id) => setView({ name: 'plant', id })}
            />
          )}
          {view.name === 'add' && (
            <AddPlantScreen
              onSave={addPlant}
              onCancel={() => setView({ name: 'locker' })}
            />
          )}
          {view.name === 'plant' && activePlant && (
            <PlantScreen
              plant={activePlant}
              onBack={() => setView({ name: 'locker' })}
              onSetPrivacy={(privacy) => setPrivacy(activePlant.id, privacy)}
            />
          )}
        </main>

        {view.name !== 'add' && (
          <TabBar
            plantCount={plants.length}
            onLocker={() => setView({ name: 'locker' })}
            onAdd={() => setView({ name: 'add' })}
            lockerActive={view.name === 'locker'}
          />
        )}
      </div>
    </div>
  )
}
