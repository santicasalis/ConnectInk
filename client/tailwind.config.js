/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT ({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#20C6DA",
        secondary: {
          900: "#101010",
          100: "#1C1C1C",
        },
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

}
)

};

