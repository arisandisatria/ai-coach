module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ... plugin kamu yang lain (jika ada)
      "react-native-reanimated/plugin", // WAJIB DI BARIS PALING BAWAH
    ],
  };
};
