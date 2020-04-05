const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: path.resolve(__dirname, './public/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './assets/scripts/bundle.js'
  },
  cache: true,
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      filename: devMode ? '[name].css' : '[name].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      filename: './index.html'
    })
  ],
  resolve: {
    extensions: [
      '.ts',  // for ts-loader
      '.js'   // for style-loader
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.ejs$/,
        use: 'ejs-compiled-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4100
  }
}
