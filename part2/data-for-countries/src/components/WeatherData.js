import React from 'react'

const WeatherData = ({weatherData}) => {
      const source = `https://openweathermap.org/img/wn/${(weatherData.weather)[0].icon}@2x.png`;
  return (
    <>
        <p>
            <span>Temperature: </span>
            <span>{`${weatherData.main.temp} Celsius`}</span>
        </p>
        <p><img src= {source} alt={(weatherData.weather)[0].description} /></p>
        <p>
            <span>Wind: </span>
            <span>{`${weatherData.wind.speed} m/s`}</span>
        </p>
    </>
  )
}

export default WeatherData;