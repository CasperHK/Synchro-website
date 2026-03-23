import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'
import { LoginSchema } from '@synchro/shared'
import { loginAdmin } from '~/lib/docs-api'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@synchro.dev')
  const [password, setPassword] = useState('synchro-admin')
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      localStorage.setItem('synchro-admin-token', data.token)
      navigate('/admin/docs')
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Login failed')
    },
  })

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const parsed = LoginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid credentials')
      return
    }

    mutation.mutate(parsed.data)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-synchro-bg px-4 text-synchro-text">
      <section className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-950/70 p-7 shadow-glow">
        <p className="text-xs uppercase tracking-[0.2em] text-synchro-cyan/80">Admin Access</p>
        <h1 className="mt-2 text-2xl font-semibold">Synchro Docs Admin Login</h1>
        <p className="mt-2 text-sm text-slate-400">Use validated credentials to edit docs content.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 outline-none ring-synchro-cyan/40 focus:ring-2"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 outline-none ring-synchro-cyan/40 focus:ring-2"
            />
          </label>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-synchro-cyan px-4 py-2 font-semibold text-slate-950 disabled:opacity-60"
          >
            {mutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <Link to="/docs" className="mt-4 inline-block text-xs text-slate-400 hover:text-synchro-cyan">
          Back to docs
        </Link>
      </section>
    </main>
  )
}
