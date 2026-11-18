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
        cosmeto: {
          green: "#36B729",       // Primary CosmetoCity Brand Green (from cosmetocity.com)
          greenDark: "#2B9620",   // Hover / Active Green
          teal: "#378AA0",        // Secondary Deep Teal Accent (from cosmetocity.com)
          tealDark: "#246476",    // Deep Mediterranean Teal
          cyan: "#89CDDF",        // Sky Cyan Accent (from cosmetocity.com)
          ice: "#CEE7ED",         // Pale Ice Blue
          sand: "#F0EBD8",        // Signature Warm Sandal Cream Background (from cosmetocity.com)
          sandLight: "#F9F7F0",   // Soft Cream Surface
          sandBorder: "#E0DAC5",  // Border Sand (from cosmetocity.com)
          taupe: "#B5AD8F",       // Muted Taupe Accent
          charcoal: "#2D332F",    // Clean Dark Heading Charcoal
          body: "#4D4D4D",        // Body Text Color (from cosmetocity.com)
        },
      },
    },
  },
  plugins: [],
};
export default config;
