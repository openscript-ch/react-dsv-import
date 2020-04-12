import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const outputDefaults = { globals: { react: 'React' }, sourcemap: true };
const defaults = {
  input: 'src/index.tsx',
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [typescript()]
};

export default [
  {
    ...defaults,
    output: [
      { dir: 'dist/iife', name: 'ReactDSVImport', format: 'iife', ...outputDefaults },
      { dir: 'dist/es', format: 'es', ...outputDefaults }
    ]
  },
  {
    ...defaults,
    plugins: [typescript({ declaration: true, declarationDir: 'dist' })],
    output: [{ dir: 'dist', format: 'cjs', ...outputDefaults }]
  }
];
