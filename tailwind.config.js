/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customDark: 'rgb(10, 10, 10)',
      },
      minWidth: {
        '1/4': '25%',
      },
      maxWidth: {
        '1/4': '25%',
      },
      screens: {
        // 'xs': '475px',
        'md2': '800px',
        'lg2': '1150px',
        '3xl': '1600px', 
        '4xl': '1900px'
      },
      fontSize: {
        'xs': '12px',
      }
    },
  },
  plugins: [],
}
