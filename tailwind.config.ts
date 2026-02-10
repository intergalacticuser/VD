import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f1115",
        bgSoft: "#171a20",
        panel: "#1e232d",
        text: "#e6e7ea",
        muted: "#a2a7b0",
        accent: "#c5a46d",
        line: "#2a313d",
        success: "#4ea87a",
        danger: "#c87070"
      },
      boxShadow: {
        soft: "0 10px 35px rgba(0, 0, 0, 0.25)"
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
