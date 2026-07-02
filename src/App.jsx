import { useEffect, useState } from 'react'
import { backend } from './api/backend'
import { SEED_PLANTS } from './data/plants'
import AuthScreen from './screens/AuthScreen'
import LockerScreen from './screens/LockerScreen'
import AddPlantScreen from './screens/AddPlantScreen'
import PlantScreen from './screens/PlantScreen'
import TabBar from './components/TabBar'

// Navigation is plain React state (three screens, no router needed):
//   { name: 'locker' } | { name: 'add' } | { name: 'plant', id }
// All data flows through src/api/backend.js (the Supabase-shaped
// localStorage skeleton), so the locker persists across refreshes.
export default function App() {
  const [user, setUser] = useState(() => backend.currentUser())
  const [plants, setPlants] = useState([])
  const [view, setView] = useState({ name: 'locker' })

  useEffect(() => {
    setPlants(user ? backend.listPlants(user.id) : [])
    setView({ name: 'locker' })
  }, [user])

  function refresh() {
    setPlants(backend.listPlants(user.id))
  }

  function addPlant(draft) {
    const species = backend.getSpecies(draft.speciesId)
    backend.addPlant(user.id, {
      speciesId: draft.speciesId,
      nickname: draft.nickname,
      acquiredDate: draft.acquiredDate,
      coverPhoto: draft.coverPhoto || null,
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
    })
    refresh()
    setView({ name: 'locker' })
  }

  function updatePlant(plantId, patch) {
    backend.updatePlant(user.id, plantId, patch)
    refresh()
  }

  function loadExamples() {
    for (const seed of SEED_PLANTS) {
      const { id, ...rest } = seed
      backend.addPlant(user.id, rest)
    }
    refresh()
  }

  function signOut() {
    backend.signOut()
    setUser(null)
  }

  const activePlant =
    view.name === 'plant' ? plants.find((p) => p.id === view.id) : null

  return (
    <div className="flex min-h-dvh justify-center">
      {/* Phone column: the whole app lives in a centered ~430px frame */}
      <div className="relative flex min-h-dvh w-full max-w-[430px] flex-col bg-white shadow-glass">
        {!user ? (
          <AuthScreen onAuthed={setUser} />
        ) : (
          <>
            <main className="flex-1 pb-28">
              {view.name === 'locker' && (
                <LockerScreen
                  user={user}
                  plants={plants}
                  onOpenPlant={(id) => setView({ name: 'plant', id })}
                  onAdd={() => setView({ name: 'add' })}
                  onLoadExamples={loadExamples}
                  onSignOut={signOut}
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
                  onSetPrivacy={(privacy) => updatePlant(activePlant.id, { privacy })}
                  onSetPhoto={(coverPhoto) => updatePlant(activePlant.id, { coverPhoto })}
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
          </>
        )}
      </div>
    </div>
  )
}
