const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var', // var, umd, commonjs2, commonjs, amd, this, assign, window, global, jsonp
    library: 'tuvero'
  },
  plugins: [
    new UglifyJSPlugin()
  ]
};