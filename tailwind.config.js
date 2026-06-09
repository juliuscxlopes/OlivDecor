/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    colors: {
      // Mundo Estrada
      'asfalto': '#1a1a1a',
      'cromado': '#e2e8f0',
      'couro': '#2d241e',
      // Mundo Roça
      'madeira': '#3d2b1f',
      'pardo': '#d2b48c',
      'mel': '#f59e0b',
    },
    fontFamily: {
      'rock': ['"Bebas Neue"', 'serif'], // Para Motos/Estrada
      'rustica': ['"Special Elite"', 'cursive'], // Para Roça
    }
  }

  },
  plugins: [],
}

