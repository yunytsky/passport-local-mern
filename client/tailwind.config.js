/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
  theme: {
    extend: {
       screens:{
          "xsm": "460px",
          "smd": "600px"
       }
    },
  },
  plugins: [],
}

