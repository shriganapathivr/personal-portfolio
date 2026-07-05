import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a",
        surface: "#0e0e0e",
        iris: {
          DEFAULT: "#7042f8",
          soft: "#9a7bff",
        },
        aqua: {
          DEFAULT: "#00d8ff",
        },
        ink: "#f4f6f4",
        muted: "#9096a3",
      },
      fontFamily: {
        heading: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(0,255,136,0.25), 0 12px 40px -12px rgba(0,255,136,0.45)",
        glass: "0 24px 60px -30px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "neon-grad": "linear-gradient(100deg, #00ff88, #5cffb1)",
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        spin360: { to: { transform: "rotate(360deg)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
      },
      animation: {
        spin360: "spin360 1s linear infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
