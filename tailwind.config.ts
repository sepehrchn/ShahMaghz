import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep forest green / near-black
        forest: {
          950: "#0A140C",
          900: "#0F1D14",
          800: "#16271A",
          700: "#1C2B1E",
          600: "#243527",
          500: "#2D4130",
          400: "#3A5239",
        },
        // Gold / bronze accent
        gold: {
          50: "#FBF6E8",
          100: "#F5EBC8",
          200: "#E7C873",
          300: "#D4AF4F",
          400: "#C9A24B",
          500: "#B8862E",
          600: "#9A6F23",
        },
        // Warm ivory / cream text
        ivory: {
          50: "#FAF7F0",
          100: "#F5EFE0",
          200: "#EDE5D0",
          300: "#DDD2B8",
          400: "#C9BC9A",
        },
        // Deep burgundy accent (used sparingly)
        burgundy: {
          700: "#6E1423",
          800: "#5A1019",
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
        display: ["var(--font-dana)", "var(--font-vazirmatn)", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "seal-stamp": "sealStamp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        sealStamp: {
          "0%": { opacity: "0", transform: "scale(1.4) rotate(-12deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
      },
      backgroundImage: {
        "kraft-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        "linen-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        "gold-shimmer":
          "linear-gradient(90deg, #C9A24B 0%, #E7C873 50%, #C9A24B 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
