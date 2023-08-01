const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: path.resolve(__dirname, 'index.js'),
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'),
    format: 'cjs',
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
