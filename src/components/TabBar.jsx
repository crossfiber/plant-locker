import Logo from './Logo'
import { PlusIcon } from './Icons'

// Bottom nav: Locker tab + center Add button (per spec, nothing else).
// The right slot is a quiet, non-interactive shelf count to balance
// the bar without inventing fake tabs.
export default function TabBar({ plantCount, onLocker, onAdd, lockerActive }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2">
      <div className="relative mx-4 mb-4 flex items-center justify-between rounded-3xl border border-mint-200 bg-white/90 px-7 py-3 shadow-lift backdrop-blur">
        <button
          onClick={onLocker}
          className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[11px] font-semibold transition-colors ${
            lockerActive ? 'text-leaf-700' : 'text-moss'
          }`}
          aria-current={lockerActive ? 'page' : undefined}
        >
          <Logo size={24} />
          Locker
        </button>

        <button
          onClick={onAdd}
          aria-label="Add a plant"
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf-600 p-4 text-white shadow-lift transition-transform hover:-translate-y-[55%] active:scale-95"
        >
          <PlusIcon size={22} />
        </button>

        <span className="text-[11px] font-medium text-moss/70">
          {plantCount} on the shelf
        </span>
      </div>
    </nav>
  )
}
