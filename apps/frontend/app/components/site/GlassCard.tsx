import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <article className={`glass-panel rounded-2xl p-5 shadow-glow md:p-6 ${className ?? ''}`.trim()}>
      {children}
    </article>
  )
}
