/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
   
    extend: {
      fontFamily: {
        regularPopins: ['regularPopins', 'sans-serif'],
        mediumPopins: ['mediumPopins', 'sans-serif'],
        semiBoldPopins: ['semiBoldPopins', 'sans-serif'],
      },
    },

  },
  plugins: [],
}

