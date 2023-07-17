/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "cuaca-primer": "#00668A",
        "cuaca-sekunder": "#004E71",
      },
    },
    container:{
      padding: "2rem",
      center: true,
    },
    fontFamily:{
      Roboto : ["Roboto, sans-serif"]
    },
    screens:{
      sm: "640px",
      md: "760px",
    }
  },
  plugins: [],
}

