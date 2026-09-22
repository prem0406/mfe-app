const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true, // needed for client-side routing
    proxy: [{ context: ["/api"], target: "http://localhost:4000" }],
  },
  output: { publicPath: "/" },
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        // format: "<remoteName>@<url>/<filename>"
        products: "products@http://localhost:3001/remoteEntry.js",
        cart: "cart@http://localhost:3002/remoteEntry.js",
        checkout: "checkout@http://localhost:3003/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
