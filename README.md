# @strangelovelabs/style-guide

![version](https://badgen.net/npm/v/@strangelovelabs/style-guide)
![downloads](https://badgen.net/npm/dt/@strangelovelabs/style-guide)
![license](https://badgen.net/npm/license/@strangelovelabs/style-guide)

ESLint and Prettier style guide for various Strangelove projects, which includes configs for popular linting and styling tools. Heavily based on [Vercel's style guide](https://github.com/vercel/style-guide).

The following configs are available, and are designed to be used together.

- [Prettier](#prettier)
- [ESLint](#eslint)
- [TypeScript](#typescript)

---

## Installing

```sh
# using npm
npm install --save-dev @strangelovelabs/style-guide

# using yarn
yarn add --dev @strangelovelabs/style-guide

# using pnpm
pnpm add --dev @strangelovelabs/style-guide
```

## Prettier

> Note: Prettier is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: https://prettier.io/docs/en/install.html

To use the shared Prettier config, set the following in `package.json`.

```json
{
  "prettier": "@strangelovelabs/style-guide/prettier"
}
```

## ESLint

> Note: ESLint is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: https://eslint.org/docs/user-guide/getting-started#installation-and-usage

This ESLint config is designed to be composable. The base configs,
`@strangelovelabs/style-guide/eslint/node` or `@strangelovelabs/style-guide/eslint/browser`, set
up a project for JavaScript and should always be first in `extends`.

The following optional configs are available:

- `@strangelovelabs/style-guide/eslint/jest` (requires installing [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest) and [`eslint-plugin-testing-library`](https://www.npmjs.com/package/eslint-plugin-testing-library))
- `@strangelovelabs/style-guide/eslint/next` (requires `@strangelovelabs/style-guide/eslint/react`)
- `@strangelovelabs/style-guide/eslint/react`
- `@strangelovelabs/style-guide/eslint/tailwindcss` (requires installing [`eslint-plugin-tailwindcss`](https://www.npmjs.com/package/eslint-plugin-tailwindcss))
- `@strangelovelabs/style-guide/eslint/typescript` (requires [additional configuration](#configuring-eslint-for-typescript))

> You'll need to use `require.resolve` to provide ESLint with absolute paths,
> due to an issue around ESLint config resolution (see
> [eslint/eslint#9188](https://github.com/eslint/eslint/issues/9188)).

For example, use the shared ESLint config(s) in a Next.js project, set the
following in `.eslintrc.js`.

```js
module.exports = {
  extends: [
    require.resolve("@strangelovelabs/style-guide/eslint/browser"),
    require.resolve("@strangelovelabs/style-guide/eslint/react"),
    require.resolve("@strangelovelabs/style-guide/eslint/next"),
  ],
};
```

### Configuring ESLint for TypeScript

Some of the rules enabled in the TypeScript config require additional type
information, you'll need to provide the path to your `tsconfig.json`.

For more information, see: https://typescript-eslint.io/docs/linting/type-linting

```js
const { getTsconfigPath } = require("@strangelovelabs/style-guide/eslint/helpers");

const tsconfigPath = getTsconfigPath();

module.exports = {
  extends: [
    require.resolve("@strangelovelabs/style-guide/eslint/node"),
    require.resolve("@strangelovelabs/style-guide/eslint/typescript"),
  ],
  parserOptions: {
    project: tsconfigPath,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: tsconfigPath,
      },
    },
  },
  root: true,
};
```

### Scoped configuration with `overrides`

ESLint configs can be scoped to include/exclude specific paths. This ensures
that rules don't "leak" to places where those rules don't apply.

In this example, Jest rules are only being applied to files matching Jest's
default test match pattern.

```js
module.exports = {
  extends: [require.resolve("@strangelovelabs/style-guide/eslint/node")],
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: [require.resolve("@strangelovelabs/style-guide/eslint/jest")],
    },
  ],
};
```

#### A note on file extensions

By default, all TypeScript rules are scoped to files ending with `.ts` and
`.tsx`.

However, when using overrides, file extensions must be included or ESLint will
only include `.js` files.

```js
module.exports = {
  overrides: [
    {
      files: ["directory/**/*.[jt]s?(x)"],
      rules: {
        "my-rule": "off",
      },
    },
  ],
};
```

## TypeScript

To use the shared TypeScript config, set the following in `tsconfig.json`.

```json
{
  "extends": "@strangelovelabs/style-guide"
}
```

The following optional configs are available:

- `@strangelovelabs/style-guide/tsconfig` (same as `@strangelovelabs/style-guide`)
- `@strangelovelabs/style-guide/tsconfig/next` (for Next.js projects)

## Acknowledgements

- https://github.com/vercel/style-guide

## License

[Mozilla Public License Version 2.0](./LICENSE.txt)
