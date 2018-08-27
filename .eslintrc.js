module.exports = {
  extends: "eslint:recommended",
  // "extends": "standard",
  plugins: [
    "standard",
    "promise",
  ],
  parserOptions: {
    ecmaVersion: "2018",
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
  }
};
