/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  // A SEÇÃO MAIS IMPORTANTE É ESTA: "content"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Suas cores e outras customizações vão aqui...
      // Se você já tem o código do projeto antigo, pode colar aqui.
      // Caso contrário, pode começar com isso.
    },
  },
  plugins: [require("tailwindcss-animate")],
}``
