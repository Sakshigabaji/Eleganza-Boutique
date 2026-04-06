// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtleZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        subtleZoom: 'subtleZoom 15s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;