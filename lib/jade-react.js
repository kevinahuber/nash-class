var React = require('react')

if (typeof __webpack_require__ === 'undefined') {
  var ReactDomServer = require('react-dom/server')
  var r = (opts) => ReactDomServer.renderToString(_el(opts))
  module.exports = function (req, res, next) {
    res.locals.__jadeReact = r
    next()
  }
} else {
  var ReactDom = require('react-dom')
  window.__jadeReact = (opts) => ReactDom.render(_el(opts), document.getElementById(opts.id))
}

function _component (opts) {
  var c = require('../app/javascripts/components/' + opts.component + '.js')
  return c.__esModule && c.default ? c.default : c
}

function _el (opts) {
  return React.createElement(_component(opts), (opts || {}).props || {})
}
