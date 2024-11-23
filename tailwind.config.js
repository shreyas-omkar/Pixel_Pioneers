module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      'body': ['Poppins', 'sans-serif'],
      'heading': ['Libre Baskerville', 'serif'],
    },
    extend: {
      colors: {
        'dark': '#212A31',
        'light': '#D3D9D4',
        'semiDark': '#2E3944',
        'semiLight': '#748D92',
        'accent': '#124E66',
      },
    },
  },
  plugins: [],
}