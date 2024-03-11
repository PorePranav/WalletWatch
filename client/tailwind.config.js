/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['rubik', 'sans-serif'],
        sono: ['sono', 'sans-serif'],
      },
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        red: colors.red,
      },
    },
  },
  plugins: [],
};
