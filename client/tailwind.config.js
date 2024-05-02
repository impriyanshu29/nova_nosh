/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),

  ],
  theme: {
    extend: {
      fontFamily: {
      'logo_font' :['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
