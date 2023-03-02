module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "day": "url('/public/img/cloud.jpeg')",
        "night": "url('/public/img/night.jpeg')",
        "rain": "url('/public/img/rain.jpeg')",
        "cloud": "url('/public/img/cloud.jpeg')",
        "ying": "url('/public/img/ying.jpeg')",
        "sun": "url('/public/img/sun.png')",
      },
      colors: {
        "weather-primary": "#1864ab",
        "weather-secondary": "#74c0fc",
      },
    },
    fontFamily: {
      ali: ["阿里巴巴普惠体 2.0 35 Thin", "sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screen: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
