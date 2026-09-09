import type { Config } from 'tailwindcss';

/**
 * Design tokens mirror the CSS custom properties declared in app/globals.css.
 * Colours are authored as raw hex here (not via var()) so that Tailwind's
 * opacity modifiers — e.g. `bg-sun/15` — continue to work.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    screens: {
      /** Two-column product grids start here, not at Tailwind's 640px sm. */
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        sun: '#F4922B',
        /**
         * DEFAULT is the brand terracotta. `deep` and `dark` are derived
         * shades added for accessibility: #D2691E only reaches 3.4:1 on cream,
         * so it is reserved for large display type, fills and borders, while
         * `deep` (5.7:1 on cream) carries small text and links.
         */
        terracotta: { DEFAULT: '#D2691E', deep: '#A6440F', dark: '#7A3410' },
        cream: '#FDF8F0',
        ivory: '#FFFDF9',
        /**
         * DEFAULT gold is ornament-only — 2.2:1 on cream. `deep` (5.5:1)
         * is the shade for any gold-toned text.
         */
        gold: { DEFAULT: '#C9A227', deep: '#7A6314' },
        blush: '#F2C4C8',
        sage: '#9CAF88',
        cocoa: { DEFAULT: '#3B302A', soft: '#6B5D53' },
      },
      fontFamily: {
        /**
         * The Devanagari face sits behind each Latin family so Marathi text
         * resolves automatically wherever it appears.
         */
        display: [
          'var(--font-display)',
          'var(--font-devanagari)',
          'Cormorant Garamond',
          'Georgia',
          'serif',
        ],
        sans: [
          'var(--font-body)',
          'var(--font-devanagari)',
          'Poppins',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        base: ['1.0625rem', { lineHeight: '1.75' }],
        /**
         * Fluid display scale. Phones are the primary surface here, so the
         * headings interpolate with the viewport rather than stepping at
         * breakpoints — this is what keeps the hero to two lines at 320px.
         */
        'display-hero': ['clamp(1.85rem, 8.2vw, 4.4rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        'display-1': ['clamp(1.75rem, 6.4vw, 3.6rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-2': ['clamp(1.6rem, 5.2vw, 3.1rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        'display-3': ['clamp(1.4rem, 4vw, 2.2rem)', { lineHeight: '1.15' }],
        'display-4': ['clamp(1.2rem, 3.2vw, 1.75rem)', { lineHeight: '1.2' }],
        /** Body floor is 15px; form inputs use `input` (16px) to stop iOS zoom. */
        'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
        input: ['1rem', { lineHeight: '1.5' }],
      },
      /**
       * Full 0–100 opacity scale. Tailwind's default scale skips values like
       * 8, 12, 35 and 97, and off-scale modifiers are dropped silently — which
       * costs backgrounds and scrims with no build error. JIT still only emits
       * the values actually used.
       */
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, index) => [index, String(index / 100)]),
      ),
      maxWidth: {
        content: '1280px',
        prose: '68ch',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        warm: '0 18px 45px -24px rgba(59, 48, 42, 0.35)',
        lift: '0 26px 60px -28px rgba(210, 105, 30, 0.45)',
        inset: 'inset 0 1px 0 0 rgba(255, 253, 249, 0.6)',
      },
      backgroundImage: {
        'sun-wash': 'radial-gradient(ellipse at top, rgba(244,146,43,0.18), rgba(253,248,240,0) 62%)',
        'gold-rule': 'linear-gradient(to right, transparent, #C9A227, transparent)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.92' },
          '25%': { transform: 'scale(1.06) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scale(0.97) rotate(-0.5deg)', opacity: '0.88' },
          '75%': { transform: 'scale(1.04) rotate(0.5deg)', opacity: '1' },
        },
        'slow-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        flicker: 'flicker 3.2s ease-in-out infinite',
        'slow-spin': 'slow-spin 90s linear infinite',
        'rise-in': 'rise-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
