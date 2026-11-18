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
        brand: {
          dark: "#071923",
          navy: "#0B2534",
          teal: "#0D9488",
          gold: "#C8A46E",
          goldLight: "#E5CFA8",
          surface: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
