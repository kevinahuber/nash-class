const path = require('path')
const webpack = require('webpack')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  node: path.join(__dirname, 'node_modules'),
  javascripts: path.join(__dirname, 'app/javascripts')
}

module.exports = {
  entry: {
    app: [
      PATHS.javascripts,
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=5000'
    ]
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
