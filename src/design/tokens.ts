/**
 * Design Tokens for ConceptLab Algorithm Visualizer
 * Optimized for aphantasia learners with clear semantic meanings
 */

export const designTokens = {
  color: {
    // Base palette
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

    // Semantic UI tokens
    bg: {
      app: '#f8fafc',
      surface: '#ffffff',
      elevated: '#ffffff',
      chip: '#e0e7ff',
      code: '#0f172a',
      pill: '#f3e8ff',
    },
    border: {
      subtle: '#e2e8f0',
      strong: '#cbd5e0',
    },
    text: {
      primary: '#171923',
      secondary: '#2d3748',
      muted: '#cbd5e0',
      onPrimary: '#ffffff',
    },
    accent: {
      primary: '#6366f1',
      secondary: '#a855f7',
    },

    // Visualization semantic tokens
    viz: {
      barDefault: '#e2e8f0',
      barCurrent: '#f97316',
      barComparison: '#a855f7',
      barFinal: '#22c55e',
      nodeUnvisited: '#e2e8f0',
      nodeCurrent: '#f97316',
      nodeVisited: '#a855f7',
      nodeFinished: '#22c55e',
      edgeDefault: '#cbd5e0',
      edgePath: '#6366f1',
    },
  },

  // Typography
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontFamily: {
    base: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.6,
  },

  // Spacing (4px base grid)
  space: {
    0: '0px',
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

  // Border radius
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    pill: '999px',
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 10px rgba(15, 23, 42, 0.08)',
    lg: '0 10px 30px rgba(15, 23, 42, 0.18)',
    focusRing: '0 0 0 3px rgba(99, 102, 241, 0.5)',
  },

  // Breakpoints
  breakpoint: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

// Dark theme overrides
export const darkThemeTokens = {
  color: {
    bg: {
      app: '#020617',
      surface: '#0f172a',
      elevated: '#1e293b',
      code: '#020617',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#9ca3af',
      muted: '#4b5563',
    },
    border: {
      subtle: '#1e293b',
      strong: '#334155',
    },
    // Visualization colors become more saturated in dark mode
    viz: {
      barDefault: '#334155',
      barCurrent: '#fb923c',
      barComparison: '#c084fc',
      barFinal: '#4ade80',
      nodeUnvisited: '#334155',
      nodeCurrent: '#fb923c',
      nodeVisited: '#c084fc',
      nodeFinished: '#4ade80',
      edgeDefault: '#475569',
      edgePath: '#818cf8',
    },
  },
} as const;

// High contrast theme overrides
export const highContrastTokens = {
  color: {
    bg: {
      app: '#000000',
      surface: '#ffffff',
      elevated: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      muted: '#666666',
    },
    border: {
      subtle: '#000000',
      strong: '#000000',
    },
    viz: {
      barDefault: '#cccccc',
      barCurrent: '#ff6600',
      barComparison: '#9933ff',
      barFinal: '#00cc00',
      nodeUnvisited: '#cccccc',
      nodeCurrent: '#ff6600',
      nodeVisited: '#9933ff',
      nodeFinished: '#00cc00',
      edgeDefault: '#666666',
      edgePath: '#0000ff',
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
