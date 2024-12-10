# react-dsv-import

Flexible, typed and easy to use React Component ⚛ to provide CSV, TSV and other delimiter-separated values formats ([DSV](https://en.wikipedia.org/wiki/Delimiter-separated_values)) import functionality.

[![npm](https://img.shields.io/npm/v/react-dsv-import)](https://www.npmjs.com/package/react-dsv-import)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-dsv-import/peer/react)](https://www.npmjs.com/package/react)
[![GitHub](https://img.shields.io/github/license/openscript/react-dsv-import)](https://github.com/openscript-ch/react-dsv-import)

![Demonstration](./docs/demo.apng)

## Getting started

Add the package with the package manager of choice to your project:

- **yarn**: `yarn add react-dsv-import`
- **npm**: `npm install react-dsv-import`
- **npx**: `npx -p react-dsv-import`
- **pnpm**: `pnpm add react-dsv-import`

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
