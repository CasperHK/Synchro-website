const NAV_COLUMNS = [
  {
    heading: 'Ecosystem',
    links: [
      { label: 'GSD Framework', href: 'https://github.com/CasperHK/Synchro' },
      { label: 'Hono RPC', href: 'https://hono.dev' },
      { label: 'TanStack', href: 'https://tanstack.com' },
      { label: 'Bun Runtime', href: 'https://bun.sh' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Quick Start', href: 'https://github.com/CasperHK/Synchro#getting-started' },
      { label: 'Examples', href: 'https://github.com/CasperHK/Synchro' },
      { label: 'API Reference', href: 'https://github.com/CasperHK/Synchro' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/CasperHK/Synchro' },
      { label: 'Discord', href: '#' },
      { label: 'Twitter (X)', href: '#' },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-8 border-t border-white/[0.07] bg-synchro-bg/95 px-6 pb-10 pt-12 md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* ─── Vibe Coding tagline ─────────────────────────────────────── */}
        <p className="mb-10 max-w-sm text-[11px] leading-[1.9] tracking-wide text-synchro-muted/80">
          Synchro is built for{' '}
          <span className="text-synchro-cyan/90">Vibe Coding</span>.{' '}
          Highly integrated with{' '}
          <span className="text-synchro-cyan/90">GSD Spec-Driven Development</span>{' '}
          principles.
        </p>

        {/* ─── Column navigation (3-col desktop → 2-col mobile) ────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-synchro-muted/55">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="footer-link text-[12px] text-synchro-muted/70"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Bottom bar ──────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.05] pt-6 text-[11px] text-synchro-muted/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2024 Synchro. Zero-Hallucination Fullstack Engine.</span>

          {/* 綠點象徵系統型別安全、全域同步穩定 */}
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 6px 2px rgba(52,211,153,0.55)' }}
            />
            System Status: Fully Synchronized
          </span>
        </div>

      </div>
    </footer>
  )
}
