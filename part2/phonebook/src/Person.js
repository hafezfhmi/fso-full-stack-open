import React from 'react';
import phonebookServices from './services/phonebook';

const Person = ({ name, number, id, persons, setPersons, setShowMessage }) => {
  const deletion = (event) => {
    event.preventDefault();
    let answer = window.confirm(`Delete ${name}?`);
    if (answer) {
      phonebookServices.deletePerson(id);
      setPersons(persons.filter((curr) => curr.id !== id));
      setShowMessage({ message: `${name} has been deleted`, type: 'danger' });
      setTimeout(() => setShowMessage(null), 3000);
    }
  };

  return (
    <p>
      {`${name} ${number}`} <button onClick={deletion}>delete</button>
    </p>
  );
};

export default Person;
