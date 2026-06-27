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
    extend: {                          // ✅ moved inside extend
      colors: {
        krem: "#EFF2E8",
        coklat: {
          500: "#927B48",
          600: "#715B2B",
          700: "#977750",
          800: "#7B5B38",
        },
        hijau: {
          500: "#ADBF9F",
          600: "#4B7B54",
          700: '#959E89',
          800: '#767B6F',
          900: '#79987F',
        },
        ungu: {
          500: '#BFB0D6',
          600: '#8776A2',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#B3D7BA',
        },
        biru: {
          500: '#96AFDF',
          600: '#7E99CF',
        },
        hitam: {
          500: '#000000', 
          600: '#C5BFBC',
        },
      
        bali: {
          500: '#99487B'
        },

        pink: {
          500: '#ECB0B2',
          600: '#B47E80',
          700: '#EDDBD5',
          800: '#964A54',
        },
      },
      fontFamily: {                  
        display: ['Playfair Display', 'cursive'],
        cursive: ['Sacramento', 'cursive'],
        sans: ['Metal', 'sans-serif'],
        display2: ['DM Sans', 'sans-serif'],
        display3: ['Metal', 'sans-serif'],
        judul: ['Josefin Sans', 'sans-serif'],
      },
    },
  },

  plugins: [                           // ✅ single top-level plugins array
    require('flowbite/plugin'),
    flowbiteReact,
  ],
};