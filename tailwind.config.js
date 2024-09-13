/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    fontFamily: {
      display: ['Roboto', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        '3xl': '0 0 12px 6px rgba(0, 0, 0, 0.7)',
      },
      borderRadius: {
        'max': '20px',
      },
    },
  },
  plugins: [],
}

