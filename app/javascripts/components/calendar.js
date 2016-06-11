import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Sorter from './sorter.js'

const colors = [
  '#3E2723',
  '#FF6F00',
  '#311B92',
  '#01579B',
  '#BF360C',
  '#0D47A1',
  '#1B5E20',
  '#880E4F',
  '#004D40',
  '#1A237E',
  '#263238',
  '#33691E',
  '#006064',
  '#827717',
  '#B71C1C',
  '#4A148C'
]

// Some fat-fingered locations with no valid events. We filter these from
// the locations filter
const badLocations = [
  'Headley Park Regional Community Center',
  'Hadley Park Regional Community'
]

export default class Calendar extends React.Component {
  constructor (props) {
    super(props)
    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    )
    this.state = {
      currentLocation: '',
      summaryFilterText: ''
    }
  }

  startAccessor (event) {
    return new Date(event.start.dateTime)
  }

  endAccessor (event) {
    return new Date(event.end.dateTime)
  }

  changeLocation (location) {
    this.setState({currentLocation: location})
  }

  changeSummaryFilter (text) {
    console.log("Text", text)
    this.setState({summaryFilterText: text})
  }

  getLocations () {
    // HACK: Can do this better with fancy es6
    let locations = []
    this.props.events.map((e) => {
      if (e.location && !~locations.indexOf(e.location)) locations.push(e.location)
    })
    locations = locations.filter((l) => {
      return !~badLocations.indexOf(l)
    })
    return locations
  }

  getFilteredEvents () {
    return this.props.events.filter((event) => {
      var eventHasStartAndEndDate = event.start && event.end,
          eventMatchesLocationFilter = !this.state.currentLocation || event.location === this.state.currentLocation,
          eventMatchesSummaryFilter = !this.state.summaryFilterText || event.summary.toLowerCase().indexOf(this.state.summaryFilterText.toLowerCase()) > -1
      return eventHasStartAndEndDate && eventMatchesLocationFilter && eventMatchesSummaryFilter
    })
  }

  eventPropGetter (event) {
    const color = colors[this.getLocations().indexOf(event.location) + 1]
    return {style: {'backgroundColor': color}}
  }

  render () {
    return (
      <div>
        <div className='col-sm-12'>
          <Sorter
            locations={this.getLocations()}
            currentLocation={this.state.currentLocation}
            summaryFilterText={this.state.summaryFilterText}
            onChangeLocation={this.changeLocation.bind(this)}
            onChangeSummaryFilter={this.changeSummaryFilter.bind(this)}
            colors={colors}
          />
        </div>
        <div className='col-sm-12'>
          <h4>Calendar</h4>
          <div className='calendar'>
            <BigCalendar
              events={this.getFilteredEvents()}
              defaultDate={new Date()}
              startAccessor={this.startAccessor}
              endAccessor={this.endAccessor}
              titleAccessor='summary'
              popup
              defaultView='week'
              min={new Date(16, 2, 2, 6)}
              max={new Date(16, 2, 2, 21)}
              eventPropGetter={this.eventPropGetter.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

Calendar.defaultProps = {
  events: []
}

Calendar.propTypes = {
  events: React.PropTypes.array
}
