import { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';
import CountryList from './CountryList';

function App() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState('');
  const [countryList, setCountryList] = useState([]);

  // Get data using axios when country state change
  // Update: Since we are taking all of the data and not individual data, we can reduce http request by sending request only once
  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then((res) => {
      setCountryData(res.data);
    });
  }, []);

  // We update the country list to be displayed
  useEffect(() => {
    // If no input, set countryData to empty array
    if (country === '') {
      setCountryList([]);
    } else {
      // Set regex based on the country state input
      let regexFilter = new RegExp(country, 'i');

      // Only set data returned from axios request that was filtered based on regex to countryData
      let data = countryData.filter((curr) => regexFilter.test(curr.name));

      setCountryList(data);
    }
  }, [country, countryData]);

  // Change country state when input change
  const countryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="App">
      <Search country={country} countryChange={countryChange} />
      <CountryList countryList={countryList} />
    </div>
  );
}

export default App;
