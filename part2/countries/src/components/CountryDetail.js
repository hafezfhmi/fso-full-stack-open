import React from 'react';

function CountryDetail({ country }) {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map((curr) => (
          <li key={curr.name}>{curr.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" height="100px" />
    </div>
  );
}

export default CountryDetail;
