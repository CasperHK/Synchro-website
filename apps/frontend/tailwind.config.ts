import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        synchro: {
          bg: '#050505',
          panel: '#0d1118',
          line: '#1e2a3f',
          cyan: '#3cf6ff',
          blue: '#2b7fff',
          text: '#f5f7ff',
          muted: '#97a0b8',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(60, 246, 255, 0.2), 0 20px 60px rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatIn: 'floatIn 0.8s ease forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
