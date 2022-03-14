import React from 'react';
import NamedCountryList from './NamedCountryList';
import ErrorMessage from './ErrorMessage';
import SingleCountry from './SingleCountry';

const CountriesRender = ({search, countries, weatherData}) => {
  const render = 
   search === "" ? (<ErrorMessage message="Enter a country name"/>) :
        countries.length === 0 ? ( <ErrorMessage message="No Matches Found. Input Another Query"/>) :
        countries.length === 1 ? ( <SingleCountry  country={countries[0]} weatherData={weatherData}/>)  : 
        countries.length > 10 ? ( <ErrorMessage message="Too many matches, specify another filter" /> ) : 
       countries.map(country => <NamedCountryList key={country.name.common} country={country} countries={countries} weatherData={weatherData} />) 

  
  return (
    <div>
         {render}
    </div>
  )
}

export default CountriesRender;