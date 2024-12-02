/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#edeaea",
        secondary: "#9d9c9c",
        "card-bg": "#5b5252",
        background: "#343434",
        "secondary-bg": "#111111",
      },
      fontFamily: {
        display: ["Istok Web", "sans-serif"],
        title: ["Jacquard 24", "system-ui"],
      },
    },
  },
  plugins: [],
};
