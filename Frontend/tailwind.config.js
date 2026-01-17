/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#20d0ca', //cyan 
          dark: '#18B3B3',  //hover or unactive (dark cyan)
        },
        dark: {
          bg: '#0c0e12', 
          card: '#12171b', 
          input: '#1e2229', 
        }
      }
    },
  },
  plugins: [],
}