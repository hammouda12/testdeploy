
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}","./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#122633",
        card: "#132f3e",
        text: "#e7f0f4",
        neutral: "#a7c4ce",
        grey: {
          200: "var(--grey-200)",
          300: "var(--grey-300)",
        },
        blue: {
          500: "#1475e1", /* rgb(20, 117, 225) - matches stake.com wallet button */
          600: "#105eb4", /* rgb(16, 94, 180) - matches stake.com hover state */
          
        },
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.25)",
        cardHover: "0 6px 18px rgba(0,0,0,0.35)",
      }
    },
  },
  plugins: [],
}
