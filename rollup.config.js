const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const copy = require('rollup-plugin-copy');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    file: path.resolve(__dirname, 'dist', 'bundle.js'),
    format: 'cjs',
    exports: 'auto',
  },
plugins: [
  resolve({
    preferBuiltins: true
  }),
  commonjs(),
  copy({
    targets: [
      { src: 'src/templates/*', dest: 'dist/templates' },
    ]
  }),
  terser() // Add the terser to the plugins array
]
};
