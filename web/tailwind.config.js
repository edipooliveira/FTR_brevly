import { theme } from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          base: "#2C46B1",
          dark: "#2C4091",
        },
        gray: {
          100: "#F9F9FB",
          200: "#E4E6EC",
          300: "#CDCFD5",
          400: "#74798B",
          500: "#4D505C",
          600: "#1F2025",
        },
        danger: "#B12C4D",
      },
      fontSize: {
        xs: ["0.625rem", "0.875rem"],
        sm: ["0.75rem", "1rem"],
        md: ["0.875rem", "1.125rem"],
        lg: ["1.125rem", "1.5rem"],
        xl: ["1.5rem", "2rem"],
      },
      borderWidth: {
        1.5: "1.5px",
      },
      fontFamily: {
        sans: ["Open Sans", ...theme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
