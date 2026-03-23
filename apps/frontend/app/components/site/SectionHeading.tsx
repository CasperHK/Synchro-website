import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-synchro-cyan/80">{eyebrow}</p>
        )}
        <h2 className="text-balance text-3xl font-semibold leading-tight text-synchro-text md:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-4 max-w-2xl text-sm leading-7 text-synchro-muted md:text-base">{description}</p>}
      </div>
      {action}
    </div>
  )
}
