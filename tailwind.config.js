/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom EVE-inspired palette
        'eve-black': '#0a0b0e',
        'eve-dark-gray': '#141619',
        'eve-panel': '#1a1d21',
        'eve-border': '#2a2e35',
        'eve-accent-blue': '#00a3e0', // Caldari/Generic Interface Blue
        'eve-accent-gold': '#d4af37', // Amarr/Premium
        'eve-alert-red': '#e03e3e',
        'eve-success': '#4ade80',
        'eve-text-muted': '#9ca3af',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'], // For numbers/data
      }
    },
  },
  plugins: [],
}
