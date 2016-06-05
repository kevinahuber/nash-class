import React from 'react'

export default class Sorter extends React.Component {
  render () {
    return (
      <div>
        <h4>Filter</h4>
        <div className='sorter'>
          {this.props.locations.map((l, k) => (
            <div
              className={l === this.props.currentLocation ? 'current' : ''}
              onClick={this.props.onChangeLocation.bind(this, l)}
              key={l}
              style={{
                'background-color': this.props.colors[k + 1],
                'color': 'white',
                'padding': '10px',
                'margin': '3px',
                'border': l === this.props.currentLocation ? '#FFEB3B 6px solid' : 'white 6px solid'
              }}>
              {l}
            </div>
          ))}
          <div
            style={{
                'background-color': this.props.colors[0],
                'color': 'white',
                'padding': '10px',
                'margin': '3px',
                'border': !this.props.currentLocation ? '#FFEB3B 6px solid' : 'white 6px solid'
              }}
            onClick={this.props.onChangeLocation.bind(this, undefined)}>
            All Locations
          </div>
        </div>
      </div>
    )
  }
}

Sorter.propTypes = {
  locations: React.PropTypes.array,
  currentLocation: React.PropTypes.string,
  onChangeLocation: React.PropTypes.func,
  colors: React.PropTypes.array
}