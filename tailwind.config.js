/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        background: {
          page: '#020410', // Deep Navy (GhostDrip Main BG)
          surface: '#0B101E', // Slightly lighter Navy for cards/sections
          hover: '#161C2E', // Hover state for surfaces
        },
        primary: {
          DEFAULT: '#FFFFFF', // Primary action/text is often white in this minimal theme
          hover: '#E4E4E7', // Zinc-200
          dim: 'rgba(255, 255, 255, 0.1)',
        },
        secondary: {
          DEFAULT: '#1F2937', // Dark Grey/Blue for secondary buttons
          hover: '#374151',
        },
        monero: '#F26822', // Keeping Monero orange for specific branding
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8', // Slate-400 for subtitles
          tertiary: '#64748B', // Slate-500
          disabled: '#475569',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        border: '#1E293B', // Slate-800 for subtle borders
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '6px', // Slightly softer corners
        md: '10px',
        lg: '16px', // GhostDrip cards have distinct rounded corners
        pill: '9999px',
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        'float': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}