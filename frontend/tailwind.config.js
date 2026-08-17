export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E7CC72',
          deep: '#8A6D1F',
          soft: '#F3E7C4',
        },
        ink: {
          DEFAULT: '#0B0B0C',
          soft: '#2A2A2E',
          muted: '#6B6B72',
        },
        beige: {
          DEFAULT: '#F6F1E7',
          deep: '#EDE4D3',
        },
        mist: '#EFEFEF',
        royal: {
          DEFAULT: '#141C34',
          light: '#232E4F',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.28em',
      },
      boxShadow: {
        luxe: '0 24px 60px -30px rgba(11,11,12,0.35)',
        card: '0 12px 40px -24px rgba(11,11,12,0.45)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1.16)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        drift: 'drift 12s ease-out forwards',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
}
