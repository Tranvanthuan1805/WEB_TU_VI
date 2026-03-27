/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../Pages/**/*.razor',
    '../Components/**/*.razor',
    '../Shared/**/*.razor',
    '../wwwroot/index.html',
  ],
  safelist: [],
  theme: {
    extend: {},
  },
  plugins: [],
}