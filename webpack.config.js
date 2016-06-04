const path = require('path');
const webpack = require('webpack');
const jadeReact = path.resolve('lib/jade-react.js')
const TARGET = process.env.npm_lifecycle_event;
const NpmInstallPlugin = require('npm-install-webpack-plugin');

process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  node: path.join( __dirname, 'node_modules' ),
  javascripts: path.join(__dirname, 'app/javascripts')
};

module.exports = {
  entry: {
    app: [jadeReact, PATHS.javascripts, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
        test: /\.json$/,
        loader: 'json-loader'
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
