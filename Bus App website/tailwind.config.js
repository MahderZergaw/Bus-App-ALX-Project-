/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#0056b3",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      fontFamily: {
        curvy: ["Pacifico", "cursive"],
        mono: ["Courier New", "monospace"],
        fancy: ["Dancing Script", "cursive"],
        modern: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

