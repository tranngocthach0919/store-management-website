/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'flip': 'flip 1.2s ease-in-out infinite',
        'fadeOut': 'fadeOut 5s forwards'
      },
      keyframes: {
        flip: {
          '0%': {
            transform: 'perspective(200px) rotateX(0) rotateY(0)'
          },
          '50%': {
            transform: 'perspective(200px) rotateX(180deg) rotateY(0)'
          },
          '100%': {
            transform: 'perspective(200px) rotateX(180deg) rotateY(180deg)'
          }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '90%': { opacity: '0.1' },
          '100%': { opacity: '0', display: 'none' }
        }
      }
    },
  },
  plugins: [],
}

