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
          page: '#050505',
          surface: '#0F0F11',
          hover: '#18181B',
        },
        primary: {
          DEFAULT: '#00F0FF',
          hover: '#4DFAFF',
          dim: 'rgba(0, 240, 255, 0.1)',
        },
        secondary: {
          DEFAULT: '#7B61FF',
          hover: '#927CFF',
        },
        monero: '#F26822',
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          tertiary: '#52525B',
          disabled: '#3F3F46',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(0, 240, 255, 0.3)',
        'glow-purple': '0 0 15px rgba(123, 97, 255, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
