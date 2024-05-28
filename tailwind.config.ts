import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    extend: {
      colors: {
        "primary": '#fec900',
         "light-1": "#FFFFFF",
         glassmorphism: "rgba(16, 16, 18, 0.60)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        'xs': '500px',
        '1200': "1200px"      
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config