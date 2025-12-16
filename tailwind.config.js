export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 12s ease-in-out infinite",
        floatSlow: "float 18s ease-in-out infinite",
        floatSlower: "float 25s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-40px)" },
        },
      },
    },
  },
  plugins: [],
};
