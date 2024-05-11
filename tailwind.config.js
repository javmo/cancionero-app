/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#3f3f3f',
          600: '#515151',
          500: '#6b6b6b',
          400: '#858585',
          300: '#9f9f9f',
          200: '#b9b9b9',
          100: '#d3d3d3',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}

