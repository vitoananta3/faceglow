import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: '#d42e52', rose2: '#a81e3c', rose3: '#ff6b8a',
        gold: '#e8b84b', sage: '#5bb891',
        ink: '#080406', ink2: '#120709', ink3: '#1a0a0f', ink4: '#22101a',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Italiana', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
