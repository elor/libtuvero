const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const package = require("./package.json");

module.exports = {
  entry: package.main,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var", // var, umd, commonjs2, commonjs, amd, this, assign, window, global, jsonp
    library: package.name
  },
  plugins: [
    new UglifyJSPlugin()
  ]
};
