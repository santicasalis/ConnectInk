/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
// module.exports = withMT ({
  module.exports = ({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#20C6DA",
        //primary:"#E74D40",
        secondary: {
          900: "#0A0707",
          100: "#181717",
        },
        artist:"#D252D0",
        artistfont:"#fdecda",
        admin:"#E8EA36"
      },
      fontFamily: {
        rocksalt: ["Rock Salt"],
        newrocker: ["New Rocker"],
      },
      borderColor: (theme) => ({
        primary: theme("colors.primary"),
        
      }),
    },
  },
  plugins: [],

})

