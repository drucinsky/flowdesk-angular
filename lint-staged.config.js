module.exports = {
    "*.{ts,html}": ["eslint --fix --max-warnings=0", "prettier --write"],
    "*.{scss,css,json,md,yml,yaml}": ["prettier --write"],
};