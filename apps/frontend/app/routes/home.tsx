import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { AnimatedSynchroBackground } from '~/components/site/AnimatedSynchroBackground'
import { GlassCard } from '~/components/site/GlassCard'
import { LanguageToggle } from '~/components/site/LanguageToggle'
import { SectionHeading } from '~/components/site/SectionHeading'
import type { Locale } from '~/content/site-content'
import { siteContent } from '~/content/site-content'

const TECH_MARKS: Record<string, string> = {
  Bun: '◈',
  'React Router v7': '◎',
  Hono: '⬢',
  Prisma: '◉',
  Zod: '◇',
}

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * index, ease: 'easeOut' },
  }),
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>('zh-TW')

  useEffect(() => {
    const saved = window.localStorage.getItem('synchro-locale')
    if (saved === 'zh-TW' || saved === 'en') {
      setLocale(saved)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('synchro-locale', locale)
  }, [locale])

  const content = useMemo(
    () => ({
      slogan: siteContent.slogan[locale],
      heroTitle: siteContent.hero.title[locale],
      heroSubtitle: siteContent.hero.subtitle[locale],
      heroPrimary: siteContent.hero.ctaPrimary[locale],
      heroSecondary: siteContent.hero.ctaSecondary[locale],
      gsdTitle: siteContent.gsd.title[locale],
      ctaTitle: siteContent.cta.title[locale],
      ctaSubtitle: siteContent.cta.subtitle[locale],
      structureTitle: siteContent.structureTitle[locale],
    }),
    [locale]
  )

  return (
    <main className="relative min-h-screen overflow-hidden bg-synchro-bg text-synchro-text">
      <AnimatedSynchroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-10 md:px-10 md:pt-14">
        <header className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.22em] text-synchro-cyan/80">Synchro Official</p>
          <LanguageToggle locale={locale} onChange={setLocale} />
        </header>

        <section className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <motion.div initial="hidden" animate="show" custom={0} variants={revealVariants}>
            <p className="mb-4 text-sm text-synchro-muted">{content.slogan}</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">{content.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{content.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/CasperHK/Synchro"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-synchro-cyan px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                {content.heroPrimary}
              </a>
              <a
                href="#philosophy"
                className="rounded-full border border-slate-600/80 px-6 py-3 text-sm text-slate-200 transition hover:border-synchro-cyan/60 hover:text-synchro-cyan"
              >
                {content.heroSecondary}
              </a>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" custom={1} variants={revealVariants}>
            <GlassCard>
              <p className="text-sm text-slate-300">
                {locale === 'zh-TW'
                  ? '在 Synchro 中，AI 不是在猜測你的後端，而是在讀取你的靈魂（Schema）。'
                  : 'In Synchro, AI is not guessing your backend. It is reading your schema.'}
              </p>
              <p className="mt-4 text-sm leading-7 text-synchro-muted">
                {locale === 'zh-TW'
                  ? '你專注產品創意與流程設計，型別同步與防呆交給架構本身處理。'
                  : 'You focus on product vibe and logic while the architecture enforces correctness.'}
              </p>
            </GlassCard>
          </motion.div>
        </section>

        <section id="philosophy" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Core Philosophy"
            title={locale === 'zh-TW' ? '讓 AI 生成速度與工程穩定性同時成立' : 'High-velocity AI coding without sacrificing engineering stability'}
            description={
              locale === 'zh-TW'
                ? '這三個約束是 Synchro 的核心。新手不需要硬背所有規則，系統會在正確軌道上保護你。'
                : 'These three constraints are the core of Synchro. New developers stay safe by default.'
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.philosophy.map((item, index) => (
              <motion.div key={item.title.en} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} custom={index} variants={revealVariants}>
                <GlassCard>
                  <h3 className="text-lg font-semibold">{item.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-synchro-muted">{item.description[locale]}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Tech Stack"
            title={locale === 'zh-TW' ? '為 AI 協作與全端一致性打造的組合' : 'A stack designed for AI collaboration and fullstack consistency'}
            description={
              locale === 'zh-TW'
                ? '每一層都為「可預測」而設計，讓你與 LLM 協作時可以放心加速。'
                : 'Every layer is optimized for predictability so you can move faster with LLMs.'
            }
          />
          <div className="grid gap-4 md:grid-cols-5">
            {siteContent.stack.map((item, index) => (
              <motion.div key={item.name} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} custom={index} variants={revealVariants}>
                <GlassCard className="h-full">
                  <p className="text-xs uppercase tracking-[0.16em] text-synchro-cyan/80">{TECH_MARKS[item.name]} Stack</p>
                  <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-synchro-muted">{item.description[locale]}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Newbie Friendly"
            title={locale === 'zh-TW' ? '讓新手也能在 AI 協作下穩定交付' : 'Help newcomers ship reliably with AI'}
            description={
              locale === 'zh-TW'
                ? '同樣是「新增使用者標籤」需求，Synchro 讓你的 IDE 直接指出正確欄位與路徑。'
                : 'For the same feature request, Synchro guides route and payload correctness in your IDE.'
            }
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <p className="mb-4 text-sm font-semibold text-rose-300">{siteContent.codeDiff.leftTitle[locale]}</p>
              <pre className="code-block overflow-x-auto rounded-xl p-4 text-xs leading-6 text-slate-300 md:text-sm">
                <code>{siteContent.codeDiff.leftCode}</code>
              </pre>
            </GlassCard>
            <GlassCard>
              <p className="mb-4 text-sm font-semibold text-emerald-300">{siteContent.codeDiff.rightTitle[locale]}</p>
              <pre className="code-block overflow-x-auto rounded-xl p-4 text-xs leading-6 text-slate-200 md:text-sm">
                <code>{siteContent.codeDiff.rightCode}</code>
              </pre>
            </GlassCard>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <GlassCard>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-synchro-cyan/80">Structure</p>
            <h3 className="text-2xl font-semibold">{content.structureTitle}</h3>
            <pre className="code-block mt-5 overflow-x-auto rounded-xl p-4 text-xs leading-6 text-slate-300 md:text-sm">
              <code>{siteContent.structureTree}</code>
            </pre>
          </GlassCard>

          <GlassCard>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-synchro-cyan/80">GSD Flow</p>
            <h3 className="text-2xl font-semibold">{content.gsdTitle}</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {siteContent.gsd.steps.map((step) => (
                <li key={step.en} className="rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3">
                  {step[locale]}
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>

        <section>
          <GlassCard className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-synchro-blue/20 blur-3xl" />
            <h2 className="relative z-10 text-balance text-3xl font-semibold leading-tight md:text-4xl">{content.ctaTitle}</h2>
            <p className="relative z-10 mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{content.ctaSubtitle}</p>
            <a
              href="https://github.com/CasperHK/Synchro"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 mt-8 inline-flex rounded-full border border-synchro-cyan/60 px-6 py-3 text-sm font-semibold text-synchro-cyan transition hover:bg-synchro-cyan hover:text-slate-950"
            >
              GitHub - CasperHK/Synchro
            </a>
          </GlassCard>
        </section>
      </div>
    </main>
  )
}
