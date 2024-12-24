/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./public/**/*.html",
  ],
  theme: {
    extend: {
      
      
      
      container:{
        center:true,
        padding:{
          default:'1rem',
          sm:'2rem',
          lg:'4rem',
          xl:'5rem',
         "2xl":'6rem',
        }
      }
    },
  },
  plugins: [],
};


