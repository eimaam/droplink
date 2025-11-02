/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#121214',
          base: '#121214',
          dark: '#0a0a0b',
        },
        foreground: {
          DEFAULT: '#fafafa',
          muted: '#a5a5a6',
        },
        card: {
          DEFAULT: '#1b1b1d',
          foreground: '#fafafa',
        },
        primary: {
          DEFAULT: '#f8c4dc',
          foreground: '#1a1a1a',
          light: '#ffd6ea',
          dark: '#e0a8c4',
        },
        secondary: {
          DEFAULT: '#1b1b1d',
          foreground: '#fafafa',
        },
        muted: {
          DEFAULT: '#28282c',
          foreground: '#a5a5a6',
        },
        accent: {
          DEFAULT: '#28282c',
          foreground: '#fafafa',
          indigo: '#6366F1',
          cyan: '#06B6D4',
        },
        destructive: {
          DEFAULT: '#7d2b2b',
          foreground: '#fafafa',
        },
        surface: {
          DEFAULT: '#1b1b1d',
          hover: '#28282c',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a5a5a6',
        },
        border: {
          DEFAULT: '#28282c',
          input: '#28282c',
          ring: '#d5d5d6',
        },
        success: '#10B981',
        warning: '#FACC15',
        error: '#7d2b2b',
        info: '#06B6D4',
        light: {
          primary: '#3B82F6',
          background: '#F8FAFC',
          foreground: '#1E293B',
          surface: '#FFFFFF',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Fira Code', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'gradient-drop': 'linear-gradient(135deg, #f8c4dc 0%, #e0a8c4 50%, #ffd6ea 100%)',
        'gradient-upload': 'linear-gradient(180deg, #f8c4dc 0%, #ffd6ea 100%)',
        'gradient-warning': 'linear-gradient(90deg, #FACC15 0%, #7d2b2b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-soft': '0 0 30px rgba(99, 102, 241, 0.2)',
        'glow-primary': '0 0 20px rgba(248, 196, 220, 0.3)',
        'glow-pink': '0 0 30px rgba(248, 196, 220, 0.4)',
      },
    },
  },
  plugins: [],
};
