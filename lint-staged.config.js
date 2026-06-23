module.exports = {
  '*.{ts,html}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{js,cjs,mjs,json,scss,css,md,yml,yaml}': ['prettier --write'],
};
