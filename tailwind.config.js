/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c4ff0e',
        'primary-hover': '#d4ff3e',
        'primary-dark': '#a0d000',
        'dark-bg': '#1a1d2e',
        'dark-surface': '#252943',
        'dark-accent': '#2d3250',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.3) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(196, 255, 14, 0.2) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.3) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
