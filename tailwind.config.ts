import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00D4AA",
          dark: "#00A887",
          light: "#33DDB8",
        },
        accent: "#00F5D4",
        bg: {
          DEFAULT: "#020C1B",
          surface: "#0D1F35",
          card: "rgba(13, 31, 53, 0.7)",
        },
        border: {
          DEFAULT: "rgba(0, 212, 170, 0.15)",
          strong: "rgba(0, 212, 170, 0.35)",
        },
        text: {
          DEFAULT: "#E2EAF4",
          muted: "#8B9CC0",
          faint: "#4A5E7A",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #020C1B 0%, #0D1F35 50%, #020C1B 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(13,31,53,0.8) 0%, rgba(2,12,27,0.9) 100%)",
        "neon-gradient":
          "linear-gradient(135deg, #00D4AA, #0088FF)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 212, 170, 0.3)",
        "neon-strong": "0 0 40px rgba(0, 212, 170, 0.5)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-neon": "pulse-neon 3s ease-in-out infinite",
        gradient: "gradient-shift 4s ease infinite",
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-up": "slide-up 0.5s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 212, 170, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 212, 170, 0.7)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        glass: "16px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
