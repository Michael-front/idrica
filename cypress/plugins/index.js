//import webpack from "@cypress/webpack-preprocessor";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("@cypress/webpack-preprocessor");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = (on) => {
  const options = {
    // webpackOptions: require("../../webpack.config"),
    // webpackOptions: require(path.resolve(__dirname, "../webpack.config.js")),
    webpackOptions: require(path.resolve(process.cwd(), "webpack.config.js")),
  };
  on("file:preprocessor", webpack(options));
};
