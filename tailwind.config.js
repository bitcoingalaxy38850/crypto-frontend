/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Customize your primary color
      },
      keyframes: {
        upDown: {
          '0%, 100%': { transform: 'translateY(-20px)' }, // Moves the image up
          '50%': { transform: 'translateY(20px)' }, // Moves the image down
        },
      },
      animation: {
        'up-down': 'upDown 3s ease-in-out infinite', // 3-second infinite loop
      },
    },
  },
  plugins: [],
}

