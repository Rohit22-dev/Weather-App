/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite', // change the duration to 3 seconds
      },
    },
    fontFamily: {
      display: ["Carter One", "sans-serif"],
      body: ["Nunito", "sans-serif"],
      heading: ["Rubik", "sans-serif"],
    },
  },
  plugins: [],
};
