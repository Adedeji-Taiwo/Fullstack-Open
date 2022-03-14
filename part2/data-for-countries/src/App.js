import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountriesRender from "./components/CountriesRender";
import Loading from "./components/Loading";

function App() {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setISLoading] = useState(true);
 
//fetch data from country API
 useEffect(() => {
    const url =   "https://restcountries.com/v3.1/all";

    axios
    .get(url)
    .then(res => {
      const filteredCountry = res.data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      setCountries(filteredCountry);
      setISLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
 }, [search]) 



 //fetch data from weather API
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (countries.length === 1) {
      const location = countries.map(country => country.capital);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location[0]}&appid=${apiKey}&units=metric`;
      
      if (location[0]) {
         axios
        .get(url)
        .then(res => {
          setWeather(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      }
     
    }   
 }, [countries])



  const handleSearch = (e) => setSearch(e.target.value);


  return (
    <div className="App">
      <Filter search={search} handleSearch={handleSearch}/> <br />
      {isLoading ? (
        <Loading />
      ) : (
         <CountriesRender search ={search} countries={countries} weatherData = {weather}/>
      )}
    </div>
    
  );
}

export default App;
