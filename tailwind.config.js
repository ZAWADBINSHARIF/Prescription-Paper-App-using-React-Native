/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "rgb(245 245 245)",
        secondaryLight: "rgb(255 255 255)",
        primaryDark: "rgb(31 41 55)",
        secondaryDark: "rgb(31 41 55)"
      }
    },
  },
  plugins: [],
}

