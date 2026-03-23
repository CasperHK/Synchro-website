import { client } from './api'
import type { CreateDoc, LoginInput, UpdateDoc } from '@synchro/shared'

export async function fetchDocs() {
  const res = await client.api.docs.$get()
  if (!res.ok) throw new Error('Failed to load docs')
  return res.json()
}

export async function fetchDocBySlug(slug: string) {
  const res = await client.api.docs[':slug'].$get({ param: { slug } })
  if (!res.ok) throw new Error('Failed to load doc')
  return res.json()
}

export async function loginAdmin(input: LoginInput) {
  const res = await client.api.auth.login.$post({ json: input })
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? 'Login failed')
  }
  return res.json() as Promise<{ ok: boolean; token: string }>
}

export async function updateDoc(slug: string, input: UpdateDoc, token: string) {
  const res = await client.api.docs[':slug'].$put(
    {
      param: { slug },
      json: input,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? 'Failed to update doc')
  }

  return res.json()
}

export async function createDoc(input: CreateDoc, token: string) {
  const res = await client.api.docs.$post(
    { json: input },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? 'Failed to create doc')
  }

  return res.json()
}
