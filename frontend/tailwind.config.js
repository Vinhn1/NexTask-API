/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4648d4",
        surface: '#fcf8ff',
        indigo: "#4648d4",
        indigoDark: "#3730a3",
        cyan: "#06b6d4",
        bg: "#fcf8ff",
        dark: "#1b1b23",
        muted: "#464554",
        border: "#e4e1ed",
        subtle: "#f5f2fe",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

