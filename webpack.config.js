const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/listen.js",
  output: {
    filename: "listen.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  node: {
    __filename: true,
    __dirname: true,
  },
};
