const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: path.resolve(__dirname, 'index.js'),
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'),
    format: 'cjs',
    exports: 'auto', // Set output.exports to "auto" to handle CommonJS exports properly
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    commonjs()
  ]
};
