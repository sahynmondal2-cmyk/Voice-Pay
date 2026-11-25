/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#14532D', // Deep forest/fintech green
          'primary-light': '#166534',
          accent: '#22C55E',  // Vibrant accessible green
          'accent-hover': '#16A34A',
          navy: '#0F172A',    // Deep slate/navy
          'navy-light': '#1E293B',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          muted: '#64748B',
          dark: {
            bg: '#0B1220',
            surface: '#111827',
            border: '#1F2937',
            card: '#182234',
            muted: '#94A3B8'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Noto Sans Bengali', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'elevated': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'glow-accent': '0 0 20px -3px rgba(34, 197, 94, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sound-wave': 'wave 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'scaleY(0.4)' },
          '100%': { transform: 'scaleY(1.0)' },
        }
      }
    },
  },
  plugins: [],
}
