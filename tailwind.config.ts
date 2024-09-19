import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
  ],
  theme: {
    extend: {},
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
