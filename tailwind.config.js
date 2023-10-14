/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#04364A",
        secondary: "#176B87",
        accent: "#64CCC5",
        neutral: "#DAFFFB",
        base: "#1d232a",
        info: "#3abff8",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
      },
      animation: {
        "blob": "blob 7s infinite",
      },
      keyframes:{
        blob:{
        "0%": {
          transform:" translate(0px, 0px) scale(1)",
        },
        "33%": {
          transform:"translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform:"translate(-20px, 20px) scale(0.9)",
        },
        "100%": {
          transform:"translate(0px, 0px) scale(1)",
        },
      }

      }
    },
  },
  plugins: [],
}

