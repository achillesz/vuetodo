const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8000/public/'
  },
  module: {
    rules: [{
      resourceQuery: /blockType=docs/,
      loader: require.resolve('./docs-loader.js')
    },
    {
      test: /.vue$/,
      loader: 'vue-loader',
      options: createVueLoaderOptions(isDev)
    },
    {
      test: /.jsx$/,
      loader: 'babel-loader'
    },
    {
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'resources/[path][name].[hash].[ext]'
        }
      }]
    }
    ]
  }
}

module.exports = config;
