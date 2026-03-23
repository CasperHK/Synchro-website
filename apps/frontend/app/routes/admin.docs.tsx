import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateDocSchema, UpdateDocSchema } from '@synchro/shared'
import { createDoc, fetchDocs, updateDoc } from '~/lib/docs-api'

type DocRecord = {
  id: number
  slug: string
  title: string
  body: string
  category: string
  sortOrder: number
}

export default function AdminDocsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [token, setToken] = useState<string | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string>('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('Getting Started')
  const [sortOrder, setSortOrder] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('synchro-admin-token')
    if (!saved) {
      navigate('/admin/login')
      return
    }
    setToken(saved)
  }, [navigate])

  const docsQuery = useQuery({
    queryKey: ['docs'],
    queryFn: fetchDocs,
    enabled: Boolean(token),
  })

  const docs = (docsQuery.data ?? []) as DocRecord[]
  const selectedDoc = useMemo(
    () => docs.find((doc) => doc.slug === selectedSlug) ?? docs[0],
    [docs, selectedSlug]
  )

  useEffect(() => {
    if (!selectedDoc) return
    setSelectedSlug(selectedDoc.slug)
    setTitle(selectedDoc.title)
    setBody(selectedDoc.body)
    setCategory(selectedDoc.category)
    setSortOrder(selectedDoc.sortOrder)
  }, [selectedDoc?.slug])

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!token || !selectedDoc) throw new Error('Missing token or selected doc')

      const parsed = UpdateDocSchema.safeParse({ title, body, category, sortOrder })
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Invalid input')

      return updateDoc(selectedDoc.slug, parsed.data, token)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['docs'] })
      setError(null)
    },
    onError: (err) => setError(err instanceof Error ? err.message : 'Save failed'),
  })

  const createMutation = useMutation({
    mutationFn: async (payload: { slug: string; title: string }) => {
      if (!token) throw new Error('Missing token')

      const parsed = CreateDocSchema.safeParse({
        slug: payload.slug,
        title: payload.title,
        body: '# New Doc\n\nWrite here...',
        category: 'Getting Started',
        sortOrder: docs.length + 1,
      })
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Invalid new doc payload')

      return createDoc(parsed.data, token)
    },
    onSuccess: async (newDoc: { slug: string }) => {
      await queryClient.invalidateQueries({ queryKey: ['docs'] })
      setSelectedSlug(newDoc.slug)
      setError(null)
    },
    onError: (err) => setError(err instanceof Error ? err.message : 'Create failed'),
  })

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const slug = String(form.get('slug') ?? '').trim()
    const newTitle = String(form.get('title') ?? '').trim()
    createMutation.mutate({ slug, title: newTitle })
  }

  if (!token) return null

  return (
    <main className="min-h-screen bg-synchro-bg px-4 py-6 text-synchro-text md:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-b border-white/10 pb-4">
        <h1 className="text-xl font-semibold">Synchro Docs Admin</h1>
        <div className="flex items-center gap-3">
          <Link to="/docs" className="text-xs text-slate-400 hover:text-synchro-cyan">Open docs</Link>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('synchro-admin-token')
              navigate('/admin/login')
            }}
            className="rounded border border-slate-700 px-3 py-1.5 text-xs text-slate-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto mt-6 grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-slate-500">Docs</p>
          <ul className="space-y-1">
            {docs.map((doc) => (
              <li key={doc.id}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(doc.slug)}
                  className={`w-full rounded px-2 py-1.5 text-left text-sm ${
                    selectedDoc?.slug === doc.slug ? 'bg-slate-800 text-synchro-cyan' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {doc.title}
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleCreate} className="mt-6 space-y-2 border-t border-slate-800 pt-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">New doc</p>
            <input name="slug" placeholder="slug" className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm" />
            <input name="title" placeholder="title" className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm" />
            <button type="submit" className="rounded bg-synchro-cyan px-3 py-1.5 text-xs font-semibold text-slate-950">
              Create
            </button>
          </form>
        </aside>

        <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 md:p-6">
          {!selectedDoc ? (
            <p className="text-slate-400">No docs available.</p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                saveMutation.mutate()
              }}
              className="space-y-4"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block text-slate-400">Title</span>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-slate-400">Category</span>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2" />
                </label>
              </div>

              <label className="text-sm">
                <span className="mb-1 block text-slate-400">Sort order</span>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-40 rounded border border-slate-700 bg-slate-900 px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block text-slate-400">Markdown body</span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={18}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs leading-6"
                />
              </label>

              {error && <p className="text-sm text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded bg-synchro-cyan px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
              >
                {saveMutation.isPending ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
