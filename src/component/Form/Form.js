import React, { Component } from 'react';
import Day from '../Day/Day';
import './Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {

      weather: {
        main: {},
        temp: {},
        wind: {},
        weather: [],
        icon: {},
        description: {},
        sys: {},
        sunrise: {},
        sunset: {}
      },
      isToggleOn: true,
      forecast: [],
      latitude: 0,
      longitude: 0
    }
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.success, this.error) 
  }
  
  success(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.getWeather();
  }
  
  error() {
    alert("Sorry, your position is not available. We show you Stockholms weather.");
    this.setState({
      latitude: 59.32932349999999,
      longitude: 18.068580800000063
    })
    this.getWeather();
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  
  getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?&APPID=f199a1e1d774d6c48606c06def559016&units=metric&lat=${this.state.latitude}&lon=${this.state.longitude}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        weather: res
      }, function () {
        // console.log(res);
      })
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const cityname = e.nativeEvent.target.elements[0].value;
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&APPID=f199a1e1d774d6c48606c06def559016&units=metric`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          forecast: res.list,
        }, function() {
          // console.log(this.state.forecastInterval);
          // var sunTime = new Date(INSERTYOURFUCKINGNUMBERSHERE* 1e3).toISOString().slice(-13, -5);
        })
      });
  }

  // getSun() {
  //   var test = this.state.weather;
  //   console.log(test);
  //   return new Date(test * 1e3).toISOString().slice(-13, -5);
  // }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input className="form-control form-control-lg mb-3 searchInput" type="text" placeholder="Type the city name here" name="city" />
          <button className="btn btn-danger search-btn" type="submit">Get weather</button>

          

        </form>
        <div className="">
          <button onClick={this.handleClick} className="btn btn-secondary search-btn mt-3" type="submit">{this.state.isToggleOn ? 'Fahrenheit' : 'Celsius'}</button>
        </div>
        <div className="card mt-3 mb-3 border-0 locationCard">
          <ul className="list-inline p-4 myLocation">
            <li><h4>Your Location:</h4> <h5>{this.state.weather.name}</h5></li>
            <li>
              <h4>Temperature:</h4> 
              <h6 className="d-flex"> 
                { this.state.isToggleOn ? this.state.weather.main.temp : ((this.state.weather.main.temp * 9 / 5) + 32).toFixed(2) } 
                { this.state.isToggleOn ? <p>&deg;C</p> : <p>&deg;F</p> }
              </h6>
            </li>
            <li><h4>Windforce:</h4> <h6>{this.state.weather.wind.speed} m/s </h6></li>
            <li><h4>Humidity:</h4> <h6>{this.state.weather.main.humidity} %</h6></li>
            <li><h4>Sunrise:</h4> <h6>{this.state.weather.sys.sunrise}</h6></li>
            <li><h4>Sunset:</h4> <h6>{this.state.weather.sys.sunset}</h6></li>
            {/* {console.log(this.state.weather)} */}
            {/* <li>
              <img className="" src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`} title="Title goes here" alt="A weather icon, describing the... weather" /> <br />
              <h6>{this.state.weather.description}</h6>
            </li> */}
          </ul>

        </div>
        {/* {this.state.weather && this.state.weather.length > 0 ? 
          <div className="App-weather card mb-3">
            {console.log(this.state.weather)}hello
          </div>
          : ''
        } */}
        { this.state.forecast && this.state.forecast.length > 0 ?
          <div>
            { this.state.forecast.map((forecastInterval, Index) => {
              return <Day key={Index} forecastInterval={forecastInterval} />
              })
            }  
          </div>
          :''
          }
      </div>
    );
  }
}

export default Form;
