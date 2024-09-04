/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customDark: 'rgb(7, 7, 7)',
      },
      screens: {
        // 'xs': '475px',
        '3xl': '1600px', 
        '4xl': '1900px', 
      },
    },
  },
  plugins: [],
}
