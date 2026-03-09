import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#00C2FF',
          dim: '#0099CC',
          glow: 'rgba(0, 194, 255, 0.15)',
        },
        surface: {
          DEFAULT: '#0A0A0F',
          1: '#111118',
          2: '#16161E',
          3: '#1C1C26',
          border: 'rgba(255,255,255,0.07)',
          'border-accent': 'rgba(0, 194, 255, 0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        site: '1120px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
