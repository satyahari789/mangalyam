module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'matri-bg': '#fceed9',
        'matri-gold': '#FFCC00',
        'matri-green': '#28A745'
      },
      fontFamily: {
        matri: ['Jost', 'sans-serif']
      }
    }
  }
};
