/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-maroon': '#8B0000',
        'royal-gold': '#FFD700',
        'ivory-white': '#FFFEF7',
        'soft-beige': '#F5F5DC',
        'deep-maroon': '#5D0000',
        'accent-gold': '#B8860B',
        'text-dark': '#2C1810',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(139, 0, 0, 0.1)',
        'gold': '0 4px 20px rgba(255, 215, 0, 0.2)',
      }
    },
  },
  plugins: [],
}