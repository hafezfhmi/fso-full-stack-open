import React, { useState, useEffect } from 'react';
import phonebookServices from './services/phonebook';

const SearchFilter = ({ getFilter, filterName }) => {
  return (
    <div>
      filter shown with
      <input type="text" onChange={getFilter} value={filterName} />
    </div>
  );
};

const PersonForm = ({
  getName,
  newName,
  getNumber,
  newNumber,
  submitInput,
}) => {
  return (
    <form>
      <h2>add a new</h2>
      <div>
        name: <input onChange={getName} value={newName} />
      </div>
      <div>
        number: <input type="number" onChange={getNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={submitInput}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filterName }) => {
  return persons.map((curr) => {
    if (new RegExp(filterName, 'i').test(curr.name)) {
      return <Person key={curr.name} name={curr.name} number={curr.number} />;
    }
    return null;
  });
};

const Person = ({ name, number }) => {
  return <p>{`${name} ${number}`}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    // getAll executed and .then is chained afterwards
    // more like axios.get().then().then()
    phonebookServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const getName = (event) => {
    setNewName(event.target.value);
  };

  const getNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const getFilter = (event) => {
    setFilterName(event.target.value);
  };

  const submitInput = (event) => {
    event.preventDefault();
    if (persons.find((curr) => curr.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      // We post data to the server and we also do setPersons because our data is only fetched at initial render \
      // (Modified setPersons to use response data instead)
      phonebookServices
        .add({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response));
        });

      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter getFilter={getFilter} filterName={filterName} />
      <PersonForm
        getName={getName}
        newName={newName}
        getNumber={getNumber}
        newNumber={newNumber}
        submitInput={submitInput}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
