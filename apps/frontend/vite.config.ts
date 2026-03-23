import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
  // framer-motion は SSR 時に外部モジュールとして扱われると
  // 別 React インスタンスが生まれてコンテキストが壊れるため、
  // noExternal でバンドルに含め単一インスタンスを保証する。
  ssr: {
    noExternal: ['framer-motion'],
  },
  optimizeDeps: {
    include: ['framer-motion'],
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      // Forward all /api calls to the Hono backend in dev
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
