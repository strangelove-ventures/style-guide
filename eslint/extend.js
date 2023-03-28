// @ts-check

const { getTsconfigPath } = require("./utils/tsconfig");

/**
 * @typedef EslintConfigName
 * @type {"base" | "browser-node" | "config-authoring" | "jest" | "next" | "node" | "playwright-test" | "react" | "tailwindcss" | "tsup" | "typescript"}
 */

/**
 * @param {EslintConfigName[]} configNames
 * @param {import("eslint").Linter.Config} extraConfig
 */
module.exports = (configNames = [], extraConfig = {}) => {
  /** @type {import("eslint").Linter.Config} */
  const config = { ...extraConfig };

  /** @type {import("eslint").Linter.Config["extends"]} */
  const newExtends = [];
  configNames.forEach((name) => {
    require.resolve(`@strangelovelabs/style-guide/eslint/${name}`);
  });
  if (typeof extraConfig.extends === "string") {
    newExtends.push(extraConfig.extends);
  }
  if (Array.isArray(extraConfig.extends)) {
    newExtends.push(...extraConfig.extends);
  }
  config.extends = configNames.map((name) => {
    return require.resolve(`@strangelovelabs/style-guide/eslint/${name}`);
  });

  /** @type {import("eslint").Linter.Config["ignorePatterns"]} */
  const newIgnorePatterns = [];
  if (typeof extraConfig.ignorePatterns === "string") {
    newIgnorePatterns.push(extraConfig.ignorePatterns);
  }
  if (Array.isArray(extraConfig.ignorePatterns)) {
    newIgnorePatterns.push(...extraConfig.ignorePatterns);
  }
  config.ignorePatterns = newIgnorePatterns;

  if (configNames.includes("typescript")) {
    config.parserOptions = {
      ...config.parserOptions,
      project: getTsconfigPath(),
    };
    config.settings = {
      ...config.settings,
      "import/resolver": {
        ...config.settings?.["import/resolver"],
        typescript: {
          ...config.settings?.["import/resolver"]?.typescript,
          project: getTsconfigPath(),
        },
      },
    };
  }

  return config;
};
