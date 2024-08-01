// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '##333a3f',
        lightBg: '#f5f5f5',
        lightText: '#50B498'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        '10xl': '10rem', // Example size, adjust as needed
        '11xl': '12rem', // Example size, adjust as needed
      },
      lineHeight: {
        'custom-tight': '0.6', // Example custom line height
      },
      textColor: {
        'transparent': 'transparent', // Custom text color for transparency
      },
      
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
};

export default config;
