module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#3C3F45',
        'secondary-dark': '#2F3136',
        'gray': {
          '100': '#42464D', // sidebar hover
          '200': '#3C3F45', // message hover
          '300': '#32353B', // sidebar active
          '400': '#2F3136',
          '500': '#40444B', // text input
          '900': '#292B2F',
        },

      }
    },
  },
  important: true,
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
