import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#cc3333",
              foreground: "#FFFFFF",
            },
            success: "#219849",
            warning: "#fdcc12",
            danger: "#f83b3b",
            background: "#F2F2F2",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#cc3333",
              foreground: "#FFFFFF",
            },
            success: "#219849",
            warning: "#fdcc12",
            danger: "#f83b3b",
            background: "#1A1A1A",
          },
        },
      },
    }),
  ],
};

export default config;
