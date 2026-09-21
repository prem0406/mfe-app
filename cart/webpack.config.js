const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3002,
    headers: { "Access-Control-Allow-Origin": "*" }, // lets the shell load this remote
  },
  output: { publicPath: "auto" },
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cart", // unique remote name
      filename: "remoteEntry.js", // manifest the shell will fetch
      exposes: {
        "./Cart": "./src/Cart", // what other apps can import
        "./CartBadge": "./src/CartBadge",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
