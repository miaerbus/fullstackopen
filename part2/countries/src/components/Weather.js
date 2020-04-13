import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY_OPENWEATHER

  useEffect(() => {
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          capital +
          '&appid=' +
          api_key +
          '&units=metric'
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [api_key, capital])

  const icon =
    weather && weather.weather
      ? 'http://openweathermap.org/img/wn/' +
        weather.weather[0].icon +
        '@2x.png'
      : ''

  if (weather && weather.weather) {
    return (
      <div>
        <div>temperature {weather.main.temp} Celsius</div>
        <img src={icon} alt={weather.weather[0].main} />
        <div>wind {weather.wind.speed} meter/sec</div>
      </div>
    )
  }
  return <div>No data available</div>
}

export default Weather
