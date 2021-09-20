import React from 'react';

function Search({ country, countryChange }) {
  return (
    <div>
      <label htmlFor="country">find countries </label>
      <input
        type="text"
        value={country}
        onChange={countryChange}
        id="country"
      />
    </div>
  );
}

export default Search;
