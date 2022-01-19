module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teknikfokus: {
          "primary-lightest": '#516e9c',
          "primary-light": '#223959',
          "primary": '#14273E',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
