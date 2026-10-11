import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Looping decorative motion runs as CSS so it stays on the GPU and
      // never costs JavaScript per frame.
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(var(--float-distance, -12px))" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(40px, -30px, 0)" },
        },
        wheel: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(10px)", opacity: "0.2" },
        },
        "drift-reverse": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-50px, 30px, 0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        wheel: "wheel 1.8s ease-in-out infinite",
        "drift-reverse": "drift-reverse 22s ease-in-out infinite",
      },
    },
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
  plugins: [typography],
};
