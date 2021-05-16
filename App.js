import React from 'react';
import './App.css';
import Axios from 'axios';
import DisplayWeather from './components/DisplayWeather.js';
import Navbar from './components/Navbar.js';



class App extends React.Component {

  //state
  state = {
    coords:{
      latitude:45,
      longitude:60
    },
    data:{},
    inputData: ""
  }

componentDidMount() {
  //get device location
  if(navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition((position)=>{
    let newCoords = {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    }

    this.setState({coords:newCoords});

    //Api call
    Axios.get(`http://api.weatherstack.com/current?access_key=0befc4b7fb71ad30df0f2aac680d87cd&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res => {
      let weatherData = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }
  
        this.setState({data: weatherData});
  
    })
  
      })

  }else{
    console.log("Not supported")
  }
}


//track the input for the location
change = (value) => {
  this.setState({inputData:value})
}

changeWeather = (event) => {
  event.preventDefault();

  //api call
  Axios.get(`http://api.weatherstack.com/current?access_key=0befc4b7fb71ad30df0f2aac680d87cd&query=${this.state.inputData}`).then(res =>{
    
    let weatherData = {
      temperature: res.data.current.temperature,
      description: res.data.current.weather_descriptions[0],
      location: res.data.location.name,
      region: res.data.location.region,
      country: res.data.location.country,
      wind_speed: res.data.current.wind_speed,
      pressure: res.data.current.pressure,
      precip: res.data.current.precip,
      humidity: res.data.current.humidity,
      img: res.data.current.weather_icons
    }

      this.setState({data: weatherData});

  })

    }

  render () {
    return (
    <div className="App">
      <div className="container">
<Navbar changeWeather = {this.changeWeather} changeRegion = {this.change}/>
      <DisplayWeather weatherData = {this.state.data} />
      </div>

    </div>
  );
}
}


export default App;
