import React from 'react';

const SearchFilter = ({ getFilter, filterName }) => {
  return (
    <div>
      filter shown with
      <input type="text" onChange={getFilter} value={filterName} />
    </div>
  );
};

export default SearchFilter;
