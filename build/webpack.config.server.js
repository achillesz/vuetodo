const path = require('path');

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const isDev = process.env.NODE_ENV === 'development'
// const VueServerPlugin = require('vue-server-renderer/server-plugin');

const defaultPluins = [
  new VueLoaderPlugin()
];

let config;

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server_build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: defaultPluins.concat([
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(JSON.stringify(process.env.NODE_ENV || 'development')),
      "process.env.VUE_ENV": '"server"'
    }),
  //  new VueServerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
 
    })
    //new webpack.HotModuleReplacementPlugin()
   //  new webpack.NoEmitOnErrorsPlugin()
  ])
});

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config;
