module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        //Row 1 Figma Frame 1
        "black-primary": "#1E1E1E",
        "black-secondary": "#5C5C5C",
        "black-tertiary": "#373737",
        "white-primary": "#FFFFFF",

        //Row 2 Figma Frame 1
        "pink-primary": "#F48FB1",
        "pink-secondary": "#FFC1E3",
        "pink-tertiary": "#BF5F82",

        //Row 3 Figma Frame 1
        "grey-primary": "#616161",
        "grey-secondary": "#8E8E8E",
        "grey-tertiary": "#373737",

        //Row 4 Figma Frame 1
        "white-secondary": "#F5F5F6",
        "white-tertiary": "#E1E2E1",

        //Shadows Figma
        "shadow-primary": "#373737",
      },
    },
  },
  plugins: [],
};
