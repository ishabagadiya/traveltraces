/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#384523',
          focus: '#384523',
          border: '#384523',
          ring: '#384523',
          light: '#4a5a2e',
          dark: '#2a341a',
        },
        primary: '#ffffff',
        background: '#ffffff',
        foreground: '#384523',
      },
      borderColor: {
        secondary: '#384523',
      },
      ringColor: {
        secondary: '#384523',
      },
      outlineColor: {
        secondary: '#384523',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.focus-secondary': {
          '--tw-ring-color': '#384523',
          '--tw-border-opacity': '1',
          'border-color': '#384523',
        },
        '.border-secondary': {
          'border-color': '#384523',
        },
        '.ring-secondary': {
          '--tw-ring-color': '#384523',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 