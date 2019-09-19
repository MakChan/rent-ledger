const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  plugins: [new Dotenv()],
  externals: [nodeExternals()]
};
