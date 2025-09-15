/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
      gold: "#f3c55c"
      }
    },
    fontFamily: {
      display: ['Playfair Display', 'cursive'],
      cursive: ['Sacramento', 'cursive'],
      sans: ['Josefin Sans', 'sans-serif'],
  },
  plugins: [],
}
}