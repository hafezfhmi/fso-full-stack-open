import React from 'react';
import Person from './Person';

const Persons = ({ persons, filterName, setPersons, setShowMessage }) => {
  return persons.map((curr) => {
    if (new RegExp(filterName, 'i').test(curr.name)) {
      return (
        <Person
          key={curr.name}
          name={curr.name}
          number={curr.number}
          id={curr.id}
          persons={persons}
          setPersons={setPersons}
          setShowMessage={setShowMessage}
        />
      );
    }
    return null;
  });
};

export default Persons;
