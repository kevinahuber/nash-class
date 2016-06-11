import React from 'react'

export default class Sorter extends React.Component {
  handleSummaryFilterChange () {
    this.props.onChangeSummaryFilter(
      this.refs.summaryFilterText.value
    )
  }

  render () {
    return (
      <div>
        <div className="col-md-4 col-md-offset-4 input-group">
          <label hidden className="label label-default" for="summary-filter"></label>
          <span className="input-group-addon">
              <i className="glyphicon glyphicon-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            name="summary-filter"
            value={this.props.summaryFilterText}
            placeholder="Yoga with Lex"
            ref="summaryFilterText"
            onChange={this.handleSummaryFilterChange.bind(this)}
            />
        </div>
        <div className='sorter'>
          {this.props.locations.map((l, k) => (
            <div
              className={l === this.props.currentLocation ? 'current' : ''}
              onClick={this.props.onChangeLocation.bind(this, l)}
              key={l}
              style={{
                'backgroundColor': this.props.colors[k + 1],
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
