/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "704px",
      },
      colors: {
        primary: "#edeaea",
        secondary: "#9d9c9c",
        "card-bg": "#5b5252",
        background: "#343434",
        "secondary-bg": "#111111",
        accent: "#a3adde",
      },
      fontFamily: {
        display: ["Istok Web", "sans-serif"],
        title: ["Jacquard 24", "system-ui"],
      },
      gridTemplateColumns: {
        articles: "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      boxShadow: {
        card: "0 0 6px 3px rgb(0 0 0 / 25%)",
      },
    },
  },
  plugins: [],
};
