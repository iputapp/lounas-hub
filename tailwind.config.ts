import type { Config } from "tailwindcss";
/** @see {@link https://nextui.org/docs/guide/installation#tailwind-css-setup} */
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      minHeight: {
        screen: "100dvh",
      },
      maxHeight: {
        screen: "100dvh",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
