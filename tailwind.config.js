/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      colors: { primary: "#010e28", secondary: "#0c1933" },
    },
  },
  plugins: [],
};
