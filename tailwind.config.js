/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lilita: ["Lilita One", "sans-serif"],
        InterTight: ["Inter Tight", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "emerald"],
  },
  plugins: [require("daisyui")],
};
