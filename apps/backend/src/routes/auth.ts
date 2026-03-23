import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { LoginSchema } from '@synchro/shared'
import { createAdminToken } from '../lib/auth'

const auth = new Hono()

auth.post('/login', zValidator('json', LoginSchema), async (c) => {
  const input = c.req.valid('json')

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@synchro.dev'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'synchro-admin'

  if (input.email !== adminEmail || input.password !== adminPassword) {
    return c.json({ ok: false, error: 'Invalid credentials' }, 401)
  }

  const token = await createAdminToken({ email: input.email })
  return c.json({ ok: true, token })
})

export default auth
