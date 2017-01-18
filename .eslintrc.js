module.exports = {
  extends: "eslint:recommended",
  // "extends": "standard",
  plugins: [
    "standard",
    "promise",
  ],
  parserOptions: {
    sourceType: "module",
  },
  env: {
    es6: true
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
  }
};
