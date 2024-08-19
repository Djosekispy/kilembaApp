/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
   
    extend: {
      fontFamily: {
        regularPopins: ['Poppins-Regular', 'sans-serif'],
        mediumPopins: ['Poppins-Medium', 'sans-serif'],
        semiBoldPopins: ['Poppins-SemiBold', 'sans-serif'],
      },
    },

  },
  plugins: [],
}

