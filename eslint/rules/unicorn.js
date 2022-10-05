// @ts-check

/** @type {import("eslint").Linter.Config} */
const config = {
  plugins: ["unicorn"],
  rules: {
    "unicorn/filename-case": ["error", { cases: ["kebabCase", "pascalCase", "camelCase"] }],
  },
};

module.exports = config;
