import type { Locale } from '~/content/site-content'

type LanguageToggleProps = {
  locale: Locale
  onChange: (locale: Locale) => void
}

export function LanguageToggle({ locale, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-700/70 bg-slate-900/70 p-1 text-xs text-slate-300">
      <button
        type="button"
        onClick={() => onChange('zh-TW')}
        className={`rounded-full px-3 py-1 transition ${
          locale === 'zh-TW'
            ? 'bg-synchro-cyan/20 text-synchro-text'
            : 'text-slate-400 hover:text-synchro-text'
        }`}
      >
        繁中
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`rounded-full px-3 py-1 transition ${
          locale === 'en'
            ? 'bg-synchro-cyan/20 text-synchro-text'
            : 'text-slate-400 hover:text-synchro-text'
        }`}
      >
        EN
      </button>
    </div>
  )
}
