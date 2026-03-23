import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import type { Route } from './+types/root'
import './styles.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Synchro — 零幻覺全端架構 · Zero-Hallucination Fullstack Stack</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60 * 1000 },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-synchro-text">
      <h1 className="mb-4 text-4xl font-semibold">{message}</h1>
      <p className="text-synchro-muted">{details}</p>
      {stack && (
        <pre className="mt-8 overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-950/80 p-4 text-sm text-slate-200">
          {stack}
        </pre>
      )}
    </main>
  )
}
