/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        roboto : ['Roboto' , 'sans-serif']
      },
      colors : {
        primary : '#7E22CE',
        createButton : '#211935',
        bg_sidebar : '#F3E8FF'
      }
    },
  },
  plugins: [],
}