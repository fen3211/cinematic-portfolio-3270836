/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cinema: {
          950: '#080808', // Primary Canvas
          900: '#111111', // Secondary Canvas
          850: '#161616', // Elevated Dark / Surface
          800: '#1F1F1F', // Ghost / Subtle Divider
          700: '#292929', // Hairline Border / Architectural Rule
          500: '#444444', // HUD Dark Grey
          400: '#555555', // Inactive text
          300: '#888888', // Secondary Text / Metadata
          100: '#EDE6DD', // Daylight Neutral 5000K
          50: '#F5F5F5',  // Warm Film White / Primary Text
        },
        accent: {
          amber: '#E09F3E', // 3200K Tungsten Warm Amber
          blue: '#4A7C9B',  // 5600K Anamorphic Cold Blue
          rec: '#D93829',   // Tally Light Red (Recording)
        },
      },
      fontFamily: {
        display: ['Syne', 'Inter Display', 'sans-serif'],
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'wide-hud': '0.08em',
        'wider-hud': '0.15em',
        'widest-hud': '0.25em',
        'cinema-crawl': '0.35em',
      },
      aspectRatio: {
        'scope': '2.39 / 1',
        'cinema': '1.85 / 1',
        'univisium': '2 / 1',
        'academy': '4 / 3',
        'video': '16 / 9',
        'square': '1 / 1',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.4s ease-in-out infinite',
        'tally-blink': 'tallyBlink 1.2s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        tallyBlink: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.85)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(2%, 4%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
};
