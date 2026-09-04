import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        muted: 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        'muted-3': 'var(--muted-3)',
        paper: 'var(--paper)',
        panel: 'var(--panel)',
        tint: 'var(--tint)',
        border: 'var(--border)',
        'border-2': 'var(--border-2)',
        brand: {
          DEFAULT: 'var(--blue)',
          light: 'var(--blue-2)',
          deep: 'var(--blue-deep)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        wrap: '1180px',
      },
      spacing: {
        section: '88px',
      },
    },
  },
  plugins: [],
};

export default config;
