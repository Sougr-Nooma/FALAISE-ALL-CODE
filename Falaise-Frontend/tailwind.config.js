/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:{
      colors:{
        primary:'#f97316',   // orange-500
        secondary:'#1f2937', // gray-800
        accent:'#fed7aa',    // orange-200
      }
    }
  },
  plugins:[],
}