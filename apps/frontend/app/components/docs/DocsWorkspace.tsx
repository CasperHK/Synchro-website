import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/vs2015.css'
import { fetchDocBySlug, fetchDocs } from '~/lib/docs-api'

type DocsWorkspaceProps = {
  slug: string
}

type DocRecord = {
  id: number
  slug: string
  title: string
  body: string
  category: string
  sortOrder: number
}

function toId(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

function extractHeadings(markdown: string) {
  return markdown
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.replace('## ', '').trim())
}

export function DocsWorkspace({ slug }: DocsWorkspaceProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeHeading, setActiveHeading] = useState('')

  const docsQuery = useQuery({ queryKey: ['docs'], queryFn: fetchDocs })
  const docQuery = useQuery({ queryKey: ['docs', slug], queryFn: () => fetchDocBySlug(slug) })

  const docs = (docsQuery.data ?? []) as DocRecord[]
  const currentDoc = (docQuery.data as DocRecord | undefined) ?? docs.find((item) => item.slug === slug)

  const filteredDocs = useMemo(() => {
    if (!search.trim()) return docs
    const q = search.toLowerCase()
    return docs.filter((item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q))
  }, [docs, search])

  const headings = useMemo(() => extractHeadings(currentDoc?.body ?? ''), [currentDoc?.body])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    )

    const targets = document.querySelectorAll('[data-doc-heading="true"]')
    targets.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [currentDoc?.body])

  useEffect(() => {
    if (docsQuery.isSuccess && docs.length > 0 && !docs.some((item) => item.slug === slug)) {
      navigate(`/docs/${docs[0].slug}`, { replace: true })
    }
  }, [docs, docsQuery.isSuccess, navigate, slug])

  return (
    <main className="min-h-screen bg-synchro-bg text-synchro-text">
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 md:px-8">
          <Link to="/" className="text-sm font-semibold tracking-wide text-synchro-cyan">Synchro Docs</Link>
          <div className="ml-auto flex flex-1 items-center gap-3 md:max-w-xl">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search docs..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-synchro-cyan/50 focus:ring-2"
            />
            <a href="https://github.com/CasperHK/Synchro" target="_blank" rel="noreferrer" className="hidden text-xs text-slate-300 hover:text-synchro-cyan md:inline">
              GitHub
            </a>
            <a href="/admin/login" className="rounded-full bg-synchro-cyan px-4 py-2 text-xs font-semibold text-slate-950">
              Start Vibe Coding
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-0 md:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-slate-950/40 px-4 py-6 md:min-h-[calc(100vh-73px)] md:px-6">
          <nav className="space-y-6">
            {groupByCategory(filteredDocs).map(([category, items]) => (
              <section key={category}>
                <h3 className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">{category}</h3>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/docs/${item.slug}`}
                        className={`block rounded-md px-2 py-1.5 text-sm transition ${
                          item.slug === slug
                            ? 'bg-slate-800 text-synchro-cyan'
                            : 'text-slate-300 hover:bg-slate-900 hover:text-synchro-cyan'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>

          {headings.length > 0 && (
            <div className="mt-10 border-t border-white/10 pt-4">
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">On this page</p>
              <ul className="space-y-1">
                {headings.map((heading) => {
                  const id = toId(heading)
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`block rounded px-2 py-1 text-xs ${
                          activeHeading === id ? 'text-synchro-cyan' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {heading}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </aside>

        <section className="px-4 py-8 md:px-10 md:py-10">
          {docsQuery.isLoading || docQuery.isLoading ? (
            <p className="text-slate-400">Loading docs...</p>
          ) : !currentDoc ? (
            <p className="text-slate-400">Document not found.</p>
          ) : (
            <article className="docs-markdown max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h2: ({ children }) => {
                    const text = String(children)
                    const id = toId(text)
                    return (
                      <h2 id={id} data-doc-heading="true">
                        {children}
                      </h2>
                    )
                  },
                  h3: ({ children }) => {
                    const text = String(children)
                    const id = toId(text)
                    return (
                      <h3 id={id} data-doc-heading="true">
                        {children}
                      </h3>
                    )
                  },
                }}
              >
                {currentDoc.body}
              </ReactMarkdown>
            </article>
          )}
        </section>
      </div>
    </main>
  )
}

function groupByCategory(docs: DocRecord[]) {
  const map = new Map<string, DocRecord[]>()
  for (const doc of docs) {
    if (!map.has(doc.category)) map.set(doc.category, [])
    map.get(doc.category)?.push(doc)
  }
  return Array.from(map.entries()).map(([category, items]) => [
    category,
    [...items].sort((a, b) => a.sortOrder - b.sortOrder),
  ]) as Array<[string, DocRecord[]]>
}
