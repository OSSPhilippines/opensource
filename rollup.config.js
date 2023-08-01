const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const copy = require('rollup-plugin-copy');

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
    })
  ]
};
