/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctortheme: {
          primary: '#5cb85c',           // Brand title color
          secondary: '#19D3AE',         // Accent color for highlights or buttons
          accent: '#3A4256',            // Color for accents like borders or small details
          neutral: '#3D4451',           // Neutral color for text or background
          'base-100': '#FFFFFF',        // Base background color
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
