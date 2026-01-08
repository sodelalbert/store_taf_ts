module.exports = {
  env: { node: true, es6: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: { ecmaVersion: 2019, sourceType: 'module' },
  rules: { 'prettier/prettier': 'error' },
};
