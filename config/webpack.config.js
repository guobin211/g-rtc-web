/**
 * webpack.config
 *
 * @author GuoBin on 2019-07-20
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {

  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  devtool: "inline-source-map",
  entry: {
    rtc: "./src/Rtc.ts",
    test: "./src/main.ts",
  },
  mode: "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "..", "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "index.html"),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
};
