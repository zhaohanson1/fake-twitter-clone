const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'client', 'src', 'index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/bundle.js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'public'),
    compress: true,
    port: process.env.WEBPACK_PORT
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },

};

