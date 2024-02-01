/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xss: "380px",
      xs: "480px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    fontFamily: {
      spectral: ["Spectral", "serif"],
      tions: ["Tinos", "serif"],
      roboto: ["Roboto", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
      opensans: ["Open Sans", "sans-serif"],
      popins: ["Poppins", "sans-serif"],
      monoserrat: ["Montserrat", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      robotomono: ["Roboto Mono", "monospace"],
      bricolage: ["Bricolage Grotesque", "sans-serif"],
      lora: ["Lora", "serif"],
      robotoC: ["Roboto Condensed", "sans-serif"],
    },
  },
  plugins: [],
};
