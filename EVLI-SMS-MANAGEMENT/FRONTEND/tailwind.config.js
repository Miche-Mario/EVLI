/** @type {import('tailwindcss').Config} */ 
const defaultTheme = require('tailwindcss/defaultConfig');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#3B81F6",
      white: '#ffffff',
      dark: '#0e121a',
      text: {
        DEFAULT: "#1F2937",
        light: "#6C7281",
      },
      light: {
        DEFAULT: "#FAFBFC",
        lighter: "#F3F4F6",
      },
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'red': '#F50C14', 
        'redd' : '#FB6180',
        'gray': {
          50:'#f9fafb',
          100:'#f3f4f6',
          200:'#e5e7eb',
          300:'#d1d5db',
          400:'#9ca3af',
          500:'#6b7280',
          600:'#4b5563',
          700:'#374151',
          800:'#1f2937',
          900:'#111827',
        },
        'purple': {
          50:'#fdf4ff',
          100:'#fae8ff',
          200:'#f5d0fe',
          300:'#f0abfc',
          400:'#e879f9',
          500:'#d946ef',
          600:'#c026d3',
          700:'#a21caf',
          800:'#86198f',
          900:'#701a75',
        },
        'green': {
           50:'#f0fdf4',
          100:'#dcfce7',
          200:'#bbf7d0',
          300:'#86efac',
          400:'#4ade80',
          500:'#48BB78',
          600:'#16a34a',
          700:'#15803d',
          800:'#166534',
          900:'#14532d',
        },
        'blue':{
          50:'#eff6ff',
          100:'#dbeafe',
          200:'#bfdbfe',
          300:'#93c5fd',
          400:'#60a5fa',
          500:'#3b82f6',
          600:'#2563eb',
          700:'#1d4ed8',
          800:'#1e40af',
          900:'#1e3a8a'
        },
        slate : {
          50:"#f8fafc",
          100:"#f1f5f9",
          200:"#e2e8f0",
          300:"#cbd5e1",
          400:"#94a3b8",
          500:"#64748b",
          600:"#475569",
          700:"#334155",
          800:"#1e293b",
          900:"#0f172a",
        }
          ,
        "dark-purple": "#081A51",
        "light-white": 'rgb(255,255,255,0.1)',
        "light-dark": '#555555',
        "green-online": "#008000"
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [
  ],
}