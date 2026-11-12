/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 4px 16px 0 rgba(0,0,0,0.05)',
        'card-hover': '0 4px 24px 0 rgba(79,70,229,0.12), 0 8px 40px 0 rgba(0,0,0,0.08)',
        search: '0 2px 12px 0 rgba(99,102,241,0.1)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

