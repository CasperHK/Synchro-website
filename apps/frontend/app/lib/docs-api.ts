import type { CreateDoc, LoginInput, UpdateDoc } from '@synchro/shared'

const BASE_URL =
  typeof window === 'undefined'
    ? (process.env.API_URL ?? 'http://localhost:3001')
    : window.location.origin

export async function fetchDocs() {
  const res = await fetch(`${BASE_URL}/api/docs`)
  if (!res.ok) throw new Error('Failed to load docs')
  return res.json()
}

export async function fetchDocBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/docs/${slug}`)
  if (!res.ok) throw new Error('Failed to load doc')
  return res.json()
}

export async function loginAdmin(input: LoginInput) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? 'Login failed')
  }
  return res.json() as Promise<{ ok: boolean; token: string }>
}

export async function updateDoc(slug: string, input: UpdateDoc, token: string) {
  const res = await fetch(`${BASE_URL}/api/docs/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? 'Failed to update doc')
  }

  return res.json()
}

export async function createDoc(input: CreateDoc, token: string) {
  const res = await fetch(`${BASE_URL}/api/docs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? 'Failed to create doc')
  }

  return res.json()
}
