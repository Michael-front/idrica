import webpack from "@cypress/webpack-preprocessor";

export default (on) => {
  const options = {
    webpackOptions: require("../../webpack.config"),
  };
  on("file:preprocessor", webpack(options));
};
