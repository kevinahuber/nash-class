const express = require('express')
const router = express.Router()
const request = require('superagent')

const constants = {
  // TODO: Read this secure key from the environemt. Right now anyone can take this
  // and abuse it (under our name).
  GOOGLE_CALENDAR_SERVER_KEY: 'AIzaSyC85CEbvLyxHyMsHhEHhFEm5tliJI9i6HY',
  GOOGLE_CALENDAR_V3_API_BASE_URL: 'https://www.googleapis.com/calendar/v3/calendars/',
  GOOGLE_CALENDAR_ID: 'nashville.community.classes@gmail.com',
  // The maximum number of results per page the Google Calendar API will return is 2500.
  GOOGLE_CALENDAR_MAXIMUM_RESULTS_PER_PAGE: 2500
}

// Create an endpoint for events
router.get('/events', function (req, res, next) {
  request.get(constants.GOOGLE_CALENDAR_V3_API_BASE_URL +
      encodeURIComponent(constants.GOOGLE_CALENDAR_ID) +
      '/events'
    )
    .query({
      key: constants.GOOGLE_CALENDAR_SERVER_KEY,
      maxResults: constants.GOOGLE_CALENDAR_MAXIMUM_RESULTS_PER_PAGE,
      orderBy: 'startTime',
      singleEvents: true
    })
    .end((err, data) => {
      if (err) return next(err)

      res.send(data.body.items)
    })
})

module.exports = router
