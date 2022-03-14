import React from 'react'
import ErrorMessage from './ErrorMessage';
import WeatherData from './WeatherData';

const SingleCountry = ({country: {name: {common}, capital, area, languages, flags: {png}}, weatherData}) => {
  const formattedCapital = capital.length > 1 ? "Capitals" : "Capital"; 
  const formattedLanguages = (Object.values(languages)).length > 1 ? "Languages" : "Language";
    return (
    <div>
        <h2>{common}</h2>
        <p>
            <span>{formattedCapital}: </span>
            <span>{capital.join(", ")}</span>
        </p>
         <p>
            <span>Area: </span>
            <span>{area.toLocaleString()}</span>
        </p>
        <h4>{formattedLanguages}:</h4>
        <ul>
            {(Object.values(languages) || []).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={png} alt= {`${common} flag`} width={150}/>


         <h3>Weather in {capital[0]}</h3>
         {Object.entries(weatherData).length !== 0 ? (
           <WeatherData weatherData={weatherData}/>
         ) : (
            <ErrorMessage message="Weather data not available"/>
         )}
        
    </div>
  )
}

export default SingleCountry;