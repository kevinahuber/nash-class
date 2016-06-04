var express = require('express')
var path = require('path')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')
var app = express()

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

// view engine setup
app.set('views', path.join(__dirname, '/app/views'))
app.set('view engine', 'jade')

var bodyParser = require('body-parser')

app.use(require('./lib/jade-react.js'))
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('cookie-parser')())
app.use(express.static(path.join(__dirname, 'build')))

const port = process.env.PORT || '3000'

app.set('port', port)

var server = require('http').createServer(app)

server.listen(port)

require('babel-register')({
  only: path.join(__dirname, 'app/javascripts'),
  extensions: ['.js']
})
app.use('/', require('./app/index'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})
