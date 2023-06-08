/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transform: ['hover', 'focus'],
      
    },
     widths: {
        'small': '20rem',  // Customize the width for sm size (small)
      
      },
  },
  
  plugins: [],
}