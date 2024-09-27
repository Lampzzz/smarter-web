import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      extend: {
        colors: {
          primary: "#F58509",
          white: {
            DEFAULT: "#FCFCFC",
            100: "#F6F6F6",
          },
          gray: {
            DEFAULT: "#696969",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
