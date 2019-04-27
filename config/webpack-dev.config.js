const path = require('path');
const mainWebpack = require('./webpack-main.config');

const outputPath = path.resolve(__dirname, '../', 'dist');

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    open: true,
    host: process.env.HOST || '0.0.0.0',
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  ...mainWebpack,
};
