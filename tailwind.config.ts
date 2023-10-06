import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary-100": "#00476C",
      },
      textColor: {
        "primary-100": "#00476C",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        nun: ["Nunito", "sans-serif"],
      },
      width: {
        "500": "31.25rem",
      },
      border: {
        "primary-100": "#00476C",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
