module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'eslint:recommended', // eslint 推荐规则
    'plugin:@typescript-eslint/recommended', // ts 推荐规则
  ],
  plugins: [
    "@typescript-eslint"
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  // 自定义
  rules: {},
  overrides: []
}
