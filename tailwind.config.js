/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'anek-latin' : [ 'Anek Latin', 'sans-serif'],
      'ibm-plex' : [ 'IBM Plex Mono', 'monospace'],
      'gilroy' : [ 'Gilroy', 'sans-serif'],
      'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
    },
    extend: {
      boxShadow: {
      '3xl': '0px 0px 18px 0px #b7b7b7',
    }},
  },
  plugins: [],
}