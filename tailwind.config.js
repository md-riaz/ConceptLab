/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base palette aligned with design tokens
        gray: {
          50: '#f8fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#171923',
        },
        primary: {
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
        },
        secondary: {
          100: '#f3e8ff',
          500: '#a855f7',
        },
        purple: {
          100: '#f3e8ff',
          500: '#a855f7',
        },
        orange: {
          100: '#ffedd5',
          500: '#f97316',
        },
        green: {
          500: '#22c55e',
        },
        red: {
          500: '#ef4444',
        },
        yellow: {
          500: '#eab308',
        },
        // Semantic colors
        'bg-app': '#f8fafc',
        'bg-surface': '#ffffff',
        'bg-chip': '#e0e7ff',
        'bg-code': '#0f172a',
        'text-primary': '#171923',
        'text-secondary': '#2d3748',
        'accent-primary': '#6366f1',
        'accent-secondary': '#a855f7',
        // Visualization colors
        'viz-bar-default': '#e2e8f0',
        'viz-bar-current': '#f97316',
        'viz-bar-comparison': '#a855f7',
        'viz-bar-final': '#22c55e',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'Monaco', '"Courier New"', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '16px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 4px 10px rgba(15, 23, 42, 0.08)',
        md: '0 4px 10px rgba(15, 23, 42, 0.08)',
        lg: '0 10px 30px rgba(15, 23, 42, 0.18)',
        'focus-ring': '0 0 0 3px rgba(99, 102, 241, 0.5)',
      },
    },
  },
  plugins: [],
}
