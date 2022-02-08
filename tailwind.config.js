module.exports = {
  darkMode: 'media',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
    'sm': '350px'}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}