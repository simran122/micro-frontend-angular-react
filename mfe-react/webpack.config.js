const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/mfe-react.js",
  output: {
    filename: "mfe-react.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "system",
    clean: true,
  },
  devServer: {
    port: 9001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: "all",
  },
  externals: ["react", "react-dom", "single-spa"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
