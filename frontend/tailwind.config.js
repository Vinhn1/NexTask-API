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
        surface: '#fcf8ff'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

