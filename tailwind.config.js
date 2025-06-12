import { colors } from "./src/styles/colors";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors,
  },
};
export const plugins = [];
