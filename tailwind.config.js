const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    ".flowbite-react/class-list.json"
  ],

  theme: {
    extend: {
      colors: {
      gold: "#f3c55c",
      purple: "#987DB9",
      ungu:{
          500: '#8776A2',
          600: '#3A225E',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',}
      }
    },
    fontFamily: {
      display: ['Playfair Display', 'cursive'],
      cursive: ['Sacramento', 'cursive'],
      sans: ['Metal', 'sans-serif'],
      display2: ['DM Sans', 'sans-serif'],
      display3: ['Metal', 'sans-serif'],
  },
  plugins: [
    require('flowbite/plugin')
  ],
},

  plugins: [flowbiteReact]
};