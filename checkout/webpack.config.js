const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3003,
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
      name: "checkout", // unique remote name
      filename: "remoteEntry.js", // manifest the shell will fetch
      exposes: {
        "./Checkout": "./src/Checkout", // what other apps can import
      },
      remotes: {
        // format: "<remoteName>@<url>/<filename>"
        cart: "cart@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
