import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState([]);

  // Get data using axios when country state change
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      // If no input, set countryData to empty array
      if (country === '') {
        setCountryData([]);
      } else {
        // Set regex based on the country state input
        let regexFilter = new RegExp(country, 'i');

        // Only set data returned from axios request that was filtered based on regex to countryData
        let data = res.data.filter((curr) => regexFilter.test(curr.name));

        setCountryData(data);
      }
    });
  }, [country]);

  // Change country state when input change
  const countryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="App">
      <label htmlFor="country">find countries </label>
      <input
        type="text"
        value={country}
        onChange={countryChange}
        id="country"
      />

      {/* 1. If countryData length > 10, return Too many matches
          2. If countryData length is <= 10 and > 1, return list of the country name
          3. If countryData length == 1, return the details of the sole country
       */}

      {countryData.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countryData.length <= 10 && countryData.length > 1 ? (
        <ul>
          {countryData.map((curr) => {
            return <li key={curr.name}>{curr.name}</li>;
          })}
        </ul>
      ) : countryData.length === 1 ? (
        <>
          <h1>{countryData[0].name}</h1>
          <p>capital {countryData[0].capital}</p>
          <p>population {countryData[0].population}</p>

          <h2>languages</h2>
          <ul>
            {countryData[0].languages.map((curr) => (
              <li key={curr.name}>{curr.name}</li>
            ))}
          </ul>
          <img src={countryData[0].flag} alt="country flag" height="100px" />
        </>
      ) : null}
    </div>
  );
}

export default App;
