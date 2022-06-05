# react-dsv-import

Flexible, typed and easy to use React Component ⚛ to provide CSV, TSV and other delimiter-separated values formats ([DSV](https://en.wikipedia.org/wiki/Delimiter-separated_values)) import functionality.

[![Travis (.com)](https://img.shields.io/travis/com/openscript/react-dsv-import)](https://travis-ci.com/github/openscript/react-dsv-import)
[![npm](https://img.shields.io/npm/v/react-dsv-import)](https://www.npmjs.com/package/react-dsv-import)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-dsv-import/peer/react)](https://www.npmjs.com/package/react)
[![GitHub](https://img.shields.io/github/license/openscript/react-dsv-import)](https://github.com/openscript/react-dsv-import)
[![Maintainability](https://api.codeclimate.com/v1/badges/f05b123887e046758a96/maintainability)](https://codeclimate.com/github/openscript/react-dsv-import/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f05b123887e046758a96/test_coverage)](https://codeclimate.com/github/openscript/react-dsv-import/test_coverage)

![Demonstration](./docs/demo.apng)

## Getting started

Add the package with the package manager of choice to your project:

- **yarn**: `yarn add react-dsv-import`
- **npm**: `npm install react-dsv-import`
- **npx**: `npx -p react-dsv-import`

### TypeScript

```
import { DSVImport, ColumnsType } from 'react-dsv-import';

type BasicType = { forename: string; surname: string; email: string };

const columns: ColumnsType<BasicType> = [
  { key: 'forename', label: 'Forename' },
  { key: 'surname', label: 'Surname' },
  { key: 'email', label: 'Email' }
];

<DSVImport<BasicType> columns={columns}>
  <DSVImport.TextareaInput />
  <DSVImport.TablePreview />
</DSVImport>
```

### JavaScript

```
import { DSVImport } from 'react-dsv-import';

const columns = [
  { key: 'forename', label: 'Forename' },
  { key: 'surname', label: 'Surname' },
  { key: 'email', label: 'Email' }
];

<DSVImport columns={columns}>
  <DSVImport.TextareaInput />
  <DSVImport.TablePreview />
</DSVImport>
```

## API

The `<DSVImport<T>>` components has the following API:

| Property        | Type                            | Description                                             |
| :-------------- | :------------------------------ | :------------------------------------------------------ |
| `columns`       | [ColumnType](#columntype)       | Description of the expected columns                     |
| `transformers?` | [Transformer](#transformer)`[]` | Globally applied transformers                           |
| `onChange?`     | `(value: T[]) => void`          | Callback which is called after parsing the input        |
| `onValidation?` | `(errors: Error<T>[]) => void`  | Callback which is called if there are validation errors |

### Types

Within this section additional types are explained.

#### ColumnType

| Property        | Type                            | Description                                                 |
| :-------------- | :------------------------------ | :---------------------------------------------------------- |
| `key`           | `string`                        | Key of the current column                                   |
| `label`         | `string`                        | Label of the current column, which can be shown to the user |
| `rules?`        | [Rule](#rule)`[]`               | Validation rules which are applied to this column           |
| `transformers?` | [Transformer](#transformer)`[]` | Transformers which are applied to this column               |

#### Rule

| Property    | Type                                                                | Description              |
| :---------- | :------------------------------------------------------------------ | :----------------------- |
| `message`   | `string`                                                            | Error message            |
| `contraint` | `{ unique: boolean } \| { constraint: `[Constraint](#constraint)`}` | Constraint for this rule |

#### Constraint

`(value: string) => boolean`

#### Transformer

`(value: string) => string`

## Project

This section describes the status of the project.

### Features

The most important features of this component are:

- ✅ Type definitions and type safety
- ✅ DSV format detection
- ✅ Fully compositable
- ✅ Automatic testing with >90% coverage
- ✅ Input validation
- ✅ [Ant Design](https://ant.design/) integration (see storybook)
- ✅ Input transformation (e.g. trim, ...)
- ❌ [Material UI](https://material-ui.com/) integration (see storybook)

✅ means the feature is implemented and released. ❌ indicates that a feature is planned.

### Links

- [Code repository](https://github.com/openscript/react-dsv-import)
- [Build status](https://travis-ci.com/github/openscript/react-dsv-import)
- [Documenation and examples](https://openscript.github.io/react-dsv-import)
- [Package publication](https://www.npmjs.com/package/react-dsv-import)
- [Code quality evaluation](https://codeclimate.com/github/openscript/react-dsv-import)

## Tools

- [yarn](https://yarnpkg.com/)
- [rollup.js](https://rollupjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
  - [TypeScript ESLint](https://typescript-eslint.io/)
- [React](https://reactjs.org/)
- [Storybook](https://storybook.js.org/)
  - [Addon: Docs](https://github.com/storybookjs/storybook/tree/master/addons/docs)
  - [Addon: Source](https://github.com/storybookjs/storybook/tree/master/addons/storysource)
  - [Addon: Actions](https://github.com/storybookjs/storybook/tree/master/addons/actions)
- [Travis CI](https://travis-ci.com)

## Resources

- [Article: Using ESLint and Prettier in a TypeScript Project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
- [Template: Rollup Starter Lib (TypeScript)](https://github.com/rollup/rollup-starter-lib/tree/typescript)
- [Article: Creating a React Component library using Rollup, Typescript, Sass and Storybook](https://blog.harveydelaney.com/creating-your-own-react-component-library/) <br /> Explains how to create a React component library using Rollup
- [Template: Debugging tests in VS Code](https://github.com/microsoft/vscode-recipes/tree/master/debugging-jest-tests)
