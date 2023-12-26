/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{htm,js,jsx}"],
  darkMode: 'class',
  theme: {
    fontFamily:{
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ['Poppins', "sans-serif"]
    },
    extend:{
      screens:{
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    }
  },
  plugins: [],
}

