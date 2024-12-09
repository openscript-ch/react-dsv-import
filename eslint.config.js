import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginNxEslint from '@nx/eslint-plugin';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['**/dist', '**/*.gen.*'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...pluginNxEslint.configs['flat/typescript'],
  pluginPrettierRecommended,
];
