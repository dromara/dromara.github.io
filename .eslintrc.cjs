module.exports = {
  env: {
    browser: true,
    es2021: true
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
    "@typescript-eslint/semi": "off",
    "space-before-function-paren": ["error", "always"]
  }
};
