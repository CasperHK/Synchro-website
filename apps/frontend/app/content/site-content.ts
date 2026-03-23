export type Locale = 'zh-TW' | 'en'

type TechStackItem = {
  name: string
  description: {
    'zh-TW': string
    en: string
  }
}

type FeatureItem = {
  title: {
    'zh-TW': string
    en: string
  }
  description: {
    'zh-TW': string
    en: string
  }
}

export const siteContent = {
  slogan: {
    'zh-TW': '單一真相來源，徹底終結 AI 幻覺。',
    en: 'Single source of truth. End AI hallucinations at the root.',
  },
  hero: {
    title: {
      'zh-TW': 'Synchro：專為 AI 時代設計的零幻覺全端架構',
      en: 'Synchro: a zero-hallucination fullstack architecture for the AI era',
    },
    subtitle: {
      'zh-TW': '透過 100% 型別安全，將 AI 從不穩定的助手轉化為精準的工程師。',
      en: 'Turn AI from an unstable assistant into a precise engineer with end-to-end type safety.',
    },
    ctaPrimary: {
      'zh-TW': '停止猜測，開始同步',
      en: 'Stop guessing, start syncing',
    },
    ctaSecondary: {
      'zh-TW': '查看核心哲學',
      en: 'Explore the core philosophy',
    },
  },
  philosophy: [
    {
      title: {
        'zh-TW': '單一真相來源',
        en: 'Single Source of Truth',
      },
      description: {
        'zh-TW': 'Schema 全域共享，前後端同步零成本。你改一次，整個系統立刻對齊。',
        en: 'Shared schema across the stack means zero sync overhead. Change once, align everywhere.',
      },
    },
    {
      title: {
        'zh-TW': '極致型別安全',
        en: 'Extreme Type Safety',
      },
      description: {
        'zh-TW': '從後端路由到前端 UI，錯誤會在編譯時被攔下，不再等到上線才爆炸。',
        en: 'From backend routes to frontend UI, mismatches are blocked at compile time.',
      },
    },
    {
      title: {
        'zh-TW': 'AI 協作優先',
        en: 'AI-First Collaboration',
      },
      description: {
        'zh-TW': '用結構化規範約束 AI 產出，讓 Vibe Coding 保有創意，同時不失控。',
        en: 'Structured constraints keep vibe coding creative without letting generated code drift.',
      },
    },
  ] satisfies FeatureItem[],
  stack: [
    {
      name: 'Bun',
      description: {
        'zh-TW': '極速執行與套件管理，降低新手啟動專案的摩擦。',
        en: 'Fast runtime and package management with low setup friction.',
      },
    },
    {
      name: 'React Router v7',
      description: {
        'zh-TW': 'SSR 與路由資料流整合，建立穩定的全端頁面生命週期。',
        en: 'SSR-ready routing with a clean data lifecycle for fullstack apps.',
      },
    },
    {
      name: 'Hono',
      description: {
        'zh-TW': '輕量 API 核心，搭配 RPC 型別推導讓前端自動補全。',
        en: 'Lightweight API core with RPC typing for instant frontend autocomplete.',
      },
    },
    {
      name: 'Prisma',
      description: {
        'zh-TW': '資料模型與查詢行為可視化，讓資料層更可預測。',
        en: 'Predictable data modeling and querying for a stable persistence layer.',
      },
    },
    {
      name: 'Zod',
      description: {
        'zh-TW': '共享驗證規則，讓 AI 生成程式碼也被嚴格保護。',
        en: 'Shared validation rules that keep AI-generated code honest.',
      },
    },
  ] satisfies TechStackItem[],
  codeDiff: {
    leftTitle: {
      'zh-TW': '傳統混亂的 API 呼叫',
      en: 'Traditional chaotic API call',
    },
    rightTitle: {
      'zh-TW': 'Synchro 自動補全與型別校驗',
      en: 'Synchro autocomplete + type validation',
    },
    leftCode: `// 字串拼接路徑，型別完全不受保護\nfetch('/api/user-tag', {\n  method: 'POST',\n  body: JSON.stringify({\n    user_id: 42,\n    label_name: 'vip',\n  }),\n})`,
    rightCode: `// Hono RPC + shared schema\nawait client.api.users[':id'].tags.$post({\n  param: { id: '42' },\n  json: {\n    label: 'vip',\n  },\n})`,
  },
  structureTitle: {
    'zh-TW': '專案結構預覽',
    en: 'Project structure preview',
  },
  structureTree: `apps/\n  backend/\n    routes/\n    lib/\n  frontend/\n    app/\n      components/\n      routes/\npackages/\n  shared/\n    src/index.ts`,
  gsd: {
    title: {
      'zh-TW': 'GSD 規格驅動：從試錯到確定性交付',
      en: 'GSD spec-driven flow: from trial-and-error to deterministic delivery',
    },
    steps: [
      {
        'zh-TW': '規格即代碼：先定義 shared schema，再延伸到前後端。',
        en: 'Spec as source: define shared schema first, then propagate to both sides.',
      },
      {
        'zh-TW': '原子化切片：一次上下文就完成 API 到 UI 的完整串接。',
        en: 'Atomic slices: complete API-to-UI integration in one focused context.',
      },
      {
        'zh-TW': '自動驗證循環：透過 typecheck 即時修正 AI 偏差。',
        en: 'Auto-verification: typecheck catches and corrects AI drift instantly.',
      },
    ],
  },
  cta: {
    title: {
      'zh-TW': '停止猜測，開始同步。立即在 GitHub 上獲取模板。',
      en: 'Stop guessing. Start syncing. Get the template on GitHub now.',
    },
    subtitle: {
      'zh-TW': '把創意交給你，把正確性交給 Synchro。',
      en: 'You own the vibe. Synchro owns the correctness.',
    },
  },
}
