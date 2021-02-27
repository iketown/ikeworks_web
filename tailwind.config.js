const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./pageComponents/**/*.tsx",
    "./styles/**/*.css",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        title: ["Bebas Neue", "serif"],
        code: ["Consolas", "mono"],
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        stencil: ["Stardos Stencil", "serif"],
      },
      colors: {
        earthRed: "#B73224",
        earthBlue: "#004E7C",
        earthMaroon: "#591C0B",
        earthGrey: "#DCE1E3",
        earthWater: "#5C5F58",
      },
    },
  },
  variants: {
    extend: {
      // ring: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
