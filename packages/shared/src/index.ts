import { z } from 'zod'

// ── Shared enums ──────────────────────────────────────────────────────────────

export const PostStatusSchema = z.enum(['draft', 'published'])
export type PostStatus = z.infer<typeof PostStatusSchema>

// ── Post ─────────────────────────────────────────────────────────────────────

export const PostSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  status: PostStatusSchema,
  createdAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

// ── CreatePost ────────────────────────────────────────────────────────────────

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  status: PostStatusSchema.default('published'),
})

export type CreatePost = z.infer<typeof CreatePostSchema>

// ── UpdatePost ────────────────────────────────────────────────────────────────

export const UpdatePostSchema = CreatePostSchema.partial()
export type UpdatePost = z.infer<typeof UpdatePostSchema>

// ── Doc ──────────────────────────────────────────────────────────────────────

export const DocSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(1),
  body: z.string(),
  category: z.string().default('Getting Started'),
  sortOrder: z.number().int().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Doc = z.infer<typeof DocSchema>

export const CreateDocSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, digits, and hyphens are allowed'),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  category: z.string().default('Getting Started'),
  sortOrder: z.number().int().default(0),
})
export type CreateDoc = z.infer<typeof CreateDocSchema>

export const UpdateDocSchema = CreateDocSchema.partial()
export type UpdateDoc = z.infer<typeof UpdateDocSchema>

// ── Auth ─────────────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})
export type LoginInput = z.infer<typeof LoginSchema>
