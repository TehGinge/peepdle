const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // to import index.html file inside index.js
      favicon: "src/assets/favicon.ico"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "CNAME")
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },      
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    headers: {
      'Cache-Control': 'no-store',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    compress: true,
    port: 9000,
    hot: true, // Enable Hot Module Replacement
  },
  cache: false
};
