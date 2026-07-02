import { useState } from 'react'
import Logo from '../components/Logo'
import { backend } from '../api/backend'

// Login / signup. Accounts are browser-local for now; the real
// login system arrives with Supabase Auth (see src/api/backend.js).
export default function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState('login')
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res =
      mode === 'signup'
        ? await backend.signUp({ handle, email, password })
        : await backend.signIn({ email, password })
    setBusy(false)
    if (res.error) setError(res.error)
    else onAuthed(res.user)
  }

  const field =
    'w-full rounded-2xl border border-mint-200 bg-white px-4 py-3 text-sm outline-none focus:border-leaf-500'

  return (
    <div className="flex min-h-dvh flex-col justify-center px-6 pb-16">
      <div className="flex flex-col items-center">
        <Logo size={64} />
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
          Plant Locker
        </h1>
        <p className="mt-1 text-sm text-moss">Your shelf, wherever you are.</p>
      </div>

      <div className="mt-8 rounded-3xl border border-mint-200 bg-white p-5 shadow-glass">
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-mint-100 p-1" role="tablist">
          {[
            ['login', 'Log in'],
            ['signup', 'Create account'],
          ].map(([value, label]) => (
            <button
              key={value}
              role="tab"
              aria-selected={mode === value}
              onClick={() => { setMode(value); setError('') }}
              className={`rounded-xl py-2 text-[13px] font-semibold transition-all ${
                mode === value
                  ? 'bg-peach-100 text-peach-500 shadow-soft ring-1 ring-peach-300'
                  : 'text-moss'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} noValidate className="mt-4 space-y-3">
          {mode === 'signup' && (
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-moss">Handle</span>
              <input
                value={handle}
                onChange={(e) => { setHandle(e.target.value); setError('') }}
                placeholder="@plantperson"
                className={field}
                autoComplete="username"
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-moss">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="you@email.com"
              className={field}
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-moss">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
              className={field}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />
          </label>

          {error && (
            <p className="rounded-xl bg-peach-100 px-3 py-2 text-xs font-medium text-peach-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-2xl bg-leaf-600 py-3.5 font-display text-[15px] font-semibold text-white shadow-lift transition-colors hover:bg-leaf-700 disabled:opacity-60"
          >
            {mode === 'signup' ? 'Start your locker' : 'Open your locker'}
          </button>
        </form>
      </div>

      {mode === 'login' && (
        <p className="mt-3 text-center text-xs text-moss">
          Just looking around? Log in with{' '}
          <button
            onClick={() => { setEmail('test@test.com'); setPassword('test'); setError('') }}
            className="font-semibold text-leaf-700 underline decoration-mint-300 underline-offset-2"
          >
            test@test.com / test
          </button>
        </p>
      )}

      <p className="mt-4 text-center text-[11px] leading-relaxed text-moss/80">
        Accounts live in this browser for now. The shared login system
        arrives with the backend milestone.
      </p>
    </div>
  )
}
