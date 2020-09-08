const { resolve } = require("path")
const ExtensionReloader = require("webpack-extension-reloader")

module.exports = {
  entry: "./index.js",
  mode: process.env.NODE_ENV || "development",
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  plugins: [new ExtensionReloader()],
}
