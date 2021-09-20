import { useState } from 'react';
import CountryDetail from './CountryDetail';

function Country({ country }) {
  const [show, setShow] = useState(false);

  let updateShow = () => {
    setShow((show) => !show);
  };

  return (
    <li>
      {country.name}
      {show ? (
        <>
          <button onClick={updateShow}>Hide</button>
          <CountryDetail country={country} />
        </>
      ) : (
        <button onClick={updateShow}>Show</button>
      )}
    </li>
  );
}

export default Country;
