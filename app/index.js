const express = require('express')
const router = express.Router()
const request = require('superagent')

router.get('/', function (req, res, next) {
  request.get('https://www.googleapis.com/calendar/v3/calendars/nashville.community.classes%40gmail.com/events')
    .query({
      key: 'AIzaSyC85CEbvLyxHyMsHhEHhFEm5tliJI9i6HY'
    })
    .end((err, data) => {
      if (err) return next(err)
      res.render('index', {
        events: data.body.items
      })
    })
})

module.exports = router
