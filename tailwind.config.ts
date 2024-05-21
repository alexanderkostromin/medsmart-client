import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        beacon: {
          "0%": { color: "rgb(248 113 113 / var(--tw-text-opacity))" },
          // "0%": { color: "rgb(220 38 38 / var(--tw-text-opacity))" },
          "15%": { color: "rgb(220 38 38 / var(--tw-text-opacity))" },
          "30%": { color: "rgb(220 38 38 / var(--tw-text-opacity))" },
          "100%": { color: "" },
        },
      },
      animation: {
        beacon: "beacon 1500ms normal forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
