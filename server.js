var express = require('express')
var path = require('path')

var routes = require('./routes')
const port = process.env.PORT || '3000'

var app = express()

// Logging middleware first, so it will always execute. Using colorized 'dev'
// output
app.use(require('morgan')('dev'))

// Serve static files directly from the app folder
app.use(express.static(path.join(__dirname, 'build')))
app.use(routes)

// For now just serve the main index.html page. Later we can use something
// like file-loader, which copies "import"ed files to the output.path. This
// means we can serve the HTML pages that load an app by "import"ing them into
// their entry files
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'))
})

if (process.env.NODE_ENV !== 'production') {
  // We be reloading, they hating...
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var webpack = require('webpack')
  var webpackConfig = require('./webpack.config.js')
  var compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: webpackConfig.output.filename,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, // eslint-disable-line no-console
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))
}

// Simple error handling, expose stacktrace and error information
// Express has pretty decent 404 handling so we can ignore for now
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    stacktrace: err.stack
  })
})

// Instantiate the server after we've added all the middleware
var server = require('http').createServer(app)
server.listen(port)
