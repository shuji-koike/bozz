const { resolve } = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtensionReloader = require("webpack-extension-reloader")

module.exports = {
  entry: {
    main: "./index.js",
    background: "./background.js",
  },
  mode: process.env.NODE_ENV || "development",
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./manifest.json" }],
    }),
    new ExtensionReloader({
      // manifest: resolve(__dirname, "manifest.json"),
      entries: {
        contentScript: "main",
      },
    }),
  ],
}
