/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../Pages/**/*.razor',
    '../Components/**/*.razor',
    '../../Web.Client/Components/**/*.razor',
    '../Shared/**/*.razor',
    '../wwwroot/index.html',
  ],
  safelist: [],
  theme: {
      extend: {
          fontFamily: {
              headline: ['Playfair Display', 'serif'],
              body: ['Plus Jakarta Sans', 'sans-serif'],
              label: ['Plus Jakarta Sans', 'sans-serif'],
          },
          borderRadius: {
              DEFAULT: '0.125rem',
              lg: '0.25rem',
              xl: '0.5rem',
              full: '0.75rem',
          },
    },
  },
  plugins: [],
}
