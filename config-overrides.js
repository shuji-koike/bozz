const { alias } = require("react-app-rewire-alias")

module.exports = {
  webpack(config) {
    alias({
      "~": ".",
    })(config)
    return config
  },
}
