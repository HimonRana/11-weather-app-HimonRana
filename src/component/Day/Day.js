import React, { Component } from 'react';

import './Day.css'

class Day extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="card border-0 mb-3">
        <ul className="list-inline p-3 align-items-center">
          <li><h4>Date/Time:</h4> <h6>{this.props.forecastInterval.dt_txt}</h6></li>
          <li><h4>Temperature:</h4> <h6>{this.props.forecastInterval.main.temp} &deg; C</h6></li>
          <li><h4>Windforce:</h4> <h6>{this.props.forecastInterval.wind.speed} &deg; m/s</h6></li>
          <li><h4>Humidity:</h4> <h6>{this.props.forecastInterval.main.humidity} %</h6></li>
          <li>
            <img className="" src={`http://openweathermap.org/img/w/${this.props.forecastInterval.weather[0].icon}.png`} title="Title goes here" alt="A weather icon, describing the... weather" />
            <h6>{this.props.forecastInterval.weather[0].description}</h6>
          </li>
        </ul>
      </div>
    );
  }
}

export default Day;
