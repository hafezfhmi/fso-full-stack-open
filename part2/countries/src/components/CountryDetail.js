import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetail({ country }) {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve weather data from API https://openweathermap.org/current#data
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setWeatherData(res.data);

        // setLoading to false to render the output instead of Loading...
        setLoading(false);
      });
  }, [country.capital]);

  // if fetching is not done yet, display Loading...
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((curr) => (
            <li key={curr.name}>{curr.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="country flag" height="100px" />

        {/* Display weather data */}
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {weatherData.main.temp} Celcius</p>

        {/* Icon from https://openweathermap.org/weather-conditions */}
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="Current Weather"
        />
        <p>description: {weatherData.weather[0].main}</p>
        <p>
          wind:{' '}
          {`${weatherData.wind.speed} meter/sec ${weatherData.wind.deg} degrees`}
        </p>
      </div>
    );
  }
}

export default CountryDetail;
