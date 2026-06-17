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
        background: "#FAF7F2",
        foreground: "#2C2C2C",
        card: "#FFFFFF",
        "card-foreground": "#2C2C2C",
        primary: "#D45D3A",
        "primary-foreground": "#FFFFFF",
        secondary: "#7D9B7E",
        "secondary-foreground": "#2C2C2C",
        muted: "#F0EBE3",
        "muted-foreground": "#8A8A7A",
        accent: "#D45D3A",
        "accent-foreground": "#FFFFFF",
        destructive: "#c0392b",
        border: "#EDE9E3",
        input: "transparent",
        ring: "#D45D3A",
      },
      borderRadius: {
        card: "16px",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Noto Sans KR'", "'Inter'", "sans-serif"],
      },
      fontSize: {
        "display-1": ["72px", { lineHeight: "1.08" }],
        "display-2": ["48px", { lineHeight: "1.18" }],
        "display-3": ["36px", { lineHeight: "1.2" }],
      },
    },
  },
  plugins: [],
};

export default config;
