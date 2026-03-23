import { type RouteConfig, index } from '@react-router/dev/routes'
import { route } from '@react-router/dev/routes'

export default [
  index('./routes/home.tsx'),
  route('docs', './routes/docs.tsx'),
  route('docs/:slug', './routes/docs.$slug.tsx'),
  route('admin/login', './routes/admin.login.tsx'),
  route('admin/docs', './routes/admin.docs.tsx'),
] satisfies RouteConfig
