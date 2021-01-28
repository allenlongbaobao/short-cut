// 参考 https://cn.eslint.org/docs/rules/

module.exports = {
  root: true,
  extends: ["eslint-config-ant/base"],
  rules: {},
  parser: "@typescript-eslint/parser"
  plugins: ["@typescript-eslint"]
  settings: {
    "@typescript-eslint/rule-name": "error"
  },
};
