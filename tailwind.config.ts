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
              100: "#f9d4d4",
              200: "#f3a9a9",
              300: "#ec7e7e",
              400: "#e65252",
              500: "#df2727",
              600: "#cc3333", // Default value
              700: "#990202",
              800: "#660101",
              900: "#330101",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#219849",
              100: "#d6f5dd",
              200: "#acebbc",
              300: "#83e29a",
              400: "#59d878",
              500: "#30cf56",
              600: "#219849", // Default value
              700: "#176f34",
              800: "#0e4720",
              900: "#06210b",
            },
            warning: {
              DEFAULT: "#fdcc12",
              100: "#fff6d9",
              200: "#ffeda8",
              300: "#ffe376",
              400: "#ffda45",
              500: "#ffd114",
              600: "#fdcc12", // Default value
              700: "#b6960d",
              800: "#7f6909",
              900: "#4a3d04",
            },
            danger: {
              DEFAULT: "#f83b3b",
              100: "#ffe1e1",
              200: "#ffb4b4",
              300: "#ff8787",
              400: "#ff5b5b",
              500: "#ff2e2e",
              600: "#f83b3b", // Default value
              700: "#bf1b1b",
              800: "#8e1414",
              900: "#5d0d0d",
            },
            background: {
              DEFAULT: "#F2F2F2",
              100: "#ffffff",
              200: "#f9f9f9",
              300: "#f2f2f2", // Default value
              400: "#e6e6e6",
              500: "#d9d9d9",
              600: "#cccccc",
              700: "#a6a6a6",
              800: "#7f7f7f",
              900: "#595959",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#cc3333",
              100: "#f9d4d4",
              200: "#f3a9a9",
              300: "#ec7e7e",
              400: "#e65252",
              500: "#df2727",
              600: "#cc3333", // Default value
              700: "#990202",
              800: "#660101",
              900: "#330101",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#219849",
              100: "#d6f5dd",
              200: "#acebbc",
              300: "#83e29a",
              400: "#59d878",
              500: "#30cf56",
              600: "#219849", // Default value
              700: "#176f34",
              800: "#0e4720",
              900: "#06210b",
            },
            warning: {
              DEFAULT: "#fdcc12",
              100: "#fff6d9",
              200: "#ffeda8",
              300: "#ffe376",
              400: "#ffda45",
              500: "#ffd114",
              600: "#fdcc12", // Default value
              700: "#b6960d",
              800: "#7f6909",
              900: "#4a3d04",
            },
            danger: {
              DEFAULT: "#f83b3b",
              100: "#ffe1e1",
              200: "#ffb4b4",
              300: "#ff8787",
              400: "#ff5b5b",
              500: "#ff2e2e",
              600: "#f83b3b", // Default value
              700: "#bf1b1b",
              800: "#8e1414",
              900: "#5d0d0d",
            },
            background: {
              DEFAULT: "#1A1A1A",
              100: "#333333",
              200: "#262626",
              300: "#1A1A1A", // Default value
              400: "#0D0D0D",
              500: "#000000",
              600: "#000000",
              700: "#000000",
              800: "#000000",
              900: "#000000",
            },
          },
        },
      },
    }),
  ],
};

export default config;
