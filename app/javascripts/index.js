import '../styles/main.css'
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Calendar from './components/calendar'

ReactDOM.render(
  <Calendar events={[]}/>,
  document.getElementById('filterable-calendar')
)

var events = fetch('/events')
  .then(function(response) { return response.json() })
  .then(function(events) {
    ReactDOM.render(
      <Calendar events={events}/>,
      document.getElementById('filterable-calendar')
    )
  }).catch(function(ahhh) {
    console.error(ahhh)
  })
