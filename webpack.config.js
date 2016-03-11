require('babel-polyfill')

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.NODE_ENV || 'development'

const PATHS = {
  root: __dirname,
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  dist: path.join(__dirname, 'dist')
};

const common = {
  entry: [
    'babel-polyfill',
    PATHS.app
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"${TARGET}"`,
        'API': `"${process.env.API}"`
      }
    })
  ]
};

if (TARGET === 'development') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.root,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}

if (TARGET === 'production') {
  module.exports = merge(common, {
    output: {
      path: PATHS.dist,
      filename: 'bundle.js'
    }
  });
}
