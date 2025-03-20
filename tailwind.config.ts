import type { Config } from "tailwindcss";

const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // If using `src` directory
    flowbite.content(), // Added Flowbite content
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'faded-dots-blue': "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0.8px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        '16': '16px 16px',
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        shimmer:{
          from: {
             backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          }
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      colors: {
        'primary': '#6934b3',
        'primary-dark': '#1b0b32',
        'blue-dark': 'rgb(2 6 23)',
      },
    },
  },
  plugins: [
    addVariablesForColors,
    flowbite.plugin(), // Added Flowbite plugin
  ],
};

export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
