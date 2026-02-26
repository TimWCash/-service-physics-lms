import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f7f8',
          100: '#d9eef2',
          200: '#b3dde5',
          300: '#7ac4d1',
          400: '#4aaab9',
          500: '#1e4d5e',
          600: '#193f4d',
          700: '#13323e',
          800: '#0e242d',
          900: '#091a20',
        },
        accent: {
          50:  '#fffbf0',
          100: '#fef3d6',
          200: '#fde4a8',
          300: '#fbd074',
          400: '#f9b83d',
          500: '#e8960c',
          600: '#c47a08',
          700: '#9c5f07',
          800: '#7a4a09',
          900: '#643d0c',
        },
        surface: {
          50:  '#fafaf9',
          100: '#f5f5f3',
          200: '#ebebea',
          300: '#d4d4d2',
          400: '#a3a3a0',
          500: '#737371',
          600: '#525250',
          700: '#3d3d3b',
          800: '#272726',
          900: '#171716',
        },
        success: {
          50:  '#f0faf0',
          100: '#d1f2d1',
          200: '#a3e5a3',
          500: '#2e8540',
          700: '#1a6328',
        },
        warning: {
          50:  '#fff8ed',
          100: '#ffefd0',
          500: '#d4850a',
          700: '#a36507',
        },
        danger: {
          50:  '#fef2f2',
          100: '#fee2e2',
          500: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50:  '#eff8ff',
          100: '#daeeff',
          500: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-6px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      typography: {
        surface: {
          css: {
            '--tw-prose-body': '#525250',
            '--tw-prose-headings': '#272726',
            '--tw-prose-lead': '#737371',
            '--tw-prose-links': '#1e4d5e',
            '--tw-prose-bold': '#3d3d3b',
            '--tw-prose-counters': '#a3a3a0',
            '--tw-prose-bullets': '#d4d4d2',
            '--tw-prose-hr': '#ebebea',
            '--tw-prose-quotes': '#3d3d3b',
            '--tw-prose-quote-borders': '#ebebea',
            '--tw-prose-captions': '#737371',
            '--tw-prose-code': '#3d3d3b',
            '--tw-prose-pre-code': '#ebebea',
            '--tw-prose-pre-bg': '#272726',
            '--tw-prose-th-borders': '#d4d4d2',
            '--tw-prose-td-borders': '#ebebea',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
