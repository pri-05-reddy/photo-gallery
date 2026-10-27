/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c2925',
        paper: '#f6f7f4',
        forest: '#285d4e',
      },
      boxShadow: {
        card: '0 10px 28px rgba(25, 40, 34, 0.07)',
      },
    },
  },
  plugins: [],
};
