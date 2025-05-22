/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define CSS variables for custom colors
        "--color-primary-50": "#e6f1fe",
        "--color-primary-100": "#cce3fd",
        "--color-primary-200": "#99c7fb",
        "--color-primary-300": "#66aaf9",
        "--color-primary-400": "#338ef7",
        "--color-primary-500": "#0072f5",
        "--color-primary-600": "#005bc4",
        "--color-primary-700": "#004493",
        "--color-primary-800": "#002e62",
        "--color-primary-900": "#001731",
      }
    },
  },
  plugins: [],
}