const express = require('express')
const router = express.Router()
const request = require('superagent')

const CON = require('./constants')
const CRE = require('./credentials')

router.get('/', function (req, res, next) {
  request.get(CON.GOOGLE_CALENDAR_V3_API_BASE_URL +
      encodeURIComponent(CON.GOOGLE_CALENDAR_ID) +
      '/events'
    )
    .query({
      key: CRE.GOOGLE_CALENDAR_SERVER_API_KEY,
      maxResults: CON.GOOGLE_CALENDAR_MAXIMUM_RESULTS_PER_PAGE,
      orderBy: 'startTime',
      singleEvents: true
    })
    .end((err, data) => {
      if (err) return next(err)

      res.render('index', {
        events: data.body.items
      })
    })
})

module.exports = router
