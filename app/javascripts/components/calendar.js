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
    this.state = {}
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

  filterByLocation () {
    return this.props.events.filter((e) => {
      return e.status !== 'cancelled' && e.start && e.end &&
        (!this.state.currentLocation || e.location === this.state.currentLocation)
    })
  }

  eventPropGetter (event) {
    const color = colors[this.getLocations().indexOf(event.location) + 1]
    return {style: {'background-color': color}}
  }

  render () {
    return (
      <div>
        <div className='col-sm-12'>
          <Sorter
            locations={this.getLocations()}
            currentLocation={this.state.currentLocation}
            onChangeLocation={this.changeLocation.bind(this)}
            colors={colors}
          />
        </div>
        <div className='col-sm-12'>
          <h4>Calendar</h4>
          <div className='calendar'>
            <BigCalendar
              events={this.filterByLocation()}
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
