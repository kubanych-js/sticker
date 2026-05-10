import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:    '#0b0b0c',
        paper:  '#f5f2ea',
        signal: '#ffcc00',
        rust:   '#c2410c',
        ok:     '#16a34a',
        mute:   '#6b7280',
      },
      fontFamily: {
        sans: ['"Archivo"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card:       '6px 6px 0 #0b0b0c',
        'card-sm':  '4px 4px 0 #0b0b0c',
        'card-lg':  '8px 8px 0 #0b0b0c',
        door:       'inset 0 0 0 8px #b2b0ab, 6px 6px 0 #0b0b0c',
        'door-lg':  'inset 0 0 0 10px #b8b6b1, 8px 8px 0 #0b0b0c',
      },
      letterSpacing: {
        display: '-0.02em',
      },
      lineHeight: {
        display: '0.92',
      },
    },
  },
  plugins: [],
} satisfies Config;
