const path = require('node:path');

const baseline = process.env.JS_AUTO === '0';
const bundler = process.env.BUNDLER ?? 'webpack';

module.exports = {
  mode: 'none',
  target: 'node',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist', bundler, baseline ? 'baseline' : 'with-rule'),
    filename: 'bundle.cjs',
    assetModuleFilename: '[name][ext]',
    publicPath: '',
  },
  module: {
    rules: baseline ? [] : [{ test: /\.js$/, type: 'javascript/auto' }],
  },
};
