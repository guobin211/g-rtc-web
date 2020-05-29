const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  entry: './test/index.js',
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './test/index.html'})
  ],
  devServer: {
    contentBase: path.join(__dirname, 'test'),
    compress: true,
    port: 9000
  }
}
