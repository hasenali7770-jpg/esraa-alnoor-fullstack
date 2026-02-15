import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B1220",
        surface: "#0F1A2E",
        surface2: "#0C162A",
        border: "#1E2B44",
        text: "#EAF2FF",
        muted: "#9FB0CF",
        primary: "#2A7D8F",
        primary2: "#1E5F6E",
      },
      boxShadow: {
        soft: "0 10px 35px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
