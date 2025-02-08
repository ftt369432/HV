/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        cyberpunk: {
          primary: '#FF00FF',
          secondary: '#00FFFF',
          accent: '#FFD700',
          background: '#0A0A0F',
          surface: '#1A1A2F',
        },
      },
      animation: {
        blob: "blob 7s infinite",
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'neon-glow': 'neon-glow 1s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        'neon-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'neon-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 5px theme(colors.purple.400), 0 0 20px theme(colors.purple.600)',
          },
          '50%': {
            'box-shadow': '0 0 10px theme(colors.purple.400), 0 0 30px theme(colors.purple.600)',
          },
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    },
  },
}