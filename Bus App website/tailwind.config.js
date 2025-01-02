/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        backgroundLight: '#F8F9FA', // Light Gray
        backgroundDark: '#212529', // Dark Gray
        accent: '#28A745',
             },
      fontSize: {
        h1: '32px',
        h2: '24px',
        body: '16px',
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
        sans: ['Roboto', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [ function ({ addComponents }) {
    addComponents({
      '.btn': {
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        fontWeight: '600',
        display: 'inline-block',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      },
      '.btn-primary': {
        backgroundColor: 'theme("colors.primary.light")',
        color: 'white',
        '&:hover': {
          backgroundColor: 'theme("colors.primary.dark")',
        },
        '&.dark': {
          backgroundColor: 'theme("colors.primary.dark")',
        },
      },
      '.btn-secondary': {
        backgroundColor: 'gray',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkgray',
        },
        '&.dark': {
          backgroundColor: 'darkgray',
        },
      },
    });
  },],
};

