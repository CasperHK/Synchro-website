import { Hono } from 'hono'
import type { Context } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { CreateDocSchema, UpdateDocSchema } from '@synchro/shared'
import { db } from '../lib/prisma'
import { verifyAdminToken } from '../lib/auth'

const docs = new Hono()
const prisma = db as any

const DEFAULT_DOCS = [
  {
    slug: 'welcome-to-synchro',
    title: 'Welcome to Synchro',
    category: 'Introduction',
    sortOrder: 1,
    body: `# Welcome to Synchro\n\nSynchro is a zero-hallucination fullstack stack for AI-native development.\n\n## The Vibe Coding Philosophy\n\nMove fast with intent, but keep type constraints as hard rails.`,
  },
  {
    slug: 'quick-start-first-sync',
    title: 'Quick Start: Installation and First Sync',
    category: 'Quick Start',
    sortOrder: 2,
    body: `# Quick Start\n\n## Installation (Bun)\n\n1. Install dependencies with \`bun install\`.\n2. Start database with Docker or local SQLite setup.\n3. Run Prisma push and boot frontend/backend dev servers.\n\n## First Sync\n\nCreate or modify a shared schema first, then implement API and UI in the same slice. The compiler verifies every mismatch immediately.`,
  },
  {
    slug: 'gsd-integration',
    title: 'Synchro x GSD: The Engineering of Certainty',
    category: 'GSD Integration',
    sortOrder: 3,
    body: `# Why Synchro is GSD-Native\n\nSpec as Source: Your .gsd/SPEC.md defines the vibe; our Shared Schema enforces the reality.\n\nZero-Hallucination Loop: When your GSD agent executes a task, Synchro's 100% type-safety acts as an invisible guardrail, instantly failing the task if the AI hallucinate a non-existent field.\n\n## Type as Boundary\n\nIn Vibe Coding, global type constraints act as an automatic validator and block non-compliant code at compile time.`,
  },
  {
    slug: 'shared-zod-ssot',
    title: 'Shared Zod Schemas as SSOT',
    category: 'Core Concepts',
    sortOrder: 4,
    body: `# Core Concepts\n\n## Hono RPC (Type-Safe Routes)\n\nHono route types can be consumed directly on frontend clients, preventing wrong path or payload shapes at compile time.\n\n## Shared Zod Schemas (SSOT)\n\nDefine your schema once in packages/shared and reuse it in backend validators and frontend forms.\n\n\`\`\`ts\nexport const CreateDocSchema = z.object({\n  slug: z.string().min(1),\n  title: z.string().min(1),\n  body: z.string().min(1),\n})\n\`\`\`\n\n## Database with Prisma\n\nPrisma persists the exact structures you validate and type-check. Schema drift is surfaced early through tooling.`,
  },
  {
    slug: 'project-structure-apps-packages',
    title: 'Project Structure: apps/ vs packages/',
    category: 'Project Structure',
    sortOrder: 5,
    body: `# Project Structure\n\n## apps/\n\nContains runnable applications such as frontend and backend.\n\n## packages/\n\nContains reusable source-of-truth modules like shared Zod schemas.\n\n## Deployment with Docker\n\nUse Docker to keep runtime parity and minimize onboarding friction for AI-assisted teams.`,
  },
]

async function ensureSeedDocs() {
  const count = await prisma.doc.count()
  if (count > 0) return
  await prisma.doc.createMany({ data: DEFAULT_DOCS })
}

function readBearerToken(authHeader?: string) {
  if (!authHeader) return null
  const [type, token] = authHeader.split(' ')
  if (type !== 'Bearer' || !token) return null
  return token
}

async function requireAdmin(c: Context) {
  const token = readBearerToken(c.req.header('authorization'))
  if (!token) return false
  try {
    await verifyAdminToken(token)
    return true
  } catch {
    return false
  }
}

docs.get('/', async (c) => {
  await ensureSeedDocs()
  const rows = await prisma.doc.findMany({ orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }] })
  return c.json(rows)
})

docs.get('/:slug', async (c) => {
  await ensureSeedDocs()
  const slug = c.req.param('slug')
  const row = await prisma.doc.findUnique({ where: { slug } })
  if (!row) return c.json({ error: 'Doc not found' }, 404)
  return c.json(row)
})

docs.post('/', zValidator('json', CreateDocSchema), async (c) => {
  const ok = await requireAdmin(c)
  if (!ok) return c.json({ ok: false, error: 'Unauthorized' }, 401)

  const input = c.req.valid('json')
  const row = await prisma.doc.create({ data: input })
  return c.json(row, 201)
})

docs.put('/:slug', zValidator('json', UpdateDocSchema), async (c) => {
  const ok = await requireAdmin(c)
  if (!ok) return c.json({ ok: false, error: 'Unauthorized' }, 401)

  const slug = c.req.param('slug')
  const input = c.req.valid('json')
  const row = await prisma.doc.update({ where: { slug }, data: input })
  return c.json(row)
})

export default docs
