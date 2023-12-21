module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  extends: ["standard-with-typescript", "plugin:vue/vue3-essential"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".vue"]
  },
  plugins: ["vue"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0
  }
};
