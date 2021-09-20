import React from 'react';
import Country from './Country';
import CountryDetail from './CountryDetail';

function CountryList({ countryList }) {
  if (countryList.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (countryList.length <= 10 && countryList.length > 1) {
    return (
      <ul>
        {countryList.map((curr) => (
          <Country key={curr.name} country={curr} />
        ))}
      </ul>
    );
  } else if (countryList.length === 1) {
    return <CountryDetail country={countryList[0]} />;
  } else {
    return null;
  }
}

export default CountryList;
