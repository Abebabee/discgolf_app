import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        card_foreground: "var(--card-foreground)",
        popover: "var(--popover)",
        popover_foreground: "var(--popover-foreground)",
        primary: "var(--primary)",
        primary_foreground: "var(--primary-foreground)",
        primary_hover: "var(--primary-hover)",
        secondary: "var(--secondary)",
        secondary_foreground: "var(--secondary-foreground)",
        muted: "var(--muted)",
        muted_foreground: "var(--muted-foreground)",
        accent: "var(--accent)",
        accent_foreground: "var(--accent-foreground)",
        destructive: "var(--destructive)",
        destructive_foreground: "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        green: "var(--green)",
        orange: "var(--orange)"
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
};
export default config;
