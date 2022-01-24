import React, { useState, useEffect } from 'react';
import NotificationMessage from './NotificationMessage';
import PersonForm from './PersonForm';
import Persons from './Persons';
import SearchFilter from './SearchFilter';
import phonebookServices from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showMessage, setShowMessage] = useState(null);

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
    // We compare new data with persons array to see if its already in array
    let updatedData = persons.find((curr) => curr.name === newName);

    if (updatedData !== undefined) {
      // We change the number with the new number
      updatedData.number = newNumber;

      // alert(`${newName} is already added to phonebook`);
      let answer = window.confirm(
        `${updatedData.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (answer) {
        // We update the data on the server using updatePerson and then we update the person state for the changed person
        phonebookServices
          .updatePerson(updatedData.id, updatedData)
          .then((response) => {
            setShowMessage({ message: `Updated ${newName}`, type: 'normal' });
            setTimeout(() => {
              setShowMessage(null);
            }, 3000);

            setPersons(
              persons.map((curr) =>
                curr.id !== updatedData.id ? curr : response
              )
            );
          })
          .catch((response) => {
            setShowMessage({
              message: `Information of ${newName} has already been removed from server`,
              type: 'danger',
            });
            setTimeout(() => {
              setShowMessage(null);
            }, 3000);
            setPersons(persons.filter((curr) => curr.name !== newName));
          });
        setNewName('');
        setNewNumber('');
      }
    } else {
      // We post data to the server and we also do setPersons because our data is only fetched at initial render \
      // (Modified setPersons to use response data instead)
      phonebookServices
        .addPerson({ name: newName, number: newNumber })
        .then((response) => {
          setShowMessage({ message: `Added ${newName}`, type: 'normal' });
          setTimeout(() => {
            setShowMessage(null);
          }, 3000);

          setPersons(persons.concat(response));
        })
        .catch((error) => {
          setShowMessage({
            message: error.response.data,
            type: 'danger',
          });
          setTimeout(() => {
            setShowMessage(null);
          }, 3000);
        });

      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showMessage && <NotificationMessage message={showMessage} />}

      <SearchFilter getFilter={getFilter} filterName={filterName} />
      <PersonForm
        getName={getName}
        newName={newName}
        getNumber={getNumber}
        newNumber={newNumber}
        submitInput={submitInput}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterName={filterName}
        setPersons={setPersons}
        setShowMessage={setShowMessage}
      />
    </div>
  );
};

export default App;
